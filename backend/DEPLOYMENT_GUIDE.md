# Production cPanel Deployment & Migration Guide
**Minale + Mann Architectural Studio Clone**

This blueprint guides you through deploying the static Next.js frontend, the PHP REST API, the media upload engine, and the CMS administration panel onto any standard cPanel web hosting environment.

---

## 1. Directory Mapping in `public_html/`

On your cPanel server, the target structure inside `/home/username/public_html/` should look like this:

```
public_html/
├── .htaccess                 # Routing, clean URLs, and subdirectory bypass (from cpanel/.htaccess)
├── 404.html                  # Exported from out/
├── index.html                # Exported from out/
├── about.html                # Exported from out/
├── contact.html              # Exported from out/
├── portfolio.html            # Exported from out/
├── services.html             # Exported from out/
├── _next/                    # Static CSS, JS bundles & chunks (from out/_next/)
├── portfolio/                # Static slug HTML files (from out/portfolio/)
│   ├── the-battersea-powerhouse.html
│   ├── kensington-townhouse-conservation.html
│   └── ...
├── services/                 # Static service HTML files (from out/services/)
│   ├── architectural-design.html
│   ├── planning-applications.html
│   └── ...
│
├── api/                      # PHP REST API (from backend/api/)
│   ├── config/database.php
│   ├── helpers/response.php
│   ├── projects.php
│   ├── categories.php
│   ├── contact.php
│   └── upload.php
│
├── admin/                    # Zero-Build CMS Panel (from backend/admin/)
│   ├── auth_check.php
│   ├── login.php
│   ├── logout.php
│   ├── index.php
│   └── project-edit.php
│
└── uploads/                  # Uploaded media assets (from backend/uploads/)
    └── .htaccess             # Hardened security (disables PHP script execution)
```

---

## 2. Step-by-Step Deployment Instructions

### Step 1: Database Setup on cPanel
1. Log into your cPanel account.
2. Under the **Databases** section, open **MySQL Database Wizard**:
   * **Database Name**: Create a database (e.g. `cpaneluser_minale_cms`).
   * **Database User**: Create a user (e.g. `cpaneluser_admin`) with a strong password.
   * **Privileges**: Grant **ALL PRIVILEGES** to the user on this database.
3. Open **phpMyAdmin** from cPanel:
   * Select your new database (`cpaneluser_minale_cms`).
   * Click **Import** in the top navigation.
   * Choose the file [`backend/schema.sql`](file:///f:/Client%20Work/Architech%20Wakeel%20Uncle/backend/schema.sql) and click **Go**.
   * All 6 tables (`admin_users`, `categories`, `portfolio_projects`, `project_images`, `services`, `contact_submissions`) and seed rows will be created.

### Step 2: Configure Database Credentials in PHP
In `public_html/api/config/database.php`:
Update lines 18–22 or set environment variables in cPanel:
```php
$host   = 'localhost';
$dbName = 'cpaneluser_minale_cms';
$user   = 'cpaneluser_admin';
$pass   = 'your_secure_mysql_password';
$port   = '3306';
```

### Step 3: Upload Backend (`api/`, `admin/`, `uploads/`)
1. In cPanel **File Manager**, navigate to `public_html/`.
2. Upload the contents of `backend/`:
   * Upload `backend/api/` to `public_html/api/`
   * Upload `backend/admin/` to `public_html/admin/`
   * Upload `backend/uploads/` to `public_html/uploads/` (ensure folder permissions are set to `755`)

### Step 4: Build & Upload Next.js Frontend
1. In your local terminal, run:
   ```bash
   npm run build
   ```
   Next.js generates the complete static site inside the `out/` directory.
2. Zip the contents of the `out/` directory (or upload files directly via FTP / File Manager) into `public_html/`:
   * Upload all `.html` files, the `_next/` directory, `portfolio/`, `services/`, and `.htaccess`.

### Step 5: Test & Verify
1. **Frontend**: Open `https://yourdomain.com/` in your browser. Verify navigation, `/about`, `/services/architectural-design`, `/portfolio/the-battersea-powerhouse`, and `/contact`.
2. **REST API**:
   * `https://yourdomain.com/api/projects.php` $\rightarrow$ Returns JSON list of projects.
   * `https://yourdomain.com/api/projects.php?slug=the-battersea-powerhouse` $\rightarrow$ Returns single project case study.
   * `https://yourdomain.com/api/categories.php` $\rightarrow$ Returns categories and project counts.
3. **Admin CMS Panel**:
   * Navigate to `https://yourdomain.com/admin/login.php`
   * Default Username: `admin`
   * Default Password: `password`
   * Verify landing on the project list dashboard (`/admin/index.php`).
   * Test creating a project and uploading gallery images to `/uploads/`.
