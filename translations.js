// Translation system for Pixel Portfolio
const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },

    // Theme Toggle
    theme: {
      retro: "Retro",
      modern: "Modern",
      switchToModern: "Modern",
      switchToRetro: "Retro",
    },

    // Hero Section
    hero: {
      title: "Developer",
      subtitle: "Recently certified, highly motivated",
      description:
        "With passion for clean code and innovative solutions, I develop modern web applications",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
    },

    // About Section
    about: {
      title: "About Me",
      description:
        "Hello! I'm a motivated young developer and recently certified IT specialist in application development. With solid knowledge in HTML, CSS, PHP, JavaScript, and MySQL, I bring fresh ideas and modern approaches to every project. Currently expanding my skills in React and Spring Framework to develop future-oriented full-stack solutions.",
      stats: {
        linesOfCode: "Lines of Code",
        learningMode: "Learning Mode",
        pixelPerfect: "Quality first",
      },
    },

    // Skills Section
    skills: {
      title: "Tech Stack",
      frontend: "Frontend",
      backend: "Backend",
    },

    // Projects Section
    projects: {
      title: "Projects",
      timeTracking: {
        title: "Time Tracking",
        description:
          "A professional time tracking system built with PHP and MySQL for employee management.",
      },
      reactApp: {
        title: "React Task Manager",
        description:
          "Modern task management app built with React and local storage.",
      },
      springApi: {
        title: "Spring API",
        description:
          "RESTful API built with Spring Boot for user management system.",
      },
      viewCode: "View Code",
      viewDetails: "View Details",
    },

    // Modal Content
    modals: {
      timeTracking: {
        title: "Time Tracking System",
        overview: "Project Overview",
        description:
          "A comprehensive time tracking solution designed for modern workplaces. This system allows employees to log their working hours, track project time, and generate detailed reports for management.",
        features: "Key Features",
        featuresList: [
          "Employee time logging with start/stop functionality",
          "Project-based time tracking",
          "Automatic break time calculation",
          "Monthly and weekly reports",
          "Admin dashboard for management oversight",
          "Export data to Excel/PDF",
        ],
        technologies: "Technologies Used",
        note: "This project demonstrates my skills in PHP backend development and database design.",
      },
      reactApp: {
        title: "React Task Manager",
        overview: "Project Overview",
        description:
          "A modern, responsive task management application built with React. Features drag-and-drop functionality, local storage persistence, and a clean, intuitive interface.",
        features: "Key Features",
        featuresList: [
          "Create, edit, and delete tasks",
          "Drag and drop task reordering",
          "Task categories and priority levels",
          "Local storage for data persistence",
          "Responsive design for all devices",
          "Dark/light theme toggle",
        ],
        technologies: "Technologies Used",
        note: "This project showcases my learning progress with React and modern JavaScript.",
      },
      springApi: {
        title: "Spring Boot API",
        overview: "Project Overview",
        description:
          "A robust RESTful API built with Spring Boot for user management and authentication. Includes JWT token-based security and comprehensive CRUD operations.",
        features: "Key Features",
        featuresList: [
          "RESTful API design principles",
          "JWT token-based authentication",
          "User registration and login",
          "Role-based access control",
          "Input validation and error handling",
          "API documentation with Swagger",
        ],
        technologies: "Technologies Used",
        note: "This project represents my current learning journey with Spring Boot and Java.",
      },
    },

    // Contact Section
    contact: {
      title: "Get In Touch",
      subtitle: "Let's work together!",
      description:
        "As a motivated IT specialist in application development, I'm ready for new challenges. I look forward to exciting projects and the opportunity to apply and further develop my skills.",
      email: "your.email@example.com",
      linkedin: "LinkedIn",
      github: "GitHub",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        send: "Send Message",
        sending: "Sending...",
        success: "Message sent! Thanks for reaching out!",
        error: "Please fill in all fields!",
      },
    },

    // Footer
    footer: {
      copyright:
        "IT Specialist Portfolio. Developed with passion and fresh ideas.",
      privacy: "Privacy",
      terms: "Terms",
      credits: "Credits",
    },
  },

  de: {
    // Navigation
    nav: {
      home: "Startseite",
      about: "Über mich",
      skills: "Fähigkeiten",
      projects: "Projekte",
      contact: "Kontakt",
    },

    // Theme Toggle
    theme: {
      retro: "Retro",
      modern: "Modern",
      switchToModern: "Modern",
      switchToRetro: "Retro",
    },

    // Hero Section
    hero: {
      title: "Anwendungsentwickler",
      subtitle: "Frisch ausgebildet, voller Motivation",
      description:
        "Mit Leidenschaft für sauberen Code und innovative Lösungen entwickle ich moderne Webanwendungen",
      viewProjects: "Projekte ansehen",
      contactMe: "Kontakt aufnehmen",
    },

    // About Section
    about: {
      title: "Über mich",
      description:
        "Hallo! Ich bin ein motivierter junger Entwickler und frisch ausgebildeter Fachinformatiker für Anwendungsentwicklung. Mit fundiertem Wissen in HTML, CSS, PHP, JavaScript und MySQL bringe ich frische Ideen und moderne Ansätze in jedes Projekt ein. Derzeit erweitere ich meine Fähigkeiten in React und Spring Framework, um zukunftsorientierte Full-Stack-Lösungen zu entwickeln.",
      stats: {
        linesOfCode: "Zeilen Code",
        learningMode: "Lern-Modus",
        pixelPerfect: "Qualität first",
      },
    },

    // Skills Section
    skills: {
      title: "Tech Stack",
      frontend: "Frontend",
      backend: "Backend & Tools",
    },

    // Projects Section
    projects: {
      title: "Projekte",
      timeTracking: {
        title: "Time Tracking",
        description:
          "Ein professionelles Zeiterfassungssystem entwickelt mit PHP und MySQL für Mitarbeiterverwaltung.",
      },
      reactApp: {
        title: "React Aufgaben-Manager",
        description:
          "Moderne Aufgabenverwaltungs-App, entwickelt mit React und lokalem Speicher.",
      },
      springApi: {
        title: "Spring API",
        description:
          "RESTful API entwickelt mit Spring Boot für ein Benutzerverwaltungssystem.",
      },
      viewCode: "Code ansehen",
      viewDetails: "Details anzeigen",
    },

    // Modal Content
    modals: {
      timeTracking: {
        title: "Time Tracking System",
        overview: "Projekt-Überblick",
        description:
          "Eine umfassende Zeiterfassungslösung für moderne Arbeitsplätze. Dieses System ermöglicht es Mitarbeitern, ihre Arbeitszeiten zu erfassen, Projektzeiten zu verfolgen und detaillierte Berichte für das Management zu erstellen.",
        features: "Hauptfeatures",
        featuresList: [
          "Mitarbeiter-Zeiterfassung mit Start/Stop-Funktionalität",
          "Projektbasierte Zeiterfassung",
          "Automatische Pausenzeit-Berechnung",
          "Monats- und Wochenberichte",
          "Admin-Dashboard für Management-Übersicht",
          "Datenexport nach Excel/PDF",
        ],
        technologies: "Verwendete Technologien",
        note: "Dieses Projekt demonstriert meine Fähigkeiten in PHP Backend-Entwicklung und Datenbankdesign.",
      },
      reactApp: {
        title: "React Aufgaben-Manager",
        overview: "Projekt-Überblick",
        description:
          "Eine moderne, responsive Aufgabenverwaltungsanwendung mit React. Features Drag-and-Drop-Funktionalität, lokale Speicher-Persistenz und eine saubere, intuitive Benutzeroberfläche.",
        features: "Hauptfeatures",
        featuresList: [
          "Aufgaben erstellen, bearbeiten und löschen",
          "Drag-and-Drop Aufgaben-Sortierung",
          "Aufgaben-Kategorien und Prioritätsstufen",
          "Lokale Speicherung für Datenpersistenz",
          "Responsive Design für alle Geräte",
          "Hell/Dunkel Theme-Umschalter",
        ],
        technologies: "Verwendete Technologien",
        note: "Dieses Projekt zeigt meinen Lernfortschritt mit React und modernem JavaScript.",
      },
      springApi: {
        title: "Spring Boot API",
        overview: "Projekt-Überblick",
        description:
          "Eine robuste RESTful API mit Spring Boot für Benutzerverwaltung und Authentifizierung. Beinhaltet JWT-Token-basierte Sicherheit und umfassende CRUD-Operationen.",
        features: "Hauptfeatures",
        featuresList: [
          "RESTful API Design-Prinzipien",
          "JWT-Token-basierte Authentifizierung",
          "Benutzerregistrierung und Login",
          "Rollenbasierte Zugriffskontrolle",
          "Eingabevalidierung und Fehlerbehandlung",
          "API-Dokumentation mit Swagger",
        ],
        technologies: "Verwendete Technologien",
        note: "Dieses Projekt repräsentiert meine aktuelle Lernreise mit Spring Boot und Java.",
      },
    },

    // Contact Section
    contact: {
      title: "Kontakt aufnehmen",
      subtitle: "Lassen Sie uns zusammenarbeiten!",
      description:
        "Als motivierter Fachinformatiker für Anwendungsentwicklung bin ich bereit für neue Herausforderungen. Ich freue mich auf spannende Projekte und die Möglichkeit, meine Skills einzusetzen und weiterzuentwickeln.",
      email: "ihre.email@example.com",
      linkedin: "LinkedIn",
      github: "GitHub",
      form: {
        name: "Ihr Name",
        email: "Ihre E-Mail",
        message: "Ihre Nachricht",
        send: "Nachricht senden",
        sending: "Wird gesendet...",
        success: "Nachricht gesendet! Vielen Dank für Ihre Kontaktaufnahme!",
        error: "Bitte füllen Sie alle Felder aus!",
      },
    },

    // Footer
    footer: {
      copyright:
        "Fachinformatiker Portfolio. Mit Leidenschaft und frischen Ideen entwickelt.",
      privacy: "Datenschutz",
      terms: "AGB",
      credits: "Credits",
    },
  },
};

// Language management system
class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem("language") || "en";
    this.currentTheme = localStorage.getItem("theme") || "retro";
    this.translations = translations;
    this.initializeTheme();
    // Initialize page translations and animations
    setTimeout(() => {
      this.updatePage();
      if (this.currentTheme === "retro") {
        this.startTypewriterEffect();
      }
    }, 100);
  }

  // Initialize theme on page load
  initializeTheme() {
    document.body.className = `theme-${this.currentTheme}`;
  }

  // Get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Set theme and save to localStorage
  setTheme(theme) {
    if (theme === "retro" || theme === "modern") {
      this.animateThemeTransition(() => {
        this.currentTheme = theme;
        localStorage.setItem("theme", theme);
        document.body.className = `theme-${theme}`;
        this.updateThemeButton();
      });
      return true;
    }
    return false;
  }

  // Simple theme transition animation
  animateThemeTransition(callback) {
    const body = document.body;

    // Add transition class
    body.classList.add("theme-switching");

    // Execute the theme change
    setTimeout(() => {
      callback();
    }, 50);

    // Remove transition class after animation completes
    setTimeout(() => {
      body.classList.remove("theme-switching");
    }, 300);
  }

  // Toggle between themes
  toggleTheme() {
    const newTheme = this.currentTheme === "retro" ? "modern" : "retro";

    // Add loading effect to button
    const themeButton = document.querySelector(".theme-toggle");
    if (themeButton) {
      themeButton.classList.add("switching");
      themeButton.style.pointerEvents = "none";
    }

    // Simple theme switch
    setTimeout(() => {
      this.setTheme(newTheme);

      // Remove loading effect after transition
      setTimeout(() => {
        if (themeButton) {
          themeButton.classList.remove("switching");
          themeButton.style.pointerEvents = "auto";
        }
      }, 300);
    }, 25);
  }

  // Update theme button text
  updateThemeButton() {
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      const buttonText =
        this.currentTheme === "retro"
          ? this.t("theme.modern")
          : this.t("theme.retro");
      themeToggle.textContent = buttonText;
    }

    // Update animation classes based on theme
    this.updateAnimationClasses();
  }

  // Update animation classes based on current theme
  updateAnimationClasses() {
    const glitchText = document.querySelector(".glitch-text");
    const subtitle = document.querySelector(".subtitle");
    const description = document.querySelector(".description");

    // Erst alle Animationsklassen entfernen
    if (glitchText) {
      glitchText.className = "glitch-text";
      glitchText.style.opacity = "1";
      glitchText.style.animation = "none";
    }
    if (subtitle) {
      subtitle.className = "subtitle";
      subtitle.style.opacity = "1";
      subtitle.style.animation = "none";
    }
    if (description) {
      description.className = "description";
      description.style.opacity = "1";
      description.style.animation = "none";
    }

    // Nach kurzer Pause Theme-spezifische Klassen hinzufügen
    setTimeout(() => {
      if (this.currentTheme === "retro") {
        // Retro Theme: Typewriter-Effekt
        if (glitchText) {
          glitchText.classList.add("typewriter");
          glitchText.style.textAlign = "left";
          glitchText.style.margin = "0";
          glitchText.style.opacity = "1"; // Für Typing sichtbar
        }
        if (subtitle) {
          subtitle.classList.add("typewriter-subtitle");
          subtitle.style.textAlign = "left";
          subtitle.style.margin = "0";
          subtitle.style.opacity = "0"; // Versteckt bis Animation
        }
        if (description) {
          description.classList.add("typewriter-description");
          description.style.textAlign = "left";
          description.style.margin = "0";
          description.style.opacity = "0"; // Versteckt bis Animation
        }
        
        // Typewriter-Effekt starten
        setTimeout(() => this.startTypewriterEffect(), 200);
        
      } else {
        // Modern Theme: CSS Fade-in Animation
        if (glitchText) {
          glitchText.classList.add("fade-in-title");
          glitchText.textContent = this.t("hero.title");
        }
        if (subtitle) {
          subtitle.classList.add("fade-in-subtitle");
          subtitle.textContent = this.t("hero.subtitle");  
        }
        if (description) {
          description.classList.add("fade-in-description");
          description.textContent = this.t("hero.description");
        }
      }
    }, 50);
  }

  // Restart hero animations
  restartHeroAnimations() {
    // Einfach updateAnimationClasses aufrufen
    this.updateAnimationClasses();
  }

  // Simplified typewriter effect - only for title
  async startTypewriterEffect() {
    const glitchText = document.querySelector(".glitch-text");
    const subtitle = document.querySelector(".subtitle");
    const description = document.querySelector(".description");

    if (!glitchText || !subtitle || !description) return;

    const titleText = this.t("hero.title");

    // Reset all elements to initial state
    glitchText.textContent = "";
    glitchText.style.opacity = "1"; // Show title element for typing
    subtitle.style.opacity = "0";
    description.style.opacity = "0";

    // Type only the title
    await this.typeText(glitchText, titleText, 80);

    // Show subtitle with fade-in
    await this.delay(500);
    subtitle.style.transition = "opacity 0.8s ease-out";
    subtitle.style.opacity = "1";

    // Show description with fade-in
    await this.delay(800);
    description.style.transition = "opacity 0.8s ease-out";
    description.style.opacity = "1";
  }

  // Type text character by character
  async typeText(element, text, speed = 100) {
    for (let i = 0; i <= text.length; i++) {
      element.textContent = text.substring(0, i);
      await this.delay(speed + Math.random() * 30); // Add natural variation
    }
  }

  // Delay helper
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Set language and save to localStorage
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem("language", lang);
      this.updatePage();
      return true;
    }
    return false;
  }

  // Get translation for a key path (e.g., 'hero.title')
  t(keyPath) {
    const keys = keyPath.split(".");
    let value = this.translations[this.currentLanguage];

    for (const key of keys) {
      value = value[key];
      if (value === undefined) {
        console.warn(
          `Translation missing for: ${keyPath} in ${this.currentLanguage}`
        );
        return keyPath;
      }
    }

    return value;
  }

  // Update all translatable elements on the page
  updatePage() {
    // Safely update navigation
    const homeLink = document.querySelector('a[href="#home"]');
    const aboutLink = document.querySelector('a[href="#about"]');
    const skillsLink = document.querySelector('a[href="#skills"]');
    const projectsLink = document.querySelector('a[href="#projects"]');
    const contactLink = document.querySelector('a[href="#contact"]');

    if (homeLink) homeLink.textContent = this.t("nav.home");
    if (aboutLink) aboutLink.textContent = this.t("nav.about");
    if (skillsLink) skillsLink.textContent = this.t("nav.skills");
    if (projectsLink) projectsLink.textContent = this.t("nav.projects");
    if (contactLink) contactLink.textContent = this.t("nav.contact");

    // Safely update hero section
    const glitchText = document.querySelector(".glitch-text");
    const subtitle = document.querySelector(".subtitle");
    const description = document.querySelector(".description");

    if (glitchText) glitchText.textContent = this.t("hero.title");
    if (subtitle) subtitle.textContent = this.t("hero.subtitle");
    if (description) description.textContent = this.t("hero.description");

    const viewProjectsBtn = document.querySelector(
      'button[onclick*="projects"]'
    );
    const contactBtn = document.querySelector('button[onclick*="contact"]');

    if (viewProjectsBtn)
      viewProjectsBtn.textContent = this.t("hero.viewProjects");
    if (contactBtn) contactBtn.textContent = this.t("hero.contactMe");

    // Restart animations after text change
    this.restartHeroAnimations();

    // Safely update about section
    const aboutTitle = document.querySelector("#about .section-title");
    const pixelTextBlock = document.querySelector(".pixel-text-block");

    if (aboutTitle) aboutTitle.textContent = this.t("about.title");
    if (pixelTextBlock)
      pixelTextBlock.textContent = this.t("about.description");

    // Safely update stats
    const statLabels = document.querySelectorAll(".stat-label");
    if (statLabels[0])
      statLabels[0].textContent = this.t("about.stats.linesOfCode");
    if (statLabels[1])
      statLabels[1].textContent = this.t("about.stats.learningMode");
    if (statLabels[2])
      statLabels[2].textContent = this.t("about.stats.pixelPerfect");

    // Safely update skills section
    const skillsTitle = document.querySelector("#skills .section-title");
    if (skillsTitle) skillsTitle.textContent = this.t("skills.title");

    const categoryTitles = document.querySelectorAll(".category-title");
    if (categoryTitles[0])
      categoryTitles[0].textContent = this.t("skills.frontend");
    if (categoryTitles[1])
      categoryTitles[1].textContent = this.t("skills.backend");

    // Safely update projects section
    const projectsTitle = document.querySelector("#projects .section-title");
    if (projectsTitle) projectsTitle.textContent = this.t("projects.title");

    const projectTitles = document.querySelectorAll(".project-title");
    const projectTitleHeaders = document.querySelectorAll(
      ".project-title-header"
    );
    const projectDescriptions = document.querySelectorAll(
      ".project-description"
    );

    if (projectTitles[0])
      projectTitles[0].textContent = this.t("projects.timeTracking.title");
    if (projectTitleHeaders[0])
      projectTitleHeaders[0].textContent = this.t(
        "projects.timeTracking.title"
      );
    if (projectDescriptions[0])
      projectDescriptions[0].textContent = this.t(
        "projects.timeTracking.description"
      );

    if (projectTitles[1])
      projectTitles[1].textContent = this.t("projects.reactApp.title");
    if (projectTitleHeaders[1])
      projectTitleHeaders[1].textContent = this.t("projects.reactApp.title");
    if (projectDescriptions[1])
      projectDescriptions[1].textContent = this.t(
        "projects.reactApp.description"
      );

    if (projectTitles[2])
      projectTitles[2].textContent = this.t("projects.springApi.title");
    if (projectTitleHeaders[2])
      projectTitleHeaders[2].textContent = this.t("projects.springApi.title");
    if (projectDescriptions[2])
      projectDescriptions[2].textContent = this.t(
        "projects.springApi.description"
      );

    // Safely update project links
    document.querySelectorAll(".project-link").forEach((link) => {
      if (
        link.textContent.includes("Code") ||
        link.textContent.includes("ansehen")
      ) {
        link.textContent = this.t("projects.viewCode");
      } else if (
        link.textContent.includes("Details") ||
        link.textContent.includes("anzeigen")
      ) {
        link.textContent = this.t("projects.viewDetails");
      }
    });

    // Safely update contact section
    const contactTitle = document.querySelector("#contact .section-title");
    const contactSubtitle = document.querySelector(".contact-info h3");
    const contactDesc = document.querySelector(".contact-info p");

    if (contactTitle) contactTitle.textContent = this.t("contact.title");
    if (contactSubtitle)
      contactSubtitle.textContent = this.t("contact.subtitle");
    if (contactDesc) contactDesc.textContent = this.t("contact.description");

    // Safely update contact methods
    const contactTexts = document.querySelectorAll(".contact-text");
    if (contactTexts[0]) contactTexts[0].textContent = this.t("contact.email");
    if (contactTexts[1])
      contactTexts[1].textContent = this.t("contact.linkedin");
    if (contactTexts[2]) contactTexts[2].textContent = this.t("contact.github");

    // Safely update form placeholders
    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const messageInput = document.querySelector("textarea");
    const submitBtn = document.querySelector('button[type="submit"]');

    if (nameInput) nameInput.placeholder = this.t("contact.form.name");
    if (emailInput) emailInput.placeholder = this.t("contact.form.email");
    if (messageInput) messageInput.placeholder = this.t("contact.form.message");
    if (submitBtn) submitBtn.textContent = this.t("contact.form.send");

    // Safely update footer
    const footerText = document.querySelector(".footer-content p");
    if (footerText)
      footerText.innerHTML = `&copy; 2025 ${this.t("footer.copyright")}`;

    const footerLinks = document.querySelectorAll(".footer-link");
    if (footerLinks[0]) footerLinks[0].textContent = this.t("footer.privacy");
    if (footerLinks[1]) footerLinks[1].textContent = this.t("footer.terms");
    if (footerLinks[2]) footerLinks[2].textContent = this.t("footer.credits");

    // Safely update language toggle button text
    const langToggle = document.querySelector(".lang-toggle");
    if (langToggle) {
      langToggle.textContent = this.currentLanguage === "en" ? "DE" : "EN";
    }

    // Update theme toggle button text
    this.updateThemeButton();
  }

  // Toggle between languages
  toggleLanguage() {
    const newLang = this.currentLanguage === "en" ? "de" : "en";
    this.setLanguage(newLang);
  }

  // Update modal content when opened
  updateModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;

    let modalKey = "";
    if (modalId === "timeTrackingModal") modalKey = "timeTracking";
    else if (modalId === "reactTaskModal") modalKey = "reactApp";
    else if (modalId === "springApiModal") modalKey = "springApi";
    else return;

    const modal = this.t(`modals.${modalKey}`);

    // Update modal title
    const modalTitle = modalElement.querySelector(".modal-header h2");
    if (modalTitle) modalTitle.textContent = modal.title;

    // Update project overview title
    const overviewTitle = modalElement.querySelector("h3");
    if (overviewTitle) overviewTitle.textContent = modal.overview;

    // Update description
    const description = modalElement.querySelector(".modal-project-info p");
    if (description) description.textContent = modal.description;

    // Update features title
    const featuresTitle = modalElement.querySelector("h4");
    if (featuresTitle) featuresTitle.textContent = modal.features;

    // Update features list
    const featuresList = modalElement.querySelector("ul");
    if (featuresList && modal.featuresList) {
      const listItems = featuresList.querySelectorAll("li");
      modal.featuresList.forEach((feature, index) => {
        if (listItems[index]) {
          listItems[index].textContent = feature;
        }
      });
    }

    // Update technologies title (if exists)
    const techTitles = modalElement.querySelectorAll("h4");
    if (techTitles[1]) techTitles[1].textContent = modal.technologies;

    // Update project note
    const projectNote = modalElement.querySelector(".project-note");
    if (projectNote) projectNote.textContent = modal.note;
  }
}

// Global language manager instance
const langManager = new LanguageManager();
// For compatibility with main.js
const languageManager = langManager;
