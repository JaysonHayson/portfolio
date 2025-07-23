

function openDemoModal() {
    const modal = document.getElementById('demoModal');
    const modalBody = modal.querySelector('.demo-modal-body');

    modal.style.display = 'flex';

    modal.offsetHeight;

    modal.classList.add('show');

    modalBody.classList.add('loading');

    loadRealTimeTrackingApp();

    document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    const iframe = document.getElementById('demoFrame');
    const infoPanel = document.getElementById('demoInfo');

    modal.classList.add('closing');
    modal.classList.remove('show');

    if (infoPanel) {
        infoPanel.classList.remove('show');
    }

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

    const currentLang = languageManager.currentLanguage;

    iframe.src = `/dz_zeiterfassung/portfolio-demo.php?lang=${currentLang}`;
    
    iframe.onload = function() {
        modalBody.classList.remove('loading');

        sendThemeToIframe();
    };
}

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

    const isModern = document.body.classList.contains('theme-modern');
    const themeParam = isModern ? '?theme=modern' : '';
    
    iframe.src = `dz_zeiterfassung/portfolio_demo.php${themeParam}`;
    
    iframe.onload = function() {
        modalBody.classList.remove('loading');

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

document.addEventListener('click', function(event) {
    const modal = document.getElementById('demoModal');
    if (event.target === modal) {
        closeDemoModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('demoModal');
        if (modal.classList.contains('show')) {
            closeDemoModal();
        }
    }
});

window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'close-demo-modal') {
        closeDemoModal();
    }
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

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

function handleScrollAnimations() {
    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

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

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const skillItem = bar.closest('.skill-item');
        const elementTop = skillItem.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop <= windowHeight * 0.8) {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            }, index * 100);
        }
    });
}

function setupAdvancedObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                if (entry.target.classList.contains('skills')) {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 500); // Small delay for better effect
                }

                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {

        section.style.opacity = '0.3';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(section);
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
}

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

document.addEventListener('DOMContentLoaded', function() {

    if (typeof langManager !== 'undefined') {
        langManager.updatePage();
    }

    updateActiveNavLink();
    setupAdvancedObserver();
    handleFormSubmit();

    handleScrollAnimations();

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    const throttledScrollHandler = throttle(() => {
        updateActiveNavLink();
        handleScrollAnimations();
        animateSkillBars();
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);

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

    if (typeof langManager !== 'undefined') {
        langManager.updatePage();
    }
});

