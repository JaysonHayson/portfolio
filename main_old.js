// Simple Portfolio JavaScript with Scroll Animations

// Demo Modal Functions
function openDemoModal() {
    const modal = document.getElementById('demoModal');
    const modalBody = modal.querySelector('.demo-modal-body');
    
    // Show modal immediately for animation
    modal.style.display = 'flex';
    
    // Force a reflow to ensure display change is applied
    modal.offsetHeight;
    
    // Trigger opening animation
    modal.classList.add('show');
    
    // Add loading state
    modalBody.classList.add('loading');
    
    // Load real time tracking application
    loadRealTimeTrackingApp();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    const iframe = document.getElementById('demoFrame');
    const infoPanel = document.getElementById('demoInfo');
    
    // Start closing animation
    modal.classList.add('closing');
    modal.classList.remove('show');
    
    // Hide info panel if open
    if (infoPanel) {
        infoPanel.classList.remove('show');
    }
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        iframe.src = ''; // Stop loading iframe content
        document.body.style.overflow = 'auto';
    }, 300);
}

function loadDemo() {
    const iframe = document.getElementById('demoFrame');
    const modalBody = document.querySelector('.demo-modal-body');
    
    modalBody.classList.add('loading');
    iframe.src = 'dz_zeiterfassung/demo.php';
    
    iframe.onload = function() {
        modalBody.classList.remove('loading');
    };
}

function loadDashboard() {
    const iframe = document.getElementById('demoFrame');
    const modalBody = document.querySelector('.demo-modal-body');
    
    modalBody.classList.add('loading');
    iframe.src = 'dz_zeiterfassung/view/dz_dashboard.php';
    
    iframe.onload = function() {
        modalBody.classList.remove('loading');
    };
}

function loadRealTimeTrackingApp() {
    const iframe = document.getElementById('demoFrame');
    const modalBody = document.querySelector('.demo-modal-body');
    
    modalBody.classList.add('loading');
    
    // Get current language
    const currentLang = languageManager.currentLanguage;
    
    // Load the real time tracking application with portfolio demo parameter and language
    iframe.src = `/dz_zeiterfassung/portfolio-demo.php?lang=${currentLang}`;
    
    iframe.onload = function() {
        modalBody.classList.remove('loading');
        
        // Send current theme to iframe
        sendThemeToIframe();
    };
}

// Function to send theme information to iframe
function sendThemeToIframe() {
    const iframe = document.getElementById('demoFrame');
    if (iframe && iframe.contentWindow) {
        try {
            const isModern = document.body.classList.contains('theme-modern');
            const themeMessage = {
                type: 'theme-change',
                theme: isModern ? 'modern' : 'retro'
            };
            iframe.contentWindow.postMessage(themeMessage, '*');
            console.log('Portfolio: Sent theme to time tracking app:', themeMessage.theme);
        } catch (e) {
            console.log('Portfolio: Could not send theme message to iframe:', e);
        }
    }
}

function loadPortfolioDemo() {
    const iframe = document.getElementById('demoFrame');
    const modalBody = document.querySelector('.demo-modal-body');
    
    modalBody.classList.add('loading');
    
    // Detect current theme
    const isModern = document.body.classList.contains('theme-modern');
    const themeParam = isModern ? '?theme=modern' : '';
    
    iframe.src = `dz_zeiterfassung/portfolio_demo.php${themeParam}`;
    
    iframe.onload = function() {
        modalBody.classList.remove('loading');
        
        // Send theme info to iframe
        try {
            const themeMessage = {
                type: 'theme-change',
                theme: isModern ? 'modern' : 'retro'
            };
            iframe.contentWindow.postMessage(themeMessage, '*');
        } catch (e) {
            console.log('Could not send theme message to iframe:', e);
        }
    };
}

function toggleDemoInfo() {
    const infoPanel = document.getElementById('demoInfo');
    if (infoPanel) {
        infoPanel.classList.toggle('show');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('demoModal');
    if (event.target === modal) {
        closeDemoModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('demoModal');
        if (modal.classList.contains('show')) {
            closeDemoModal();
        }
    }
});

// Listen for messages from iframe (e.g., back to portfolio)
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'close-demo-modal') {
        closeDemoModal();
    }
});

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Simple navigation active state
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function handleScrollAnimations() {
    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Trigger animation when element is 80% visible
        if (elementTop <= windowHeight * 0.8) {
            if (element.classList.contains('scroll-animate')) {
                element.classList.add('fade-in');
            }
            if (element.classList.contains('scroll-animate-left')) {
                element.classList.add('slide-in');
            }
            if (element.classList.contains('scroll-animate-right')) {
                element.classList.add('slide-in');
            }
            if (element.classList.contains('scroll-animate-scale')) {
                element.classList.add('scale-in');
            }
        }
    });
}

// Simple skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const skillItem = bar.closest('.skill-item');
        const elementTop = skillItem.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Only animate if skill item is visible
        if (elementTop <= windowHeight * 0.8) {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            }, index * 100);
        }
    });
}

// Enhanced intersection observer for better scroll animations
function setupAdvancedObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle skill bars animation
                if (entry.target.classList.contains('skills')) {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 500); // Small delay for better effect
                }
                
                // Add a subtle entrance effect for sections
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        // Initial state for sections
        section.style.opacity = '0.3';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(section);
    });
    
    // Don't animate the hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
}

// Simple form handling with translation support
function handleFormSubmit() {
    const form = document.querySelector('.pixel-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert(langManager.t('contact.form.error'));
            return;
        }
        
        const submitBtn = form.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = langManager.t('contact.form.sending');
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
            alert(langManager.t('contact.form.success'));
        }, 1500);
    });
}

// Throttle function to improve scroll performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language system first
    if (typeof langManager !== 'undefined') {
        langManager.updatePage();
    }
    
    // Setup basic functionality
    updateActiveNavLink();
    setupAdvancedObserver();
    handleFormSubmit();
    
    // Initial scroll animation check
    handleScrollAnimations();
    
    // Navigation click handlers
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Throttled scroll event listeners for better performance
    const throttledScrollHandler = throttle(() => {
        updateActiveNavLink();
        handleScrollAnimations();
        animateSkillBars();
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Button click handlers
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.onclick) return;
            
            const text = this.textContent.toLowerCase();
            if (text.includes('project') || text.includes('projekte')) {
                scrollToSection('projects');
                e.preventDefault();
            } else if (text.includes('contact') || text.includes('kontakt')) {
                scrollToSection('contact');
                e.preventDefault();
            }
        });
    });
    
    console.log('Portfolio with translations and scroll animations loaded successfully!');
    
    // Initialize theme on page load
    if (typeof langManager !== 'undefined') {
        langManager.updatePage();
    }
});
