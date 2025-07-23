// Simple Portfolio JavaScript with Scroll Animations

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Simple navigation active state
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Scroll animations
function handleScrollAnimations() {
  const animateElements = document.querySelectorAll(
    ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale"
  );

  animateElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Trigger animation when element is 80% visible
    if (elementTop <= windowHeight * 0.8) {
      if (element.classList.contains("scroll-animate")) {
        element.classList.add("fade-in");
      }
      if (element.classList.contains("scroll-animate-left")) {
        element.classList.add("slide-in");
      }
      if (element.classList.contains("scroll-animate-right")) {
        element.classList.add("slide-in");
      }
      if (element.classList.contains("scroll-animate-scale")) {
        element.classList.add("scale-in");
      }
    }
  });
}

// Simple skill bar animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  skillBars.forEach((bar, index) => {
    const skillItem = bar.closest(".skill-item");
    const elementTop = skillItem.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Only animate if skill item is visible
    if (elementTop <= windowHeight * 0.8) {
      setTimeout(() => {
        const progress = bar.getAttribute("data-progress");
        bar.style.width = progress + "%";
      }, index * 100);
    }
  });
}

// Enhanced intersection observer for better scroll animations
function setupAdvancedObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Handle skill bars animation
        if (entry.target.classList.contains("skills")) {
          setTimeout(() => {
            animateSkillBars();
          }, 500); // Small delay for better effect
        }

        // Add a subtle entrance effect for sections
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    // Initial state for sections
    section.style.opacity = "0.3";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

    observer.observe(section);
  });

  // Don't animate the hero section
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.style.opacity = "1";
    heroSection.style.transform = "translateY(0)";
  }
}

// Simple form handling with translation support
function handleFormSubmit() {
  const form = document.querySelector(".pixel-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector("textarea").value;

    if (!name || !email || !message) {
      alert(languageManager.t("contact.form.error"));
      return;
    }

    const submitBtn = form.querySelector(".btn-primary");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = languageManager.t("contact.form.sending");
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();
      alert(languageManager.t("contact.form.success"));
    }, 1500);
  });
}

// Throttle function to improve scroll performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Initialize language system first
  if (typeof languageManager !== "undefined") {
    languageManager.updatePage();
  }

  // Setup basic functionality
  updateActiveNavLink();
  setupAdvancedObserver();
  handleFormSubmit();

  // Initial scroll animation check
  handleScrollAnimations();

  // Navigation click handlers
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });

  // Throttled scroll event listeners for better performance
  const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
    handleScrollAnimations();
    animateSkillBars();
  }, 100);

  window.addEventListener("scroll", throttledScrollHandler);

  // Button click handlers
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.onclick) return;

      const text = this.textContent.toLowerCase();
      if (text.includes("project") || text.includes("projekte")) {
        scrollToSection("projects");
        e.preventDefault();
      } else if (text.includes("contact") || text.includes("kontakt")) {
        scrollToSection("contact");
        e.preventDefault();
      }
    });
  });

  console.log(
    "Portfolio with translations and scroll animations loaded successfully!"
  );

  // Initialize theme on page load
  if (typeof languageManager !== "undefined") {
    languageManager.updatePage();
  }
});

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Update modal content with current language
    if (typeof languageManager !== "undefined" && languageManager.updateModal) {
      languageManager.updateModal(modalId);
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  }
}

// Close modal when clicking outside of it
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const openModals = document.querySelectorAll('.modal[style*="block"]');
    openModals.forEach((modal) => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
});
