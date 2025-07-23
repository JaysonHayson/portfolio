class PortfolioManager {
  constructor() {
    this.currentTheme = this.getStoredTheme();
    this.currentLanguage = this.getStoredLanguage();
    this.animatedElements = new Set();
    this.skillBarsAnimated = false;
    this.isInitialized = false;

    // Configuration
    this.config = {
      animationThreshold: 0.15,
      animationDelay: 100,
      modalTransitionTime: 300,
      skillBarAnimationDelay: 150,
    };

    this.init();
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================

  init() {
    if (this.isInitialized) return;

    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupLanguageSystem();
    this.setupAnimations();
    this.setupFavicon();
    this.setupModal();
    this.setupForm();

    this.applyTheme(this.currentTheme);
    this.updateLanguage(this.currentLanguage);

    this.isInitialized = true;
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme());
    }

    // Language toggle
    const langToggle = document.querySelector(".lang-toggle");
    if (langToggle) {
      langToggle.addEventListener("click", () => this.toggleLanguage());
    }

    // Navigation links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e));
    });

    // Button events
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleButtonClick(e));
    });

    // Resize events
    window.addEventListener("resize", () => this.handleResize());

    // Keyboard events
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));

    // Project cards
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", (e) => this.handleProjectClick(e));
    });
  }

  // ==========================================
  // THEME SYSTEM
  // ==========================================

  toggleTheme() {
    const newTheme = this.currentTheme === "retro" ? "modern" : "retro";
    this.applyTheme(newTheme);
  }

  applyTheme(theme) {
    const body = document.body;
    
    // Add transition class
    body.classList.add("theme-switching");

    // Remove old theme classes
    body.classList.remove("theme-retro", "theme-modern");

    // Add new theme class (only add class for modern, retro is default)
    if (theme === "modern") {
      body.classList.add("theme-modern");
    }
    // For retro theme, we don't add any class since it uses :root variables

    // Update button text - ensure button exists
    const updateButtonText = () => {
      const themeToggle = document.querySelector(".theme-toggle");
      if (themeToggle) {
        themeToggle.textContent = theme === "retro" ? "Modern" : "Retro";
      }
    };
    
    // Update immediately and after a small delay to ensure DOM is ready
    updateButtonText();
    setTimeout(updateButtonText, 10);

    // Store theme
    this.currentTheme = theme;
    localStorage.setItem("portfolio-theme", theme);

    // Apply theme-specific animations
    this.applyThemeAnimations(theme);

    // Remove transition class after animation
    setTimeout(() => {
      body.classList.remove("theme-switching");
    }, this.config.modalTransitionTime);
  }

  applyThemeAnimations(theme) {
    const heroTitle = document.querySelector(".glitch-text");
    const heroSubtitle = document.querySelector(".subtitle");
    const heroDescription = document.querySelector(".description");

    // Reset animations
    [heroTitle, heroSubtitle, heroDescription].forEach((el) => {
      if (el) {
        el.classList.remove(
          "hero-fade-retro",
          "hero-fade-modern",
          "typewriter",
          "typewriter-subtitle",
          "typewriter-description"
        );
        el.style.animation = "none";
        el.offsetHeight; // Trigger reflow
      }
    });

    // Apply new animations based on theme
    setTimeout(() => {
      if (theme === "retro") {
        if (heroTitle) heroTitle.classList.add("hero-fade-retro");
        if (heroSubtitle) heroSubtitle.classList.add("hero-fade-retro");
        if (heroDescription) heroDescription.classList.add("hero-fade-retro");
      } else {
        if (heroTitle) heroTitle.classList.add("hero-fade-modern");
        if (heroSubtitle) heroSubtitle.classList.add("hero-fade-modern");
        if (heroDescription) heroDescription.classList.add("hero-fade-modern");
      }
    }, 50);
  }

  getStoredTheme() {
    return localStorage.getItem("portfolio-theme") || "retro";
  }

  // ==========================================
  // LANGUAGE SYSTEM
  // ==========================================

  setupLanguageSystem() {
    if (typeof languageManager !== "undefined") {
      languageManager.setLanguage(this.currentLanguage);
      languageManager.updatePage();
    }
  }

  toggleLanguage() {
    const newLang = this.currentLanguage === "de" ? "en" : "de";
    this.updateLanguage(newLang);
  }

  updateLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem("portfolio-language", lang);

    const langToggle = document.querySelector(".lang-toggle");
    if (langToggle) {
      langToggle.textContent = lang.toUpperCase();
    }

    if (typeof languageManager !== "undefined") {
      languageManager.setLanguage(lang);
      languageManager.updatePage();
    }
  }

  getStoredLanguage() {
    return localStorage.getItem("portfolio-language") || "de";
  }

  // ==========================================
  // NAVIGATION
  // ==========================================

  handleNavClick(e) {
    // Remove scroll behavior, let browser handle normal navigation
    // Close mobile menu if open
    this.closeMobileMenu();
  }

  handleButtonClick(e) {
    // Remove smooth scroll behavior for buttons
    // Let the browser handle normal navigation
  }

  closeMobileMenu() {
    // Implementation for mobile menu close if needed
    const navMenu = document.querySelector(".nav-menu");
    if (navMenu) {
      navMenu.classList.remove("active");
    }
  }

  // ==========================================
  // INTERSECTION OBSERVER ANIMATIONS
  // ==========================================

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: this.config.animationThreshold,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animation elements
    document
      .querySelectorAll(
        ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale"
      )
      .forEach((el) => {
        this.observer.observe(el);
      });

    // Observe skills section separately
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      this.observer.observe(skillsSection);
    }
  }

  setupAnimations() {
    // Apply initial hero animations based on current theme
    this.applyThemeAnimations(this.currentTheme);
  }

  animateElement(element) {
    if (this.animatedElements.has(element)) return;

    // Special handling for skills section
    if (element.id === "skills") {
      this.animateSkillBars();
      return;
    }

    // Get stagger delay
    const staggerMatch = element.className.match(/stagger-delay-(\d+)/);
    const delay = staggerMatch
      ? parseInt(staggerMatch[1]) * this.config.animationDelay
      : 0;

    setTimeout(() => {
      if (element.classList.contains("scroll-animate-left")) {
        element.classList.add("slide-in");
      } else if (element.classList.contains("scroll-animate-right")) {
        element.classList.add("slide-in");
      } else if (element.classList.contains("scroll-animate-scale")) {
        element.classList.add("scale-in");
      } else if (element.classList.contains("scroll-animate")) {
        element.classList.add("fade-in");
      }

      this.animatedElements.add(element);
    }, delay);
  }

  animateSkillBars() {
    if (this.skillBarsAnimated) return;

    const skillBars = document.querySelectorAll(".skill-progress");

    skillBars.forEach((bar, index) => {
      const progress = bar.getAttribute("data-progress");
      if (progress) {
        setTimeout(() => {
          bar.style.width = `${progress}%`;
        }, index * this.config.skillBarAnimationDelay);
      }
    });

    this.skillBarsAnimated = true;
  }

  // ==========================================
  // FAVICON & BACKGROUND LOGO
  // ==========================================

  setupFavicon() {
    // Create favicon from logo
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 32;
    canvas.height = 32;

    // Draw pixelated logo for favicon
    ctx.fillStyle = this.currentTheme === "retro" ? "#d4af37" : "#2563eb";
    ctx.font = "bold 20px monospace";
    ctx.textAlign = "center";
    ctx.fillText("<>", 16, 22);

    // Create and set favicon
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = canvas.toDataURL();
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  // ==========================================
  // MODAL SYSTEM
  // ==========================================

  setupModal() {
    // Close modal on overlay click
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeModal();
      }
    });

    // Close button handlers
    document.querySelectorAll(".close, .modal-close").forEach((btn) => {
      btn.addEventListener("click", () => this.closeModal());
    });
  }

  handleProjectClick(e) {
    const projectCard = e.currentTarget;
    const projectType = projectCard.getAttribute("data-project") || "default";
    this.openProjectModal(projectType);
  }

  openProjectModal(projectType) {
    const modal = document.getElementById("project-modal");
    if (!modal) return;

    // Populate modal content based on project type
    this.populateModalContent(modal, projectType);

    // Show modal with animation
    modal.style.display = "block";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  populateModalContent(modal, projectType) {
    // Project data (this could be moved to a separate config)
    const projects = {
      "time-tracking": {
        title: "Time Tracking System",
        description: "Professional time tracking with PHP and MySQL",
        tech: ["PHP", "MySQL", "JavaScript", "CSS"],
        features: ["Time logging", "Reports", "Admin dashboard"],
      },
      "react-app": {
        title: "React Task Manager",
        description: "Modern task management with React",
        tech: ["React", "JavaScript", "Local Storage"],
        features: ["Task management", "Drag & drop", "Categories"],
      },
      "spring-api": {
        title: "Spring Boot API",
        description: "RESTful API with Spring Framework",
        tech: ["Java", "Spring Boot", "MySQL", "REST"],
        features: ["User management", "Authentication", "Data validation"],
      },
    };

    const project = projects[projectType] || projects["time-tracking"];

    // Update modal content
    const title = modal.querySelector(".modal-title");
    const description = modal.querySelector(".modal-description");
    const techTags = modal.querySelector(".modal-tech");

    if (title) title.textContent = project.title;
    if (description) description.textContent = project.description;
    if (techTags) {
      techTags.innerHTML = project.tech
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join("");
    }
  }

  closeModal() {
    const modal = document.querySelector(".modal.active");
    if (modal) {
      modal.classList.remove("active");

      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }, this.config.modalTransitionTime);
    }
  }

  // ==========================================
  // FORM HANDLING
  // ==========================================

  setupForm() {
    const form = document.querySelector(".pixel-form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Validate form
    if (!this.validateForm(data)) {
      this.showNotification("Please fill in all fields", "error");
      return;
    }

    // Simulate form submission
    this.submitForm(data, e.target);
  }

  validateForm(data) {
    return (
      data.name && data.email && data.message && this.isValidEmail(data.email)
    );
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async submitForm(data, form) {
    const submitBtn = form.querySelector(".btn-primary");
    const originalText = submitBtn.textContent;

    // Update button state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success
      this.showNotification("Message sent successfully!", "success");
      form.reset();
    } catch (error) {
      this.showNotification(
        "Failed to send message. Please try again.",
        "error"
      );
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style notification
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "15px 25px",
      borderRadius: this.currentTheme === "modern" ? "8px" : "0px",
      backgroundColor:
        type === "success"
          ? "#10b981"
          : type === "error"
          ? "#ef4444"
          : "#3b82f6",
      color: "white",
      zIndex: "9999",
      fontSize: "14px",
      fontWeight: "bold",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  handleKeyDown(e) {
    // Escape key closes modal
    if (e.key === "Escape") {
      this.closeModal();
    }

    // Navigation shortcuts
    if (e.altKey) {
      switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          // Remove scroll navigation, let browser handle normal navigation
          break;
        case "t":
          this.toggleTheme();
          break;
        case "l":
          this.toggleLanguage();
          break;
      }
    }
  }

  handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }

    // Update favicon on resize/theme change
    this.setupFavicon();
  }

  // ==========================================
  // UTILITY METHODS
  // ==========================================

  resetAnimations() {
    this.animatedElements.clear();
    this.skillBarsAnimated = false;

    // Reset all animated elements
    document
      .querySelectorAll(".fade-in, .slide-in, .scale-in")
      .forEach((el) => {
        el.classList.remove("fade-in", "slide-in", "scale-in");
      });

    // Reset skill bars
    document.querySelectorAll(".skill-progress").forEach((bar) => {
      bar.style.width = "0%";
    });
  }

  destroy() {
    // Clean up observers and event listeners
    if (this.observer) {
      this.observer.disconnect();
    }

    // Remove event listeners
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  }

  // ==========================================
  // PUBLIC API
  // ==========================================

  getTheme() {
    return this.currentTheme;
  }

  getLanguage() {
    return this.currentLanguage;
  }

  forceAnimateSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      this.animateElement(section);
    }
  }
}

// ==========================================
// CSS INJECTION FOR NEW ANIMATIONS
// ==========================================

const animationStyles = `
/* Hero Fade Animations */
.hero-fade-retro {
  animation: retroHeroFade 1.2s ease-out forwards;
}

.hero-fade-modern {
  animation: modernHeroFade 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes retroHeroFade {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    filter: blur(2px);
  }
  50% {
    opacity: 0.7;
    transform: translateY(10px) scale(0.98);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes modernHeroFade {
  0% {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(3px);
  }
  40% {
    opacity: 0.3;
    transform: translateY(15px);
    filter: blur(1px);
  }
  70% {
    opacity: 0.7;
    transform: translateY(5px);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* Background Logo */
.background-logo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  font-family: 'Press Start 2P', monospace;
  font-size: 20vw;
  color: var(--primary-color);
  opacity: 0.02;
  pointer-events: none;
  z-index: 1;
  user-select: none;
  transition: all 0.3s ease;
}

.theme-modern .background-logo {
  opacity: 0.01;
  font-family: 'Inter', sans-serif;
  font-weight: 100;
  letter-spacing: -2px;
}

/* Notification animations */
.notification {
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Modal enhancements */
.modal.active {
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(5px);
  }
}

.modal.active .modal-content {
  animation: modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalSlideIn {
  from {
    transform: scale(0.8) translateY(-50px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
`;

// ==========================================
// INITIALIZATION
// ==========================================

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.portfolioManager = new PortfolioManager();
  });
} else {
  window.portfolioManager = new PortfolioManager();
}

// Global utility functions for backwards compatibility
window.scrollToSection = (id) => window.portfolioManager?.smoothScrollTo(id);
window.openModal = (id) => window.portfolioManager?.openProjectModal(id);
window.closeModal = () => window.portfolioManager?.closeModal();
window.toggleTheme = () => window.portfolioManager?.toggleTheme();
window.toggleLanguage = () => window.portfolioManager?.toggleLanguage();
