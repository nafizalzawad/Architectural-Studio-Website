-- =============================================================================
-- MINALE + MANN ARCHITECTURAL STUDIO - MASTER DATABASE SCHEMA
-- Target Environment: MySQL 8.0+ / MariaDB 10.4+ (cPanel Compatible)
-- Character Set: utf8mb4 / Collation: utf8mb4_unicode_ci
-- Engine: InnoDB
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `contact_submissions`;
DROP TABLE IF EXISTS `admin_users`;
DROP TABLE IF EXISTS `project_images`;
DROP TABLE IF EXISTS `portfolio_projects`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `services`;

SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------------------------------
-- 1. Table: admin_users (CMS Administrative Accounts)
-- -----------------------------------------------------------------------------
CREATE TABLE `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(60) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_admin_username` (`username`),
  UNIQUE KEY `uq_admin_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 2. Table: categories (Portfolio Categories)
-- -----------------------------------------------------------------------------
CREATE TABLE `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL,
  `type` ENUM('residential', 'commercial', 'heritage', 'hospitality') NOT NULL DEFAULT 'residential',
  `description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categories_slug` (`slug`),
  INDEX `idx_categories_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 3. Table: portfolio_projects (Architectural Case Studies)
-- -----------------------------------------------------------------------------
CREATE TABLE `portfolio_projects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `category_id` INT UNSIGNED DEFAULT NULL,
  `client_name` VARCHAR(150) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `concept_narrative` LONGTEXT DEFAULT NULL,
  `main_image_url` VARCHAR(500) NOT NULL,
  `location` VARCHAR(150) DEFAULT NULL,
  `completion_year` SMALLINT UNSIGNED DEFAULT NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `scope` VARCHAR(255) DEFAULT 'Architecture & Construction',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_portfolio_projects_slug` (`slug`),
  INDEX `idx_projects_category` (`category_id`),
  INDEX `idx_projects_created_at` (`created_at` DESC),
  INDEX `idx_projects_featured` (`is_featured`),
  CONSTRAINT `fk_projects_category` 
    FOREIGN KEY (`category_id`) 
    REFERENCES `categories` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 4. Table: project_images (Masonry Gallery Images)
-- -----------------------------------------------------------------------------
CREATE TABLE `project_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `display_order` INT UNSIGNED NOT NULL DEFAULT 0,
  `caption` VARCHAR(255) DEFAULT NULL,
  `aspect_ratio` ENUM('landscape', 'portrait', 'square', 'panoramic') NOT NULL DEFAULT 'landscape',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_project_images_order` (`project_id`, `display_order` ASC),
  CONSTRAINT `fk_project_images_project` 
    FOREIGN KEY (`project_id`) 
    REFERENCES `portfolio_projects` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 5. Table: services (Studio Practices & Disciplines)
-- -----------------------------------------------------------------------------
CREATE TABLE `services` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` INT UNSIGNED DEFAULT NULL,
  `title` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(160) NOT NULL,
  `short_description` TEXT NOT NULL,
  `full_description` LONGTEXT NOT NULL,
  `hero_image_url` VARCHAR(500) DEFAULT NULL,
  `display_order` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_services_slug` (`slug`),
  INDEX `idx_services_parent` (`parent_id`),
  INDEX `idx_services_display_order` (`display_order` ASC),
  CONSTRAINT `fk_services_parent` 
    FOREIGN KEY (`parent_id`) 
    REFERENCES `services` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- 6. Table: contact_submissions (Inquiries & Lead Captures)
-- -----------------------------------------------------------------------------
CREATE TABLE `contact_submissions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `service_interest` VARCHAR(100) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `user_agent` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_submissions_created` (`created_at` DESC),
  INDEX `idx_submissions_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- SEED DATA
-- =============================================================================

-- Default Admin User
-- Credentials: Username: admin | Password: password (Bcrypt: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi)
INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `email`) VALUES
(1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'studio@minaleandmann.com');

-- Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `type`, `description`) VALUES
(1, 'Prime Residential', 'residential', 'residential', 'High-end private townhouses, lateral apartments, and bespoke estates.'),
(2, 'Commercial & Hospitality', 'commercial', 'commercial', 'Flagship retail spaces, boutique hotels, and creative corporate headquarters.'),
(3, 'Heritage & Conservation', 'heritage', 'heritage', 'Listed buildings and sensitive historical restorations across central London.');

-- Portfolio Projects
INSERT INTO `portfolio_projects` (`id`, `title`, `slug`, `category_id`, `client_name`, `description`, `concept_narrative`, `main_image_url`, `location`, `completion_year`, `is_featured`, `scope`) VALUES
(1, 'The Battersea Powerhouse', 'the-battersea-powerhouse', 1, 'Private Client', 
 'A radical transformation of a former Victorian industrial warehouse into a monolithic, light-flooded four-storey residence.', 
 'Conceived as a dialogue between industrial fortitude and minimalist domestic tranquility, The Battersea Powerhouse strips away century-old accretions to reveal a raw steel and brick framework. A central triple-height atrium acts as a light well, channelling London daylight down into subterranean entertaining spaces. Smoked oak millwork, hand-troweled micro-cement, and burnished bronze accents establish an atmosphere of monumental calm.',
 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85', 
 'Battersea, London SW11', 2026, 1, 'Architecture, Interior Architecture, Full Construction'),

(2, 'Kensington Townhouse Conservation', 'kensington-townhouse-conservation', 3, 'Lord & Lady Harrington', 
 'Meticulous Grade II listed restoration uniting historical stucco grandeur with subterranean modernism.', 
 'Located within the Royal Borough of Kensington and Chelsea, this Grade II listed townhouse required forensic conservation alongside radical modern engineering. We excavated a two-level basement infrastructure to accommodate an indoor lap pool and climate-controlled art vault, while faithfully restoring ornate ceiling cornices, original Georgian sash windows, and solid lime plaster moldings upstairs.',
 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85', 
 'Kensington, London W8', 2025, 1, 'Planning Consents, Structural Excavation, Heritage Conservation'),

(3, 'The Mayfair Gallery & Headquarters', 'the-mayfair-gallery-headquarters', 2, 'Vanguard Contemporary Arts', 
 'Monolithic commercial gallery and executive headquarters crafted in Belgian bluestone and brushed stainless steel.', 
 'Commissioned by an international arts foundation, this Mayfair gallery rejects transient commercial tropes in favor of austere spatial permanence. Double-height exhibition volumes employ museum-grade tunable ceiling daylight membranes. The upper executive levels feature bespoke acoustic timber panels, fluted glass partitions, and sculptural bronze ironmongery.',
 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85', 
 'Mayfair, London W1', 2026, 1, 'Commercial Architecture, Interior Styling, Acoustic Engineering'),

(4, 'Chelsea Glasshouse Pavilion', 'chelsea-glasshouse-pavilion', 1, 'Private Collector', 
 'A razor-sharp frameless glass and patinated copper pavilion extending into a private Chelsea sanctuary.', 
 'Bridging an austere Georgian brick terrace with a secluded walled courtyard, this extension dissolves structural boundaries through minimal 20mm sightline structural glass. A polished charcoal terrazzo floor continues uninterrupted from interior living spaces onto the outdoor terrace, visually expanding the living footprint while honoring the historical architecture.',
 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=85', 
 'Chelsea, London SW3', 2025, 0, 'Structural Glazing, Landscape Integration, Turn-key Build'),

(5, 'Bayswater Penthouse & Sky Terrace', 'bayswater-penthouse-sky-terrace', 1, 'International Family Office', 
 'Lateral penthouse consolidation commanding 360-degree vistas across Hyde Park with sculpted travertine interiors.', 
 'Forged by combining two top-floor apartments overlooking Hyde Park, this 450 sqm residence embraces spatial fluidity. Axial sightlines frame park treetops through floor-to-ceiling blackened timber windows. Custom furniture pieces by renowned European makers were curated in dialogue with custom architectural plaster finishes.',
 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=85', 
 'Bayswater, London W2', 2025, 0, 'Apartment Consolidation, Bespoke Interior Design, Penthouse Terraces'),

(6, 'Soho Creative Atelier', 'soho-creative-atelier', 2, 'Aura Media Group', 
 'Adaptive reuse of a historic timber-framed printworks into an avant-garde creative studio and audio laboratory.', 
 'In the historic core of Soho, this four-level former printworks was re-engineered for a contemporary multidisciplinary media collective. Raw Douglas fir structural columns and cast-iron beams were sandblasted and stabilized, contrasting against brushed aluminum partitions and concealed state-of-the-art acoustic isolation capsules.',
 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85', 
 'Soho, London W1D', 2024, 0, 'Adaptive Reuse, Acoustic Design, Turnkey Fit-Out');

-- Gallery Images
INSERT INTO `project_images` (`project_id`, `image_url`, `display_order`, `caption`, `aspect_ratio`) VALUES
(1, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85', 1, 'Cantilevered smoked timber kitchen island with integrated downlights', 'landscape'),
(1, 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85', 2, 'Double-height volume framing the internal garden atrium', 'portrait'),
(1, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85', 3, 'Monolithic en-suite lined with honed limestone', 'portrait'),
(1, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85', 4, 'Full-span sliding glass apertures to south courtyard', 'panoramic'),

(2, 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=85', 1, 'Restored ornamental plasterwork and modern bespoke lighting', 'landscape'),
(2, 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85', 2, 'Master dressing suite in smoked eucalyptus veneer', 'portrait'),
(2, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85', 3, 'Subterranean wellness sanctuary with honed basalt', 'portrait'),

(3, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85', 1, 'Gallery circulation corridor with micro-cement floors', 'landscape'),
(3, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85', 2, 'Facade detail with fluted limestone and bronze mullions', 'portrait'),
(3, 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=85', 3, 'Executive boardroom overlooking Berkeley Square', 'portrait');

-- Services
INSERT INTO `services` (`id`, `parent_id`, `title`, `slug`, `short_description`, `full_description`, `hero_image_url`, `display_order`) VALUES
(1, NULL, 'Architectural Design', 'architectural-design', 'Purity of form and spatial clarity.', '<p>Our architectural team conceptualises residential and commercial projects with an emphasis on spatial purity, light modulation, and material authenticity.</p>', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85', 1),
(2, NULL, 'Interior Design', 'interior-design', 'Tactile curation and bespoke millwork.', '<p>Our interiors studio creates contemplative, serene living environments.</p>', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85', 2),
(3, NULL, 'Create & Construct', 'create-construct', 'Turn-key construction and master craftsmanship.', '<p>By unifying design and construction beneath one roof, we eliminate contractor friction.</p>', 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2000&q=85', 3);
