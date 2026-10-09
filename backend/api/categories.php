<?php
/**
 * Categories Public REST Endpoint
 * File: backend/api/categories.php
 *
 * Returns all categories with active project counts
 */

require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/config/database.php';

$db = Database::getConnection();

$stmt = $db->query("
    SELECT 
        c.id,
        c.name,
        c.slug,
        c.type,
        c.description,
        COUNT(p.id) AS project_count
    FROM categories c
    LEFT JOIN portfolio_projects p ON p.category_id = c.id
    GROUP BY c.id, c.name, c.slug, c.type, c.description
    ORDER BY c.id ASC
");

$categories = $stmt->fetchAll();

// Add 'All' pseudo-category for convenient frontend tabs
$totalProjectsStmt = $db->query("SELECT COUNT(*) FROM portfolio_projects");
$totalProjects = (int)$totalProjectsStmt->fetchColumn();

$formatted = [
    [
        'id'            => 0,
        'name'          => 'All',
        'slug'          => 'all',
        'type'          => 'residential',
        'description'   => 'Comprehensive catalogue of bespoke architectural commissions.',
        'project_count' => $totalProjects
    ]
];

foreach ($categories as $cat) {
    $formatted[] = [
        'id'            => (int)$cat['id'],
        'name'          => $cat['name'],
        'slug'          => $cat['slug'],
        'type'          => $cat['type'],
        'description'   => $cat['description'],
        'project_count' => (int)$cat['project_count']
    ];
}

jsonResponse($formatted, 200);
