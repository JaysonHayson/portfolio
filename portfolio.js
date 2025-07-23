class PortfolioManager {
  constructor() {
    this.currentTheme = this.getStoredTheme();
    this.currentLanguage = this.getStoredLanguage();
    this.animatedElements = new Set();
    this.skillBarsAnimated = false;
    this.isInitialized = false;
    this.config = {
      animationThreshold: 0.15,
      animationDelay: 100,
      modalTransitionTime: 300,
      skillBarAnimationDelay: 150,
    };
    this.init();
  }
  init() {
    if (this.isInitialized) return;
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupLanguageSystem();
    this.setupAnimations();
    this.setupFavicon();
    this.setupModal();
    this.applyTheme(this.currentTheme);
    this.updateLanguage(this.currentLanguage);
    this.isInitialized = true;
  }
  setupEventListeners() {
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme());
    }
    const langToggle = document.querySelector(".lang-toggle");
    if (langToggle) {
      langToggle.addEventListener("click", () => this.toggleLanguage());
    }
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e));
    });
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleButtonClick(e));
    });
    window.addEventListener("resize", () => this.handleResize());
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", (e) => this.handleProjectClick(e));
    });
  }
  toggleTheme() {
    const newTheme = this.currentTheme === "retro" ? "modern" : "retro";
    this.applyTheme(newTheme);
  }
  applyTheme(theme) {
    const body = document.body;
    body.classList.add("theme-switching");
    body.classList.add("theme-switching");
    body.classList.remove("theme-retro", "theme-modern");
    if (theme === "modern") {
      body.classList.add("theme-modern");
    }
    const updateButtonText = () => {
      const themeToggle = document.querySelector(".theme-toggle");
      if (themeToggle) {
        themeToggle.textContent = theme === "retro" ? "Modern" : "Retro";
      }
    };
    updateButtonText();
    setTimeout(updateButtonText, 10);
    this.currentTheme = theme;
    localStorage.setItem("portfolio-theme", theme);
    this.applyThemeAnimations(theme);
    setTimeout(() => {
      body.classList.remove("theme-switching");
    }, this.config.modalTransitionTime);
  }
  applyThemeAnimations(theme) {
    const heroTitle = document.querySelector(".glitch-text");
    const heroSubtitle = document.querySelector(".subtitle");
    const heroDescription = document.querySelector(".description");
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
        el.offsetHeight;
      }
    });
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
    return localStorage.getItem("portfolio-theme") || "modern";
  }
  setupLanguageSystem() {
    const body = document.body;
    body.classList.remove("de", "en");
    body.classList.add(this.currentLanguage);

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

    const body = document.body;
    body.classList.remove("de", "en");
    body.classList.add(lang);

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
  handleNavClick(e) {
    this.closeMobileMenu();
  }
  handleButtonClick(e) {}
  closeMobileMenu() {
    const navMenu = document.querySelector(".nav-menu");
    if (navMenu) {
      navMenu.classList.remove("active");
    }
  }
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
    document
      .querySelectorAll(
        ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale"
      )
      .forEach((el) => {
        this.observer.observe(el);
      });
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      this.observer.observe(skillsSection);
    }
  }
  setupAnimations() {
    this.applyThemeAnimations(this.currentTheme);
  }
  animateElement(element) {
    if (this.animatedElements.has(element)) return;
    if (element.id === "skills") {
      this.animateSkillBars();
      return;
    }
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
  setupFavicon() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = this.currentTheme === "retro" ? "#d4af37" : "#2563eb";
    ctx.font = "bold 20px monospace";
    ctx.textAlign = "center";
    ctx.fillText("<>", 16, 22);
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = canvas.toDataURL();
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  setupModal() {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeModal();
      }
    });
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
    this.populateModalContent(modal, projectType);
    modal.style.display = "block";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  populateModalContent(modal, projectType) {
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
  handleKeyDown(e) {
    if (e.key === "Escape") {
      this.closeModal();
    }
    if (e.altKey) {
      switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
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
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
    this.setupFavicon();
  }
  resetAnimations() {
    this.animatedElements.clear();
    this.skillBarsAnimated = false;
    document
      .querySelectorAll(".fade-in, .slide-in, .scale-in")
      .forEach((el) => {
        el.classList.remove("fade-in", "slide-in", "scale-in");
      });
    document.querySelectorAll(".skill-progress").forEach((bar) => {
      bar.style.width = "0%";
    });
  }
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  }
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
const animationStyles = `
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
const styleSheet = document.createElement("style");
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.portfolioManager = new PortfolioManager();
  });
} else {
  window.portfolioManager = new PortfolioManager();
}
window.scrollToSection = (id) => window.portfolioManager?.smoothScrollTo(id);
window.openModal = (id) => window.portfolioManager?.openProjectModal(id);
window.closeModal = () => window.portfolioManager?.closeModal();
window.toggleTheme = () => window.portfolioManager?.toggleTheme();
window.toggleLanguage = () => window.portfolioManager?.toggleLanguage();
