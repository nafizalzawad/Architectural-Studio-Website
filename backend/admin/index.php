<?php
/**
 * CMS Project List Dashboard
 * File: backend/admin/index.php
 */

require_once __DIR__ . '/auth_check.php';
require_once __DIR__ . '/../api/config/database.php';

$db = Database::getConnection();
$message = '';
$messageType = 'success';

// Handle Project Deletion
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $message = 'CSRF security token mismatch.';
        $messageType = 'error';
    } else {
        $deleteId = (int)($_POST['project_id'] ?? 0);
        if ($deleteId > 0) {
            // Delete project (cascade removes project_images)
            $delStmt = $db->prepare("DELETE FROM portfolio_projects WHERE id = :id");
            $delStmt->execute([':id' => $deleteId]);
            $message = "Project #{$deleteId} successfully removed from portfolio.";
            $messageType = 'success';
        }
    }
}

// Fetch Projects joined with Categories and Gallery counts
$query = "
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.location,
        p.completion_year,
        p.main_image_url,
        p.is_featured,
        p.created_at,
        c.name AS category_name,
        COUNT(pi.id) AS gallery_count
    FROM portfolio_projects p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN project_images pi ON pi.project_id = p.id
    GROUP BY p.id, p.title, p.slug, p.location, p.completion_year, p.main_image_url, p.is_featured, p.created_at, c.name
    ORDER BY p.is_featured DESC, p.created_at DESC
";
$projects = $db->query($query)->fetchAll();

// Metrics
$totalProjects = count($projects);
$totalGalleries = array_sum(array_column($projects, 'gallery_count'));
$totalCategories = (int)$db->query("SELECT COUNT(*) FROM categories")->fetchColumn();
$recentInquiries = (int)$db->query("SELECT COUNT(*) FROM contact_submissions WHERE created_at > (NOW() - INTERVAL 7 DAY)")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="en" class="h-full bg-[#0a0a0c]">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Dashboard | Minale + Mann CMS</title>
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
            <span class="text-[11px] font-mono uppercase tracking-widest text-neutral-400">Admin CMS</span>
        </div>

        <div class="flex items-center gap-6 text-xs">
            <span class="text-neutral-400 font-mono hidden sm:inline-block">
                User: <strong class="text-neutral-200"><?= htmlspecialchars($_SESSION['admin_username']) ?></strong>
            </span>
            <a href="project-edit.php" class="px-4 py-2 bg-white text-neutral-900 uppercase tracking-widest text-[11px] font-medium hover:bg-neutral-200 transition-colors">
                + New Project
            </a>
            <a href="logout.php" class="text-neutral-400 hover:text-white uppercase tracking-widest text-[11px] transition-colors">
                Sign Out
            </a>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 sm:px-10 py-10 space-y-8">
        <!-- Toast Notification Message -->
        <?php if (!empty($message)): ?>
            <div class="p-4 border text-xs tracking-wide <?= $messageType === 'success' ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-red-950/40 border-red-500/40 text-red-200' ?>">
                <?= htmlspecialchars($message) ?>
            </div>
        <?php endif; ?>

        <!-- Studio Quick Metrics -->
        <section class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div class="bg-[#121316] border border-white/10 p-5">
                <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">Total Commissions</span>
                <span class="text-2xl font-light text-white"><?= $totalProjects ?></span>
            </div>
            <div class="bg-[#121316] border border-white/10 p-5">
                <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">Gallery Plates</span>
                <span class="text-2xl font-light text-white"><?= $totalGalleries ?></span>
            </div>
            <div class="bg-[#121316] border border-white/10 p-5">
                <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">Disciplines</span>
                <span class="text-2xl font-light text-white"><?= $totalCategories ?></span>
            </div>
            <div class="bg-[#121316] border border-white/10 p-5">
                <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">7-Day Inquiries</span>
                <span class="text-2xl font-light text-white"><?= $recentInquiries ?></span>
            </div>
        </section>

        <!-- Projects Table Section -->
        <section class="bg-[#121316] border border-white/10 overflow-hidden">
            <div class="p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 class="text-lg font-light uppercase tracking-wider text-white">Portfolio Commissions</h2>
                    <p class="text-xs text-neutral-400 font-light">Manage case studies, masonry imagery, and metadata published to the REST API.</p>
                </div>
                <a href="project-edit.php" class="px-5 py-2.5 bg-white text-neutral-900 text-xs uppercase tracking-widest font-medium hover:bg-neutral-200 transition-colors">
                    Add New Project
                </a>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead class="bg-[#0e0f12] text-neutral-400 font-mono uppercase tracking-wider border-b border-white/10 text-[10px]">
                        <tr>
                            <th class="py-4 px-6 w-20">Cover</th>
                            <th class="py-4 px-6">Project Title & Slug</th>
                            <th class="py-4 px-6">Category</th>
                            <th class="py-4 px-6">Location</th>
                            <th class="py-4 px-6 text-center">Gallery Shots</th>
                            <th class="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        <?php if (empty($projects)): ?>
                            <tr>
                                <td colspan="6" class="py-12 text-center text-neutral-500 font-light">
                                    No architectural projects currently in database. Click "Add New Project" to create one.
                                </td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($projects as $proj): ?>
                                <tr class="hover:bg-white/[0.02] transition-colors">
                                    <!-- Cover Image Thumbnail -->
                                    <td class="py-4 px-6">
                                        <div class="w-14 h-14 bg-neutral-900 border border-white/10 overflow-hidden relative">
                                            <img src="<?= htmlspecialchars($proj['main_image_url']) ?>" 
                                                 alt="<?= htmlspecialchars($proj['title']) ?>" 
                                                 class="w-full h-full object-cover grayscale-[20%]">
                                        </div>
                                    </td>

                                    <!-- Title & Slug -->
                                    <td class="py-4 px-6">
                                        <a href="project-edit.php?id=<?= $proj['id'] ?>" class="text-sm font-light text-white hover:underline block">
                                            <?= htmlspecialchars($proj['title']) ?>
                                        </a>
                                        <span class="text-[11px] font-mono text-neutral-500">
                                            /portfolio/<?= htmlspecialchars($proj['slug']) ?>
                                        </span>
                                        <?php if ($proj['is_featured']): ?>
                                            <span class="inline-block ml-2 px-1.5 py-0.5 bg-amber-950/60 border border-amber-500/40 text-[9px] font-mono text-amber-300 uppercase">
                                                Featured
                                            </span>
                                        <?php endif; ?>
                                    </td>

                                    <!-- Category -->
                                    <td class="py-4 px-6 text-neutral-300">
                                        <?= htmlspecialchars($proj['category_name'] ?: 'Unassigned') ?>
                                    </td>

                                    <!-- Location & Year -->
                                    <td class="py-4 px-6 text-neutral-400">
                                        <?= htmlspecialchars($proj['location']) ?> (<?= (int)$proj['completion_year'] ?>)
                                    </td>

                                    <!-- Gallery Count -->
                                    <td class="py-4 px-6 text-center font-mono text-neutral-300">
                                        <?= (int)$proj['gallery_count'] ?> images
                                    </td>

                                    <!-- Actions -->
                                    <td class="py-4 px-6 text-right whitespace-nowrap">
                                        <div class="flex items-center justify-end gap-3">
                                            <a href="project-edit.php?id=<?= $proj['id'] ?>" 
                                               class="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] uppercase tracking-wider transition-colors">
                                                Edit
                                            </a>
                                            <form method="POST" action="index.php" onsubmit="return confirm('Are you sure you want to permanently delete this project?');" class="inline">
                                                <input type="hidden" name="action" value="delete">
                                                <input type="hidden" name="project_id" value="<?= $proj['id'] ?>">
                                                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                                                <button type="submit" class="px-3 py-1 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 rounded text-[11px] uppercase tracking-wider transition-colors">
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</body>
</html>
