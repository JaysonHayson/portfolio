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
      viewDetails: "View Details",
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
        title: "Spring Boot API",
        description:
          "RESTful API built with Spring Boot for user management system.",
      },
      viewCode: "View Code",
    },

    // Modal Content
    modals: {
      timeTracking: {
        title: "Time Tracking System",
        overview: "Project Overview",
        description:
          "A comprehensive time tracking solution for modern workplaces. This system allows employees to clock in/out, track project time, and generate detailed reports for management.",
        features: "Key Features",
        featuresList: [
          "Employee time tracking with start/stop functionality",
          "Project-based time allocation",
          "Automatic break time calculation",
          "Monthly and weekly reports",
          "Admin dashboard for management overview",
          "Data export to Excel/PDF",
        ],
        technologies: "Technologies Used",
        note: "This project demonstrates my skills in PHP backend development and database design.",
      },
      reactApp: {
        title: "React Task Manager",
        overview: "Project Overview",
        description:
          "A modern, responsive task management application built with React. Features drag-and-drop functionality, local storage persistence, and a clean, intuitive user interface.",
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
      email: "jesse.owen.dev@proton.me",
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
      viewDetails: "Details anzeigen",
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
      email: "jesse.owen.dev@proton.me",
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
    
    // Ensure DOM is ready before updating page
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.updatePage();
        if (this.currentTheme === "retro") {
          this.startTypewriterEffect();
        }
      });
    } else {
      // DOM is already ready
      this.updatePage();
      if (this.currentTheme === "retro") {
        this.startTypewriterEffect();
      }
    }
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

  // Animate theme transition
  animateThemeTransition(callback) {
    document.body.style.transition = "all 0.3s ease";
    setTimeout(() => {
      callback();
    }, 50);
    setTimeout(() => {
      document.body.style.transition = "";
    }, 350);
  }

  // Toggle between themes
  toggleTheme() {
    const newTheme = this.currentTheme === "retro" ? "modern" : "retro";
    this.setTheme(newTheme);
  }

  // Update theme button text
  updateThemeButton() {
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.textContent =
        this.currentTheme === "retro"
          ? this.t("theme.modern")
          : this.t("theme.retro");
    }
  }

  // Update animation classes when theme changes
  updateAnimationClasses() {
    const heroElements = document.querySelectorAll('.hero-fade-retro');
    heroElements.forEach(element => {
      if (this.currentTheme === 'retro') {
        element.classList.add('hero-fade-retro');
      } else {
        element.classList.remove('hero-fade-retro');
      }
    });
  }

  // Start typewriter effect for retro theme
  startTypewriterEffect() {
    if (this.currentTheme !== 'retro') return;
    
    // This function is for compatibility - actual typewriter effect was removed
  }

  // Restart hero animations after language change
  restartHeroAnimations() {
    // This function is for compatibility - animations are now CSS-based
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Set language and save to localStorage
  setLanguage(lang) {
    if (lang === "en" || lang === "de") {
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
    // Update all elements with data-lang attributes
    const translatableElements = document.querySelectorAll('[data-lang]');
    
    translatableElements.forEach(element => {
      const key = element.getAttribute('data-lang');
      const translation = this.t(key);
      
      if (translation) {
        // Update placeholder for form inputs
        if (element.hasAttribute('placeholder')) {
          element.setAttribute('placeholder', translation);
        } else {
          // Update text content for other elements
          element.textContent = translation;
        }
      }
    });

    // Update theme button
    this.updateThemeButton();
    
    // Update language button
    this.updateLanguageButton();

    // Restart animations after text change (if in retro theme)
    if (this.currentTheme === 'retro') {
      this.restartHeroAnimations();
    }
  }

  // Update language button text
  updateLanguageButton() {
    const langToggle = document.querySelector(".lang-toggle");
    if (langToggle) {
      langToggle.textContent = this.currentLanguage === "en" ? "DE" : "EN";
    }
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
    const description = modalElement.querySelector(".project-description-full");
    if (description) description.textContent = modal.description;

    // Update features title
    const featuresTitle = modalElement.querySelectorAll("h4")[0];
    if (featuresTitle) featuresTitle.textContent = modal.features;

    // Update feature list items
    const listItems = modalElement.querySelectorAll(".feature-list li");
    if (modal.featuresList && listItems.length > 0) {
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