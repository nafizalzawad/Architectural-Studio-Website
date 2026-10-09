<?php
/**
 * Projects Public REST Endpoint
 * File: backend/api/projects.php
 *
 * Supported Queries:
 *   GET /backend/api/projects.php                   (Returns all projects)
 *   GET /backend/api/projects.php?slug={slug}       (Returns single project with gallery)
 *   GET /backend/api/projects.php?category={slug}   (Filter by category slug)
 */

require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/config/database.php';

$db = Database::getConnection();

/**
 * Ensure image paths starting with /uploads/ are fully qualified with the host domain
 */
function resolveAssetUrl(?string $url): string {
    if (empty($url)) return '';
    if (preg_match('/^https?:\/\//i', $url)) return $url;
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    return rtrim($scheme . $host, '/') . '/' . ltrim($url, '/');
}

// 1. Single Project Detail by Slug
if (!empty($_GET['slug'])) {
    $slug = trim($_GET['slug']);

    $stmt = $db->prepare("
        SELECT 
            p.id,
            p.title,
            p.slug,
            p.category_id,
            p.client_name,
            p.description,
            p.concept_narrative,
            p.main_image_url,
            p.location,
            p.completion_year,
            p.is_featured,
            p.scope,
            p.created_at,
            p.updated_at,
            c.id AS cat_id,
            c.name AS cat_name,
            c.slug AS cat_slug,
            c.type AS cat_type
        FROM portfolio_projects p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.slug = :slug
        LIMIT 1
    ");
    $stmt->execute([':slug' => $slug]);
    $project = $stmt->fetch();

    if (!$project) {
        jsonResponse(null, 404, "Project with slug '{$slug}' not found.");
    }

    // Fetch associated gallery items ordered by display_order ASC
    $imgStmt = $db->prepare("
        SELECT 
            id,
            project_id,
            image_url,
            display_order,
            caption,
            aspect_ratio,
            created_at
        FROM project_images
        WHERE project_id = :project_id
        ORDER BY display_order ASC, id ASC
    ");
    $imgStmt->execute([':project_id' => $project['id']]);
    $gallery = $imgStmt->fetchAll();

    // Format category sub-object
    $categoryData = null;
    if ($project['cat_id']) {
        $categoryData = [
            'id'   => (int)$project['cat_id'],
            'name' => $project['cat_name'],
            'slug' => $project['cat_slug'],
            'type' => $project['cat_type']
        ];
    }

    // Format specs matrix for direct Next.js frontend consumption
    $formatted = [
        'id'                => (int)$project['id'],
        'title'             => $project['title'],
        'slug'              => $project['slug'],
        'category_id'       => (int)$project['category_id'],
        'client_name'       => $project['client_name'],
        'description'       => $project['description'],
        'concept_narrative' => $project['concept_narrative'],
        'main_image_url'    => resolveAssetUrl($project['main_image_url']),
        'location'          => $project['location'],
        'completion_year'   => (int)$project['completion_year'],
        'is_featured'       => (bool)$project['is_featured'],
        'specs'             => [
            'sector'     => $project['cat_name'] ?: 'Prime Architecture',
            'location'   => $project['location'],
            'completion' => (string)$project['completion_year'],
            'scope'      => $project['scope'] ?: 'Architecture & Build'
        ],
        'category'          => $categoryData,
        'gallery'           => array_map(function ($img) {
            $img['image_url'] = resolveAssetUrl($img['image_url']);
            return $img;
        }, $gallery),
        'created_at'        => $project['created_at']
    ];

    jsonResponse($formatted, 200);
}

// 2. Filter by Category Slug
if (!empty($_GET['category']) && $_GET['category'] !== 'all') {
    $categorySlug = trim($_GET['category']);

    $stmt = $db->prepare("
        SELECT 
            p.id,
            p.title,
            p.slug,
            p.category_id,
            p.client_name,
            p.description,
            p.main_image_url,
            p.location,
            p.completion_year,
            p.is_featured,
            p.scope,
            p.created_at,
            c.id AS cat_id,
            c.name AS cat_name,
            c.slug AS cat_slug,
            c.type AS cat_type
        FROM portfolio_projects p
        INNER JOIN categories c ON p.category_id = c.id
        WHERE c.slug = :cat_slug
        ORDER BY p.is_featured DESC, p.created_at DESC
    ");
    $stmt->execute([':cat_slug' => $categorySlug]);
    $projects = $stmt->fetchAll();
} else {
    // 3. Default: Return All Active Projects
    $stmt = $db->query("
        SELECT 
            p.id,
            p.title,
            p.slug,
            p.category_id,
            p.client_name,
            p.description,
            p.main_image_url,
            p.location,
            p.completion_year,
            p.is_featured,
            p.scope,
            p.created_at,
            c.id AS cat_id,
            c.name AS cat_name,
            c.slug AS cat_slug,
            c.type AS cat_type
        FROM portfolio_projects p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.is_featured DESC, p.created_at DESC
    ");
    $projects = $stmt->fetchAll();
}

// Format list items
$formattedProjects = array_map(function ($row) {
    return [
        'id'              => (int)$row['id'],
        'title'           => $row['title'],
        'slug'            => $row['slug'],
        'category_id'     => (int)$row['category_id'],
        'client_name'     => $row['client_name'],
        'description'     => $row['description'],
        'main_image_url'  => resolveAssetUrl($row['main_image_url']),
        'location'        => $row['location'],
        'completion_year' => (int)$row['completion_year'],
        'is_featured'     => (bool)$row['is_featured'],
        'specs'           => [
            'sector'     => $row['cat_name'] ?: 'Prime Architecture',
            'location'   => $row['location'],
            'completion' => (string)$row['completion_year'],
            'scope'      => $row['scope'] ?: 'Architecture & Build'
        ],
        'category'        => $row['cat_id'] ? [
            'id'   => (int)$row['cat_id'],
            'name' => $row['cat_name'],
            'slug' => $row['cat_slug'],
            'type' => $row['cat_type']
        ] : null,
        'created_at'      => $row['created_at']
    ];
}, $projects);

jsonResponse($formattedProjects, 200);
