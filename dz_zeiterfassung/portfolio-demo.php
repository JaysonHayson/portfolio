<?php
// Direct portfolio demo entry point (bypasses routing)
$_GET['portfolio_demo'] = '1';

// Set demo language if provided
if (isset($_GET['lang'])) {
    $_GET['demo_lang'] = $_GET['lang'];
}

require_once 'view/dz_dashboard.php';
?>
