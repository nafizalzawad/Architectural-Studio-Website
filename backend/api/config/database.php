<?php
/**
 * Singleton Database Connector (cPanel MySQL Environment)
 * File: backend/api/config/database.php
 */

class Database {
    private static ?PDO $instance = null;

    /**
     * Prevent direct instantiation
     */
    private function __construct() {}
    private function __clone() {}

    /**
     * Return Singleton PDO Connection
     */
    public static function getConnection(): PDO {
        if (self::$instance === null) {
            // Read from db_credentials.php file if present, then environment variables, then defaults
            $credentialsFile = __DIR__ . '/db_credentials.php';
            $creds = file_exists($credentialsFile) ? require $credentialsFile : [];

            $host = getenv('DB_HOST') ?: ($creds['host'] ?? 'localhost');
            $dbName = getenv('DB_NAME') ?: ($creds['dbname'] ?? 'cpanel_minale_cms');
            $user = getenv('DB_USER') ?: ($creds['user'] ?? 'cpanel_db_user');
            $pass = getenv('DB_PASS') ?: ($creds['pass'] ?? 'secure_password_here');
            $port = getenv('DB_PORT') ?: ($creds['port'] ?? '3306');

            $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset=utf8mb4";

            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            ];

            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (PDOException $e) {
                // Return clean 500 error without leaking server stack trace
                http_response_code(500);
                header('Content-Type: application/json; charset=UTF-8');
                echo json_encode([
                    'success' => false,
                    'status'  => 500,
                    'error'   => 'Database connection failed: ' . $e->getMessage()
                ]);
                exit;
            }
        }

        return self::$instance;
    }
}
