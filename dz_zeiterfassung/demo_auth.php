<?php
// Demo Authentication System for Portfolio Integration
session_start();

// Demo user credentials
$demoUsers = [
    'demo' => [
        'password' => 'demo123',
        'vorname' => 'Demo',
        'nachname' => 'User',
        'recht' => 'demo', // Special demo right
        'id' => 999
    ]
];

// Check if this is a portfolio demo request
$isPortfolioDemo = isset($_GET['portfolio_demo']) || 
                   (isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], 'Portfolio') !== false);

// Auto-login demo user for portfolio demos
if ($isPortfolioDemo && !isset($_SESSION['person_id'])) {
    $_SESSION['person_id'] = 999;
    $_SESSION['person_vorname'] = 'Demo';
    $_SESSION['person_nachname'] = 'User';
    $_SESSION['person_recht'] = 'demo';
    $_SESSION['is_demo'] = true;
    $_SESSION['demo_language'] = isset($_GET['lang']) ? $_GET['lang'] : (isset($_GET['demo_lang']) ? $_GET['demo_lang'] : 'de');
}

// Demo authorization function
function checkDemoAuthorization($allowedRights = []) {
    global $isPortfolioDemo;
    
    if ($isPortfolioDemo) {
        // For portfolio demos, always allow access but mark as demo
        if (!isset($_SESSION['person_id'])) {
            // Auto-login demo user
            $_SESSION['person_id'] = 999;
            $_SESSION['person_vorname'] = 'Demo';
            $_SESSION['person_nachname'] = 'User';
            $_SESSION['person_recht'] = 'demo';
            $_SESSION['is_demo'] = true;
        }
        return true;
    }
    
    // Normal authorization logic would go here for non-demo users
    return false;
}

// Get demo translations
function getDemoTranslations() {
    return [
        'de' => [
            'demo_reminder_title' => 'Demo-Modus',
            'demo_reminder_message' => 'Dies ist nur eine Demo-Version. Alle Funktionen sind deaktiviert und dienen nur zur Ansicht.',
            'demo_only_navigation' => 'Nur die Navigation ist in der Demo verfügbar.',
            'understood' => 'Verstanden',
            'demo_user' => 'Demo Benutzer',
            'live_demo' => 'Live Demo'
        ],
        'en' => [
            'demo_reminder_title' => 'Demo Mode',
            'demo_reminder_message' => 'This is only a demo version. All functions are disabled and serve for viewing only.',
            'demo_only_navigation' => 'Only navigation is available in the demo.',
            'understood' => 'Understood',
            'demo_user' => 'Demo User',
            'live_demo' => 'Live Demo'
        ]
    ];
}
?>
