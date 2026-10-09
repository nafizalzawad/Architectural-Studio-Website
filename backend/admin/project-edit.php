<?php
/**
 * CMS Project Editor & Gallery Manager
 * File: backend/admin/project-edit.php
 */

require_once __DIR__ . '/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';

$db = Database::getConnection();

$projectId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$isEditing = ($projectId > 0);

$message = '';
$messageType = 'success';

// Fetch Categories for Dropdown
$categories = $db->query("SELECT id, name, slug FROM categories ORDER BY name ASC")->fetchAll();

// Initialize Project Data
$project = [
    'title'             => '',
    'slug'              => '',
    'category_id'       => '',
    'client_name'       => '',
    'description'       => '',
    'concept_narrative' => '',
    'main_image_url'    => '',
    'location'          => '',
    'completion_year'   => date('Y'),
    'is_featured'       => 0,
    'scope'             => 'Architecture & Build'
];

$galleryImages = [];

// Load Existing Project if Editing
if ($isEditing) {
    $stmt = $db->prepare("SELECT * FROM portfolio_projects WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => $projectId]);
    $fetched = $stmt->fetch();

    if (!$fetched) {
        header('Location: index.php');
        exit;
    }
    $project = $fetched;

    // Load Gallery Images
    $imgStmt = $db->prepare("SELECT * FROM project_images WHERE project_id = :project_id ORDER BY display_order ASC, id ASC");
    $imgStmt->execute([':project_id' => $projectId]);
    $galleryImages = $imgStmt->fetchAll();
}

// Handle Form Submission (Save / Update)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $message = 'CSRF security token mismatch.';
        $messageType = 'error';
    } else {
        $title = trim($_POST['title'] ?? '');
        $slug = trim($_POST['slug'] ?? '');
        $categoryId = !empty($_POST['category_id']) ? (int)$_POST['category_id'] : null;
        $clientName = trim($_POST['client_name'] ?? '');
        $description = trim($_POST['description'] ?? '');
        $conceptNarrative = trim($_POST['concept_narrative'] ?? '');
        $location = trim($_POST['location'] ?? '');
        $completionYear = (int)($_POST['completion_year'] ?? date('Y'));
        $isFeatured = isset($_POST['is_featured']) ? 1 : 0;
        $scope = trim($_POST['scope'] ?? 'Architecture & Build');
        $mainImageUrl = trim($_POST['main_image_url'] ?? '');

        // Handle Cover Image File Upload if uploaded
        if (isset($_FILES['cover_file']) && $_FILES['cover_file']['error'] === UPLOAD_ERR_OK) {
            $tmpPath = $_FILES['cover_file']['tmp_name'];
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo, $tmpPath);
            finfo_close($finfo);

            $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
            if (isset($allowed[$mime])) {
                $uploadDir = realpath(__DIR__ . '/../') . '/uploads/';
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0755, true);
                }
                $ext = $allowed[$mime];
                $newFilename = bin2hex(random_bytes(16)) . '.' . $ext;
                if (move_uploaded_file($tmpPath, $uploadDir . $newFilename)) {
                    $mainImageUrl = '/uploads/' . $newFilename;
                }
            }
        }

        // Validation
        if (empty($title) || empty($slug)) {
            $message = 'Title and Slug are required fields.';
            $messageType = 'error';
        } else {
            // Slug Uniqueness check
            $slugCheckQuery = "SELECT id FROM portfolio_projects WHERE slug = :slug" . ($isEditing ? " AND id != :id" : "") . " LIMIT 1";
            $slugCheckStmt = $db->prepare($slugCheckQuery);
            $params = [':slug' => $slug];
            if ($isEditing) $params[':id'] = $projectId;
            $slugCheckStmt->execute($params);

            if ($slugCheckStmt->fetch()) {
                $message = "The slug '{$slug}' is already in use by another project.";
                $messageType = 'error';
            } else {
                if ($isEditing) {
                    // Update Project
                    $updateStmt = $db->prepare("
                        UPDATE portfolio_projects SET
                            title = :title,
                            slug = :slug,
                            category_id = :category_id,
                            client_name = :client_name,
                            description = :description,
                            concept_narrative = :concept_narrative,
                            main_image_url = :main_image_url,
                            location = :location,
                            completion_year = :completion_year,
                            is_featured = :is_featured,
                            scope = :scope
                        WHERE id = :id
                    ");
                    $updateStmt->execute([
                        ':title'             => $title,
                        ':slug'              => $slug,
                        ':category_id'       => $categoryId,
                        ':client_name'       => $clientName,
                        ':description'       => $description,
                        ':concept_narrative' => $conceptNarrative,
                        ':main_image_url'    => $mainImageUrl,
                        ':location'          => $location,
                        ':completion_year'   => $completionYear,
                        ':is_featured'       => $isFeatured,
                        ':scope'             => $scope,
                        ':id'                => $projectId
                    ]);
                } else {
                    // Create New Project
                    $insertStmt = $db->prepare("
                        INSERT INTO portfolio_projects 
                        (title, slug, category_id, client_name, description, concept_narrative, main_image_url, location, completion_year, is_featured, scope)
                        VALUES (:title, :slug, :category_id, :client_name, :description, :concept_narrative, :main_image_url, :location, :completion_year, :is_featured, :scope)
                    ");
                    $insertStmt->execute([
                        ':title'             => $title,
                        ':slug'              => $slug,
                        ':category_id'       => $categoryId,
                        ':client_name'       => $clientName,
                        ':description'       => $description,
                        ':concept_narrative' => $conceptNarrative,
                        ':main_image_url'    => $mainImageUrl,
                        ':location'          => $location,
                        ':completion_year'   => $completionYear,
                        ':is_featured'       => $isFeatured,
                        ':scope'             => $scope
                    ]);
                    $projectId = (int)$db->lastInsertId();
                    $isEditing = true;
                }

                // Handle Updating Existing Gallery Display Order & Captions
                if (!empty($_POST['gallery_order']) && is_array($_POST['gallery_order'])) {
                    foreach ($_POST['gallery_order'] as $imgId => $orderVal) {
                        $imgId = (int)$imgId;
                        $orderVal = (int)$orderVal;
                        $captionVal = trim($_POST['gallery_caption'][$imgId] ?? '');
                        $aspectVal = trim($_POST['gallery_aspect'][$imgId] ?? 'landscape');

                        $updImg = $db->prepare("
                            UPDATE project_images 
                            SET display_order = :ord, caption = :cap, aspect_ratio = :asp 
                            WHERE id = :id AND project_id = :pid
                        ");
                        $updImg->execute([
                            ':ord' => $orderVal,
                            ':cap' => $captionVal,
                            ':asp' => $aspectVal,
                            ':id'  => $imgId,
                            ':pid' => $projectId
                        ]);
                    }
                }

                // Handle Deleting Selected Gallery Images
                if (!empty($_POST['delete_gallery']) && is_array($_POST['delete_gallery'])) {
                    foreach ($_POST['delete_gallery'] as $imgId => $val) {
                        $delImg = $db->prepare("DELETE FROM project_images WHERE id = :id AND project_id = :pid");
                        $delImg->execute([':id' => (int)$imgId, ':pid' => $projectId]);
                    }
                }

                // Handle Multi-file Gallery Upload
                if (isset($_FILES['new_gallery_files']) && !empty($_FILES['new_gallery_files']['name'][0])) {
                    $uploadDir = realpath(__DIR__ . '/../') . '/uploads/';
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0755, true);
                    }
                    $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
                    $totalUploaded = count($_FILES['new_gallery_files']['name']);

                    // Current highest order
                    $maxOrderStmt = $db->prepare("SELECT COALESCE(MAX(display_order), 0) FROM project_images WHERE project_id = :pid");
                    $maxOrderStmt->execute([':pid' => $projectId]);
                    $currOrder = (int)$maxOrderStmt->fetchColumn();

                    for ($i = 0; $i < $totalUploaded; $i++) {
                        if ($_FILES['new_gallery_files']['error'][$i] === UPLOAD_ERR_OK) {
                            $tmpPath = $_FILES['new_gallery_files']['tmp_name'][$i];
                            $finfo = finfo_open(FILEINFO_MIME_TYPE);
                            $mime = finfo_file($finfo, $tmpPath);
                            finfo_close($finfo);

                            if (isset($allowed[$mime])) {
                                $ext = $allowed[$mime];
                                $randomFile = bin2hex(random_bytes(16)) . '.' . $ext;
                                if (move_uploaded_file($tmpPath, $uploadDir . $randomFile)) {
                                    $currOrder++;
                                    $insImg = $db->prepare("
                                        INSERT INTO project_images (project_id, image_url, display_order, caption, aspect_ratio)
                                        VALUES (:pid, :url, :ord, :caption, :aspect)
                                    ");
                                    $insImg->execute([
                                        ':pid'     => $projectId,
                                        ':url'     => '/uploads/' . $randomFile,
                                        ':ord'     => $currOrder,
                                        ':caption' => '',
                                        ':aspect'  => 'landscape'
                                    ]);
                                }
                            }
                        }
                    }
                }

                // Refresh state after save
                $message = 'Project successfully saved and published.';
                $messageType = 'success';

                // Reload project and gallery data
                $stmt = $db->prepare("SELECT * FROM portfolio_projects WHERE id = :id LIMIT 1");
                $stmt->execute([':id' => $projectId]);
                $project = $stmt->fetch();

                $imgStmt = $db->prepare("SELECT * FROM project_images WHERE project_id = :project_id ORDER BY display_order ASC, id ASC");
                $imgStmt->execute([':project_id' => $projectId]);
                $galleryImages = $imgStmt->fetchAll();
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="h-full bg-[#0a0a0c]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $isEditing ? 'Edit: ' . htmlspecialchars($project['title']) : 'Create Project' ?> | Minale + Mann CMS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    </style>
</head>
<body class="min-h-full bg-[#0c0d0e] text-neutral-200">
    <!-- Top Administrative Navigation -->
    <header class="w-full bg-[#111215] border-b border-white/10 px-6 sm:px-10 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
            <a href="index.php" class="text-sm font-light tracking-[0.25em] uppercase text-white">Minale + Mann</a>
            <span class="text-neutral-600 font-mono text-xs">/</span>
            <a href="index.php" class="text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white">Portfolio</a>
            <span class="text-neutral-600 font-mono text-xs">/</span>
            <span class="text-[11px] font-mono uppercase tracking-widest text-white"><?= $isEditing ? 'Edit Project' : 'New Project' ?></span>
        </div>

        <div class="flex items-center gap-4 text-xs">
            <a href="index.php" class="text-neutral-400 hover:text-white uppercase tracking-widest text-[11px] transition-colors">
                &larr; Back to Dashboard
            </a>
        </div>
    </header>

    <main class="max-w-5xl mx-auto px-6 sm:px-10 py-10">
        <?php if (!empty($message)): ?>
            <div class="mb-8 p-4 border text-xs tracking-wide <?= $messageType === 'success' ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-red-950/40 border-red-500/40 text-red-200' ?>">
                <?= htmlspecialchars($message) ?>
            </div>
        <?php endif; ?>

        <form method="POST" enctype="multipart/form-data" class="space-y-10">
            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">

            <!-- Section 1: Core Project Details -->
            <div class="bg-[#121316] border border-white/10 p-6 sm:p-8 space-y-6">
                <div class="border-b border-white/10 pb-4 flex justify-between items-center">
                    <h2 class="text-base font-light uppercase tracking-wider text-white">Project Identity & Specs</h2>
                    <span class="text-xs font-mono text-neutral-500">ID: <?= $isEditing ? '#' . $project['id'] : 'Draft' ?></span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Project Title *</label>
                        <input type="text" id="title" name="title" value="<?= htmlspecialchars($project['title']) ?>" required
                            placeholder="e.g. The Battersea Powerhouse"
                            class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors">
                    </div>

                    <!-- Slug (Auto-generated via JS) -->
                    <div>
                        <label for="slug" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">URL Slug *</label>
                        <input type="text" id="slug" name="slug" value="<?= htmlspecialchars($project['slug']) ?>" required
                            placeholder="e.g. the-battersea-powerhouse"
                            class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm font-mono text-xs focus:outline-none focus:border-white transition-colors">
                    </div>

                    <!-- Category -->
                    <div>
                        <label for="category_id" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Discipline / Category</label>
                        <select id="category_id" name="category_id"
                            class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors">
                            <option value="">-- Select Category --</option>
                            <?php foreach ($categories as $cat): ?>
                                <option value="<?= $cat['id'] ?>" <?= $project['category_id'] == $cat['id'] ? 'selected' : '' ?>>
                                    <?= htmlspecialchars($cat['name']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <!-- Client Name -->
                    <div>
                        <label for="client_name" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Client / Commission Title</label>
                        <input type="text" id="client_name" name="client_name" value="<?= htmlspecialchars($project['client_name'] ?? '') ?>"
                            placeholder="e.g. Private Client"
                            class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors">
                    </div>

                    <!-- Location -->
                    <div>
                        <label for="location" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Location</label>
                        <input type="text" id="location" name="location" value="<?= htmlspecialchars($project['location'] ?? '') ?>"
                            placeholder="e.g. Battersea, London SW11"
                            class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors">
                    </div>

                    <!-- Year & Scope -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="completion_year" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Year</label>
                            <input type="number" id="completion_year" name="completion_year" value="<?= (int)($project['completion_year'] ?? date('Y')) ?>"
                                class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors">
                        </div>
                        <div>
                            <label for="scope" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Scope</label>
                            <input type="text" id="scope" name="scope" value="<?= htmlspecialchars($project['scope'] ?? '') ?>"
                                placeholder="e.g. Architecture & Build"
                                class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors">
                        </div>
                    </div>
                </div>

                <!-- Featured Toggle -->
                <div class="pt-2 flex items-center gap-3">
                    <input type="checkbox" id="is_featured" name="is_featured" value="1" <?= !empty($project['is_featured']) ? 'checked' : '' ?>
                        class="w-4 h-4 rounded bg-[#0a0a0c] border-white/20 text-white focus:ring-0">
                    <label for="is_featured" class="text-xs uppercase tracking-wider text-neutral-300 select-none">
                        Feature this case study prominently on homepage & curated monograph
                    </label>
                </div>
            </div>

            <!-- Section 2: Architectural Narratives -->
            <div class="bg-[#121316] border border-white/10 p-6 sm:p-8 space-y-6">
                <div class="border-b border-white/10 pb-4">
                    <h2 class="text-base font-light uppercase tracking-wider text-white">Narrative Copy</h2>
                    <p class="text-xs text-neutral-400 font-light">Short summary and conceptual monograph narrative.</p>
                </div>

                <div>
                    <label for="description" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Short Description *</label>
                    <textarea id="description" name="description" rows="3" required
                        placeholder="Concise overview of the architectural intervention..."
                        class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors"><?= htmlspecialchars($project['description']) ?></textarea>
                </div>

                <div>
                    <label for="concept_narrative" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Full Concept Narrative</label>
                    <textarea id="concept_narrative" name="concept_narrative" rows="6"
                        placeholder="In-depth editorial text detailing material selection, daylight modulation, and spatial choreography..."
                        class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors"><?= htmlspecialchars($project['concept_narrative'] ?? '') ?></textarea>
                </div>
            </div>

            <!-- Section 3: Cover Image -->
            <div class="bg-[#121316] border border-white/10 p-6 sm:p-8 space-y-6">
                <div class="border-b border-white/10 pb-4">
                    <h2 class="text-base font-light uppercase tracking-wider text-white">Primary Hero Cover Image</h2>
                    <p class="text-xs text-neutral-400 font-light">The banner image displayed in the portfolio grid and case study hero.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div class="space-y-4">
                        <div>
                            <label for="main_image_url" class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Image URL</label>
                            <input type="text" id="main_image_url" name="main_image_url" value="<?= htmlspecialchars($project['main_image_url']) ?>"
                                placeholder="https://images.unsplash.com/... or /uploads/..."
                                class="w-full px-4 py-3 bg-[#0a0a0c] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-white transition-colors">
                        </div>

                        <div>
                            <label class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Or Upload Image File</label>
                            <input type="file" name="cover_file" accept="image/jpeg,image/png,image/webp"
                                class="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:uppercase file:tracking-widest file:bg-white file:text-neutral-900 hover:file:bg-neutral-200">
                        </div>
                    </div>

                    <!-- Live Image Preview -->
                    <div>
                        <span class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Cover Preview</span>
                        <div class="aspect-[16/10] bg-[#0a0a0c] border border-white/10 overflow-hidden flex items-center justify-center">
                            <?php if (!empty($project['main_image_url'])): ?>
                                <img id="coverPreview" src="<?= htmlspecialchars($project['main_image_url']) ?>" alt="Cover" class="w-full h-full object-cover">
                            <?php else: ?>
                                <span id="coverPlaceholder" class="text-xs font-mono text-neutral-600">No Image Specified</span>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 4: Masonry Gallery Images -->
            <?php if ($isEditing): ?>
                <div class="bg-[#121316] border border-white/10 p-6 sm:p-8 space-y-6">
                    <div class="border-b border-white/10 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                            <h2 class="text-base font-light uppercase tracking-wider text-white">Masonry Gallery Plates (<?= count($galleryImages) ?>)</h2>
                            <p class="text-xs text-neutral-400 font-light">Fine-tune display order, captions, and aspect ratios for the case study gallery.</p>
                        </div>
                    </div>

                    <?php if (!empty($galleryImages)): ?>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <?php foreach ($galleryImages as $img): ?>
                                <div class="bg-[#0a0a0c] border border-white/10 p-4 space-y-3">
                                    <div class="aspect-[16/11] bg-neutral-900 border border-white/10 overflow-hidden relative">
                                        <img src="<?= htmlspecialchars($img['image_url']) ?>" alt="Plate" class="w-full h-full object-cover">
                                    </div>

                                    <div class="space-y-2 text-xs">
                                        <div>
                                            <label class="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Display Order</label>
                                            <input type="number" name="gallery_order[<?= $img['id'] ?>]" value="<?= (int)$img['display_order'] ?>"
                                                class="w-full px-2 py-1.5 bg-[#121316] border border-white/10 text-white font-mono">
                                        </div>

                                        <div>
                                            <label class="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Caption</label>
                                            <input type="text" name="gallery_caption[<?= $img['id'] ?>]" value="<?= htmlspecialchars($img['caption'] ?? '') ?>"
                                                placeholder="e.g. Master en-suite with honed marble"
                                                class="w-full px-2 py-1.5 bg-[#121316] border border-white/10 text-white">
                                        </div>

                                        <div>
                                            <label class="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Aspect Ratio</label>
                                            <select name="gallery_aspect[<?= $img['id'] ?>]" class="w-full px-2 py-1.5 bg-[#121316] border border-white/10 text-white">
                                                <option value="landscape" <?= $img['aspect_ratio'] === 'landscape' ? 'selected' : '' ?>>Landscape (16:11)</option>
                                                <option value="portrait" <?= $img['aspect_ratio'] === 'portrait' ? 'selected' : '' ?>>Portrait (4:5)</option>
                                                <option value="square" <?= $img['aspect_ratio'] === 'square' ? 'selected' : '' ?>>Square (1:1)</option>
                                                <option value="panoramic" <?= $img['aspect_ratio'] === 'panoramic' ? 'selected' : '' ?>>Panoramic Banner (21:9)</option>
                                            </select>
                                        </div>

                                        <div class="pt-2 border-t border-white/10 flex items-center gap-2">
                                            <input type="checkbox" name="delete_gallery[<?= $img['id'] ?>]" id="del_<?= $img['id'] ?>" value="1"
                                                class="w-3.5 h-3.5 rounded bg-black text-red-600">
                                            <label for="del_<?= $img['id'] ?>" class="text-[10px] text-red-400 font-mono uppercase tracking-wider">
                                                Mark for Removal
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>

                    <!-- Upload Multiple Gallery Images -->
                    <div class="pt-6 border-t border-white/10">
                        <label class="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                            Add New Gallery Images (Multiple Selection Allowed)
                        </label>
                        <input type="file" name="new_gallery_files[]" multiple accept="image/jpeg,image/png,image/webp"
                            class="w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-5 file:border-0 file:text-xs file:uppercase file:tracking-widest file:bg-white file:text-neutral-900 hover:file:bg-neutral-200">
                        <p class="text-[11px] text-neutral-500 mt-2">Hold Ctrl / Cmd to select multiple architectural photography plates.</p>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Action Bar -->
            <div class="flex items-center justify-between pt-4">
                <a href="index.php" class="px-6 py-3 border border-white/20 text-neutral-300 text-xs uppercase tracking-widest hover:text-white hover:border-white transition-colors">
                    Cancel
                </a>
                <button type="submit" class="px-8 py-3.5 bg-white text-neutral-900 text-xs uppercase tracking-[0.25em] font-medium hover:bg-neutral-200 transition-colors">
                    <?= $isEditing ? 'Save & Update Project' : 'Publish New Project' ?>
                </button>
            </div>
        </form>
    </main>

    <script>
        // Auto Slug Generator based on Title (if slug is empty or user is typing initial title)
        const titleInput = document.getElementById('title');
        const slugInput = document.getElementById('slug');
        let isManuallyModified = <?= $isEditing ? 'true' : 'false' ?>;

        slugInput.addEventListener('input', () => {
            isManuallyModified = true;
        });

        titleInput.addEventListener('input', (e) => {
            if (!isManuallyModified) {
                const slug = e.target.value
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                slugInput.value = slug;
            }
        });

        // Cover image input preview
        const mainUrlInput = document.getElementById('main_image_url');
        const coverPreview = document.getElementById('coverPreview');
        if (mainUrlInput && coverPreview) {
            mainUrlInput.addEventListener('input', (e) => {
                if (e.target.value) {
                    coverPreview.src = e.target.value;
                }
            });
        }
    </script>
</body>
</html>
