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

    // Initial check für alle Animationen nach dem Setup
    setTimeout(() => {
      this.forceCheckVisibleAnimations();
    }, 100);

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

    // Hash change listener für direkte Navigation zu Sektionen
    window.addEventListener("hashchange", () => {
      // Bei Hash-Change zu Skills, sofort laden
      if (window.location.hash === "#skills" && !this.skillBarsAnimated) {
        setTimeout(() => {
          this.animateSkillBars();
        }, 50);
      }

      // Zusätzlich normale Animation-Checks
      setTimeout(() => {
        this.forceCheckVisibleAnimations();
      }, 100);

      setTimeout(() => {
        this.forceCheckVisibleAnimations();
      }, 300);
    });

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

    // Wenn auf Skills-Link geklickt wird, sofort Skills laden
    const target = e.target;
    const href = target.getAttribute("href");
    if (href === "#skills" && !this.skillBarsAnimated) {
      // Sofort Skills laden ohne auf Scroll-Position zu warten
      setTimeout(() => {
        this.animateSkillBars();
      }, 50);
    }

    // Sofortiger Check + mehrere Delays für verschiedene Scroll-Geschwindigkeiten
    setTimeout(() => {
      this.forceCheckVisibleAnimations();
    }, 100); // Früher Check

    setTimeout(() => {
      this.forceCheckVisibleAnimations();
    }, 300); // Mittlerer Check

    setTimeout(() => {
      this.forceCheckVisibleAnimations();
    }, 500); // Später Check (Original)
  }
  handleButtonClick(e) {}
  closeMobileMenu() {
    const navMenu = document.querySelector(".nav-menu");
    if (navMenu) {
      navMenu.classList.remove("active");
    }
  }
  setupIntersectionObserver() {
    // Entferne den alten IntersectionObserver - wir verwenden jetzt scroll-basierte Animationen
    this.setupScrollBasedAnimations();
  }

  setupScrollBasedAnimations() {
    // Cache für bessere Performance
    this.animationElements = document.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale"
    );

    // Throttled scroll handler für bessere Performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Scroll listener hinzufügen
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial ausführen
    this.updateScrollAnimations();

    // Skills section separat behandeln
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      this.setupSkillsAnimation(skillsSection);
    }
  }

  updateScrollAnimations() {
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    this.animationElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;

      // Spezielle frühere Behandlung für Skill-Items
      const isSkillItem = element.classList.contains("skill-item");

      let triggerPoint, endPoint;

      if (isSkillItem) {
        // Skills sollen extrem früh sichtbar werden
        // Trigger point: wenn Element 100% im Viewport ist (sehr früh)
        triggerPoint = elementTop - viewportHeight * 1.0;
        // End point: wenn Element nur 70% sichtbar ist (sehr vollständig)
        endPoint = elementTop - viewportHeight * 0.7;
      } else {
        // Normale Elemente
        // Trigger point: wenn Element 60% im Viewport ist (früher)
        triggerPoint = elementTop - viewportHeight * 0.6;
        // End point: wenn Element nur 30% sichtbar ist (vollständiger)
        endPoint = elementTop - viewportHeight * 0.3;
      }

      // Berechne Progress (0 = noch nicht sichtbar, 1 = vollständig animiert)
      let progress = (scrollTop - triggerPoint) / (endPoint - triggerPoint);
      progress = Math.max(0, Math.min(1, progress));

      // Stagger delay berechnen
      const staggerMatch = element.className.match(/stagger-delay-(\d+)/);
      const staggerDelay = staggerMatch ? parseInt(staggerMatch[1]) * 0.05 : 0; // Reduziert von 0.1 auf 0.05

      // Progress mit stagger delay anpassen
      progress = Math.max(0, progress - staggerDelay);
      progress = Math.min(1, progress / (1 - staggerDelay));

      this.applyScrollAnimation(element, progress);
    });

    // Stelle sicher dass alle Elemente am Ende vollständig sichtbar sind
    this.ensureFullVisibilityAtBottom();
  }

  applyScrollAnimation(element, progress) {
    // Easing function für smoothere Animation
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easedProgress = easeOutCubic(progress);

    if (element.classList.contains("scroll-animate-left")) {
      // Von links einsliden
      const translateX = (1 - easedProgress) * -50;
      const opacity = easedProgress;
      element.style.transform = `translateX(${translateX}px)`;
      element.style.opacity = opacity;
    } else if (element.classList.contains("scroll-animate-right")) {
      // Von rechts einsliden
      const translateX = (1 - easedProgress) * 50;
      const opacity = easedProgress;
      element.style.transform = `translateX(${translateX}px)`;
      element.style.opacity = opacity;
    } else if (element.classList.contains("scroll-animate-scale")) {
      // Scale animation
      const scale = 0.8 + easedProgress * 0.2;
      const opacity = easedProgress;
      element.style.transform = `scale(${scale})`;
      element.style.opacity = opacity;
    } else if (element.classList.contains("scroll-animate")) {
      // Fade in von unten
      const translateY = (1 - easedProgress) * 30;
      const opacity = easedProgress;
      element.style.transform = `translateY(${translateY}px)`;
      element.style.opacity = opacity;
    }
  }

  setupSkillsAnimation(skillsSection) {
    const handleSkillsScroll = () => {
      const rect = skillsSection.getBoundingClientRect();
      // Sehr aggressiver Trigger: bereits wenn die Skills-Sektion sich dem Viewport nähert
      // 200px bevor sie sichtbar wird, sollen die Skills bereits laden
      const isVisible =
        rect.top < window.innerHeight + 200 && rect.bottom > -200;

      if (isVisible && !this.skillBarsAnimated) {
        this.animateSkillBars();
      }
    };

    window.addEventListener("scroll", handleSkillsScroll, { passive: true });
    handleSkillsScroll(); // Initial check
  }

  // Stelle sicher dass alle Elemente am Ende der Seite voll sichtbar sind
  ensureFullVisibilityAtBottom() {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Wenn wir nahe dem Ende der Seite sind
    if (scrollTop + windowHeight >= documentHeight - 100) {
      this.animationElements.forEach((element) => {
        this.applyScrollAnimation(element, 1); // Vollständig sichtbar
      });
    }
  }

  // Force-check alle sichtbaren Animationen (für Navigation)
  forceCheckVisibleAnimations() {
    // Skills überprüfen - noch aggressiver für Navigation
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      const rect = skillsSection.getBoundingClientRect();
      // Bei Navigation: Skills laden wenn sie in den nächsten 300px sichtbar werden
      const isVisible =
        rect.top < window.innerHeight + 300 && rect.bottom > -300;
      if (isVisible && !this.skillBarsAnimated) {
        this.animateSkillBars();
      }
    }

    // Alle scroll-Animationen aktualisieren
    this.updateScrollAnimations();
  }
  setupAnimations() {
    this.applyThemeAnimations(this.currentTheme);
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
