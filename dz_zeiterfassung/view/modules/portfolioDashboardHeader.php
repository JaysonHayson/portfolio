<?php
// Überprüfen, ob der Benutzer eingeloggt ist und die richtigen Rechte hat
$isPortfolioDemo = isset($_GET['portfolio_demo']) || 
                   (isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'], 'Portfolio') !== false);

if ($isPortfolioDemo) {
    require_once '../demo_auth.php';
    checkDemoAuthorization();
} else {
    require_once '../dz_auth.php';
    checkAuthorization(['a', 'hr', 'm']);
}

$userVorname = isset($_SESSION['person_vorname']) ? $_SESSION['person_vorname'] : '';
$userNachname = isset($_SESSION['person_nachname']) ? $_SESSION['person_nachname'] : '';
$userRecht = isset($_SESSION['person_recht']) ? $_SESSION['person_recht'] : '';
$userId = isset($_SESSION['person_id']) ? $_SESSION['person_id'] : '';
$isDemo = isset($_SESSION['is_demo']) ? $_SESSION['is_demo'] : false;
$demoLanguage = isset($_SESSION['demo_language']) ? $_SESSION['demo_language'] : 'de';

// Get demo translations
if ($isPortfolioDemo) {
    $translations = getDemoTranslations();
    $t = $translations[$demoLanguage];
}
?>

<!DOCTYPE html>
<html lang="de" <?php echo $isPortfolioDemo ? 'class="portfolio-demo"' : ''; ?>>

<head>
    <meta charset="UTF-8">
    <?php if ($isPortfolioDemo): ?>
    <meta name="viewport" content="width=1920, initial-scale=0.6, user-scalable=no">
    <?php else: ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php endif; ?>
    <title>Dashboard<?php echo $isPortfolioDemo ? ' - Portfolio Demo' : ''; ?></title>
    <link rel="stylesheet" href="view/css/dz_allgemein.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="view/css/dz_dashboard.css">
    <link rel="stylesheet" href="view/css/dz_farben.css.php">
    <?php if ($isPortfolioDemo): ?>
    <link rel="stylesheet" href="view/css/portfolio_scaling.css">
    <?php endif; ?>
    <link rel="icon" type="image/svg" href="view/assets/duz-logo.svg">
    
    <?php if ($isPortfolioDemo): ?>
    <style>
        /* GLOBALE PORTFOLIO MODAL SKALIERUNG */
        /* Diese Skalierung wird direkt auf das HTML Element angewendet für maximale Kompatibilität */
        
        html {
            zoom: 0.6 !important; /* Optimale Skalierung für iframe */
            transform: scale(0.6) !important;
            transform-origin: top left !important;
            width: 166.67% !important; /* 100/0.6 */
            height: 166.67% !important;
            overflow-x: hidden !important;
        }
        
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100vw !important;
            min-height: 100vh !important;
            overflow-x: hidden !important;
            font-size: 16px !important; /* Bessere Lesbarkeit bei Skalierung */
        }
        
        /* Backup Skalierung für bessere Kompatibilität */
        * {
            box-sizing: border-box !important;
        }
        
        /* Portfolio Demo Navigation Styles */
        .portfolio-nav {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 10000;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 8px;
            padding: 8px;
            display: flex;
            gap: 8px;
            backdrop-filter: blur(10px);
            transform: scale(1.4) !important; /* Navigation größer machen da sie mit der Seite skaliert wird */
        }
        
        /* Default Theme (Retro) Colors - Exakte Portfolio-Farben */
        .portfolio-back-btn {
            background: #d4af37; /* Portfolio primary color */
            color: #f5e6d3; /* Portfolio text-light */
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: 'Press Start 2P', monospace;
        }
        
        .portfolio-back-btn:hover {
            background: #cd853f; /* Portfolio secondary color */
            transform: translateY(-1px);
        }
        
        .portfolio-demo-badge {
            background: #cd853f; /* Portfolio secondary color */
            color: #f5e6d3; /* Portfolio text-light */
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: 'Press Start 2P', monospace;
        }
        
        /* Modern Theme Colors - Exakte Portfolio-Farben */
        .theme-modern .portfolio-back-btn {
            background: #2563eb !important; /* Portfolio modern primary */
            color: #1e293b !important; /* Portfolio modern text-light */
            border-radius: 8px !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        
        .theme-modern .portfolio-back-btn:hover {
            background: #1d4ed8 !important; /* Portfolio modern secondary */
        }
        
        .theme-modern .portfolio-demo-badge {
            background: #1d4ed8 !important; /* Portfolio modern secondary */
            color: #1e293b !important; /* Portfolio modern text-light */
            border-radius: 8px !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        
        .theme-modern .portfolio-nav {
            border-radius: 12px !important;
        }
        
        /* Responsive Anpassungen für verschiedene Modal-Größen */
        @media (max-width: 1200px) {
            html {
                zoom: 0.5 !important;
                transform: scale(0.5) !important;
                width: 200% !important; /* 100/0.5 */
                height: 200% !important;
            }
            
            .portfolio-nav {
                transform: scale(1.8) !important;
                top: 5px;
                right: 5px;
            }
        }
        
        @media (max-width: 900px) {
            html {
                zoom: 0.4 !important;
                transform: scale(0.4) !important;
                width: 250% !important; /* 100/0.4 */
                height: 250% !important;
            }
            
            .portfolio-nav {
                position: relative;
                top: 0;
                right: 0;
                margin: 5px;
                justify-content: center;
                transform: scale(2.2) !important;
            }
        }
        
        @media (max-width: 600px) {
            html {
                zoom: 0.3 !important;
                transform: scale(0.3) !important;
                width: 333.33% !important; /* 100/0.3 */
                height: 333.33% !important;
            }
            
            .portfolio-nav {
                transform: scale(2.8) !important;
            }
        }
        
        /* Deaktiviere alle Transitionen für bessere Performance */
        *, *:before, *:after {
            transition: none !important;
            animation-duration: 0s !important;
            animation-delay: 0s !important;
        }
        
        /* Iframe spezifische Anpassungen */
        .iframe-scaling {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
            overflow: hidden !important;
        }
        
        /* Demo Restrictions - Disable all interactive elements except navigation */
        .demo-disabled {
            pointer-events: none !important;
            opacity: 0.6 !important;
            cursor: not-allowed !important;
        }
        
        .demo-clickable {
            pointer-events: auto !important;
            opacity: 1 !important;
            cursor: pointer !important;
        }
        
        /* Demo Modal Styles */
        .demo-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            backdrop-filter: blur(5px);
        }
        
        .demo-modal {
            background: var(--portfolio-bg-dark, #2f2a1e);
            border: 2px solid var(--portfolio-primary, #d4af37);
            border-radius: 12px;
            padding: 24px;
            max-width: 400px;
            margin: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            transform: scale(1.2); /* Größer machen da die ganze Seite skaliert ist */
        }
        
        .demo-modal h3 {
            color: var(--portfolio-primary, #d4af37);
            margin: 0 0 16px 0;
            font-size: 18px;
            font-family: 'Press Start 2P', monospace;
        }
        
        .demo-modal p {
            color: var(--portfolio-text-light, #f5e6d3);
            margin: 0 0 16px 0;
            line-height: 1.5;
            font-size: 14px;
        }
        
        .demo-modal button {
            background: var(--portfolio-primary, #d4af37);
            color: var(--portfolio-bg-dark, #2f2a1e);
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Press Start 2P', monospace;
        }
        
        .demo-modal button:hover {
            background: var(--portfolio-secondary, #cd853f);
            transform: translateY(-1px);
        }
        
        /* Modern theme modal styles */
        .theme-modern .demo-modal {
            background: var(--portfolio-bg-dark, #ffffff);
            border-color: var(--portfolio-primary, #2563eb);
        }
        
        .theme-modern .demo-modal h3 {
            color: var(--portfolio-primary, #2563eb);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .theme-modern .demo-modal p {
            color: var(--portfolio-text-light, #1e293b);
        }
        
        .theme-modern .demo-modal button {
            background: var(--portfolio-primary, #2563eb);
            color: var(--portfolio-bg-dark, #ffffff);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            border-radius: 8px;
        }
        
        .theme-modern .demo-modal button:hover {
            background: var(--portfolio-secondary, #1d4ed8);
        }
    </style>
    <?php endif; ?>
</head>

<body <?php echo $isPortfolioDemo ? 'class="portfolio-demo"' : ''; ?>>
<?php if ($isPortfolioDemo): ?>
<div class="portfolio-nav">
    <div class="portfolio-demo-badge">
        🎯 Live Demo
    </div>
    <button class="portfolio-back-btn" onclick="goBackToPortfolio()">
        ⬅️ Back to Portfolio
    </button>
</div>
<?php endif; ?>

<div class="main-content" 
    data-user-vorname="<?php echo htmlspecialchars($userVorname); ?>" 
    data-user-nachname="<?php echo htmlspecialchars($userNachname); ?>" 
    data-user-recht="<?php echo htmlspecialchars($userRecht); ?>"
    data-user-id="<?php echo htmlspecialchars($userId); ?>">
    <div class="navigation-links <?php echo $isPortfolioDemo ? 'demo-clickable' : ''; ?>">
    <img src="view/assets/duz-logo.svg" alt="wasserzeichenlogo" class="wasserzeichen">
        <span class="not-hover"></span>
        <a href="/dz_zeiterfassung/zeiterfassung<?php echo $isPortfolioDemo ? '?portfolio_demo=1' : ''; ?>" 
           class="nav-link-a tooltip hoverable noborder last-clicked <?php echo $isPortfolioDemo ? 'demo-clickable' : ''; ?>" 
           title="Zeiterfassung" id="zeiterfassung"
           <?php echo $isPortfolioDemo ? 'onclick="showDemoReminder(event)"' : ''; ?>>
            <div class="nav-link">
                <img src="view/assets/clock.svg" alt="Zeiterfassung" class="nav-icon">
            </div>
        </a>
        <a href="<?= $isPortfolioDemo ? '#' : (($_SESSION['person_recht'] === 'a' || $_SESSION['person_recht'] === 'hr') ? '/dz_zeiterfassung/mitarbeiterverwaltung' . ($isPortfolioDemo ? '?portfolio_demo=1' : '') : '#'); ?>" 
            class="nav-link-a tooltip hoverable <?= ($_SESSION['person_recht'] !== 'a' && $_SESSION['person_recht'] !== 'hr') || $isPortfolioDemo ? 'disabled-link' : '' ?> <?php echo $isPortfolioDemo ? 'demo-clickable' : ''; ?>" 
            title="Mitarbeiterverwaltung"
            <?php echo $isPortfolioDemo ? 'onclick="showDemoReminder(event)"' : ''; ?>>
            <div class="nav-link">
                <img src="view/assets/users.svg" alt="Mitarbeiter" class="nav-icon">
            </div>
        </a>
            
        </a>
        <a href="<?= $isPortfolioDemo ? '#' : (in_array($_SESSION['person_recht'], ['a', 'hr', 'm']) ? '/dz_zeiterfassung/export' . ($isPortfolioDemo ? '?portfolio_demo=1' : '') : '#'); ?>" 
        class="nav-link-a tooltip hoverable <?= !in_array($_SESSION['person_recht'], ['a', 'hr', 'm']) || $isPortfolioDemo ? 'disabled-link' : '' ?> <?php echo $isPortfolioDemo ? 'demo-clickable' : ''; ?>"
        title="Exportieren"
        <?php echo $isPortfolioDemo ? 'onclick="showDemoReminder(event)"' : ''; ?>>
            <div class="nav-link">
                <img src="view/assets/file.svg" alt="Export" class="nav-icon">
            </div>
        </a>

        <a href="#" 
        class="nav-link-a tooltip hoverable <?php echo $isPortfolioDemo ? 'demo-clickable' : ''; ?>" title="Logout" id="logout"
        <?php echo $isPortfolioDemo ? 'onclick="showDemoReminder(event)"' : ''; ?>>
            <div class="nav-link">
                <img src="view/assets/logout.svg" alt="Logout" class="nav-icon">
            </div>
        </a>
        <span></span>
    </div>
    <div class="header">
        <div id="userBox"><?php echo $isPortfolioDemo ? $t['demo_user'] : ''; ?></div>
        <div id="datum-uhrzeit" title="Aktuelle Uhrzeit und Datum">
            <span id="datum"></span>
            <span id="uhrzeit"></span>
        </div>
    </div>

<!-- Demo Modal for showing restrictions -->
<?php if ($isPortfolioDemo): ?>
<div id="demoModal" class="demo-modal-overlay" style="display: none;">
    <div class="demo-modal">
        <h3><?php echo $t['demo_reminder_title']; ?></h3>
        <p><?php echo $t['demo_reminder_message']; ?></p>
        <p><strong><?php echo $t['demo_only_navigation']; ?></strong></p>
        <button onclick="closeDemoModal()"><?php echo $t['understood']; ?></button>
    </div>
</div>

<!-- Wrap main content to apply demo restrictions -->
<div class="<?php echo $isPortfolioDemo ? 'demo-disabled' : ''; ?>" id="mainContent">
<?php endif; ?>

<?php if ($isPortfolioDemo): ?>
<script>
// Demo language and translations
const demoLanguage = '<?php echo $demoLanguage; ?>';
const demoTranslations = <?php echo json_encode($translations); ?>;

function showDemoReminder(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Add animation
        const modalContent = modal.querySelector('.demo-modal');
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        requestAnimationFrame(() => {
            modalContent.style.transition = 'all 0.3s ease';
            modalContent.style.transform = 'scale(1.2)'; // Account for page scaling
            modalContent.style.opacity = '1';
        });
    }
    
    return false;
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        const modalContent = modal.querySelector('.demo-modal');
        modalContent.style.transition = 'all 0.2s ease';
        modalContent.style.transform = 'scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200);
    }
}

// Close modal on escape key or overlay click
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDemoModal();
    }
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('demo-modal-overlay')) {
        closeDemoModal();
    }
});

// Apply demo restrictions to all content except navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get main content area (everything except navigation and header)
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        // Find all interactive elements
        const interactiveElements = mainContent.querySelectorAll(
            'button, input, textarea, select, a:not(.nav-link-a), [onclick], [onchange], form, .clickable, .btn'
        );
        
        // Disable all interactive elements except navigation
        interactiveElements.forEach(element => {
            // Skip navigation elements
            if (!element.closest('.navigation-links') && 
                !element.closest('.portfolio-nav') && 
                !element.classList.contains('demo-clickable')) {
                
                element.classList.add('demo-disabled');
                
                // Add click handler to show demo reminder
                element.addEventListener('click', function(e) {
                    showDemoReminder(e);
                });
                
                // Disable form submission
                if (element.tagName === 'FORM') {
                    element.addEventListener('submit', function(e) {
                        e.preventDefault();
                        showDemoReminder(e);
                    });
                }
            }
        });
        
        // Add general click handler to catch any missed interactive elements
        mainContent.addEventListener('click', function(e) {
            const target = e.target;
            
            // If clicked element is not navigation or already handled
            if (!target.closest('.navigation-links') && 
                !target.closest('.portfolio-nav') &&
                !target.classList.contains('demo-clickable') &&
                !target.closest('.demo-modal')) {
                
                // Check if it's an interactive element
                const isInteractive = target.matches('button, input, textarea, select, a, [onclick], [onchange]') ||
                                    target.closest('button, input, textarea, select, a:not(.nav-link-a), [onclick], [onchange]');
                
                if (isInteractive) {
                    showDemoReminder(e);
                }
            }
        });
    }
});

function goBackToPortfolio() {
    // Try to close the modal in parent window
    try {
        if (window.parent && window.parent !== window) {
            // If in iframe, send message to parent
            window.parent.postMessage({
                type: 'close-demo-modal'
            }, '*');
        } else {
            // If in new tab, try to go back or close
            if (history.length > 1) {
                history.back();
            } else {
                window.close();
            }
        }
    } catch (e) {
        console.log('Could not return to portfolio:', e);
        // Fallback: try to navigate to portfolio
        window.location.href = '/Portfolio/main.html';
    }
}

// Listen for ESC key to go back
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        goBackToPortfolio();
    }
});

// Enforce scaling on load
document.addEventListener('DOMContentLoaded', function() {
    // Force scaling with multiple methods for maximum compatibility
    const html = document.documentElement;
    const body = document.body;
    
    // Determine optimal scale based on iframe size
    function getOptimalScale() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate scale based on available space
        // Assuming 1920x1080 is the original design size
        const scaleX = viewportWidth / 1920;
        const scaleY = viewportHeight / 1080;
        
        // Use the smaller scale to ensure everything fits
        let scale = Math.min(scaleX, scaleY);
        
        // Apply some padding and ensure minimum readability
        scale *= 0.95; // 5% padding
        
        // Clamp between reasonable bounds
        scale = Math.max(0.3, Math.min(1.0, scale));
        
        return scale;
    }
    
    const scale = getOptimalScale();
    
    // Method 1: CSS Transform
    html.style.transform = `scale(${scale})`;
    html.style.transformOrigin = 'top left';
    html.style.width = `${100/scale}%`;
    html.style.height = `${100/scale}%`;
    html.style.overflow = 'hidden';
    
    // Method 2: CSS Zoom (Webkit browsers)
    html.style.zoom = scale.toString();
    
    // Method 3: Apply to body as backup
    body.style.zoom = scale.toString();
    body.style.transform = `scale(${scale})`;
    body.style.transformOrigin = 'top left';
    
    console.log(`Applied optimal scaling: ${scale.toFixed(3)} for iframe size: ${window.innerWidth}x${window.innerHeight}px`);
    
    // Theme Detection and Application
    detectAndApplyTheme();
    
    // Add visual indicator that this is a demo - mit Portfolio-Farben
    document.body.style.border = '2px solid #cd853f'; // Portfolio secondary color
    document.body.style.boxShadow = 'inset 0 0 10px rgba(205, 133, 63, 0.2)'; // Portfolio warm-shadow
    
    // Force reflow to ensure CSS is applied
    setTimeout(() => {
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
    }, 100);
    
    // Reapply scaling on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newScale = getOptimalScale();
            html.style.transform = `scale(${newScale})`;
            html.style.zoom = newScale.toString();
            html.style.width = `${100/newScale}%`;
            html.style.height = `${100/newScale}%`;
            body.style.transform = `scale(${newScale})`;
            body.style.zoom = newScale.toString();
            console.log(`Reapplied scaling: ${newScale.toFixed(3)}`);
        }, 250);
    });
});

// Theme Detection Function
function detectAndApplyTheme() {
    console.log('DZ App: Starting theme detection...');
    try {
        // Try to detect theme from parent window
        if (window.parent && window.parent !== window) {
            const parentBody = window.parent.document.body;
            const isModernTheme = parentBody.classList.contains('theme-modern');
            
            if (isModernTheme) {
                document.body.classList.add('theme-modern');
                // Update demo indicator for modern theme - mit Portfolio-Farben
                document.body.style.border = '2px solid #2563eb'; // Portfolio modern primary
                document.body.style.boxShadow = 'inset 0 0 10px rgba(37, 99, 235, 0.15)'; // Portfolio modern sepia-shadow
                console.log('DZ App: Applied modern theme from parent detection');
            } else {
                document.body.classList.remove('theme-modern');
                // Keep retro theme colors - mit Portfolio-Farben
                document.body.style.border = '2px solid #cd853f'; // Portfolio secondary
                document.body.style.boxShadow = 'inset 0 0 10px rgba(205, 133, 63, 0.2)'; // Portfolio warm-shadow
                console.log('DZ App: Applied retro theme from parent detection');
            }
        }
    } catch (e) {
        console.log('DZ App: Could not access parent theme, using default retro theme:', e);
        // Fallback: use retro theme
        document.body.classList.remove('theme-modern');
    }
}

// Listen for theme changes from parent
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'theme-change') {
        console.log('DZ App: Received theme message:', event.data.theme);
        if (event.data.theme === 'modern') {
            document.body.classList.add('theme-modern');
            document.body.style.border = '2px solid #2563eb'; // Portfolio modern primary
            document.body.style.boxShadow = 'inset 0 0 10px rgba(37, 99, 235, 0.15)'; // Portfolio modern sepia-shadow
            console.log('DZ App: Switched to modern theme via message');
        } else {
            document.body.classList.remove('theme-modern');
            document.body.style.border = '2px solid #cd853f'; // Portfolio secondary
            document.body.style.boxShadow = 'inset 0 0 10px rgba(205, 133, 63, 0.2)'; // Portfolio warm-shadow
            console.log('DZ App: Switched to retro theme via message');
        }
    }
});

// Additional scaling enforcement
window.addEventListener('load', function() {
    // Final scaling check after everything is loaded
    setTimeout(() => {
        const html = document.documentElement;
        if (!html.style.transform.includes('scale')) {
            // Fallback to dynamic scaling if nothing was applied
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const scaleX = viewportWidth / 1920;
            const scaleY = viewportHeight / 1080;
            const scale = Math.min(scaleX, scaleY) * 0.95;
            const finalScale = Math.max(0.3, Math.min(1.0, scale));
            
            html.style.transform = `scale(${finalScale})`;
            html.style.transformOrigin = 'top left';
            html.style.zoom = finalScale.toString();
            console.log(`Applied fallback scaling: ${finalScale.toFixed(3)}`);
        }
    }, 500);
});
</script>
<?php endif; ?>
