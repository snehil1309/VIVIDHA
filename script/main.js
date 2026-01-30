/** @format */

// ========================================
// SCROLL ANIMATION FUNCTIONALITY
// ========================================

/**
 * Intersection Observer for scroll animations
 * Triggers animations when elements come into view
 */

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add 'in-view' class to trigger animation
      entry.target.classList.add("in-view");
      // Optional: stop observing after animation triggers
      // observer.unobserve(entry.target);
    } else {
      // Remove 'in-view' class when out of view (for re-animation)
      entry.target.classList.remove("in-view");
    }
  });
}, observerOptions);

// Observe all scroll-animate elements
document.addEventListener("DOMContentLoaded", function () {
  const scrollElements = document.querySelectorAll(
    ".scroll-animate, .scroll-animate-left, .scroll-animate-right",
  );

  scrollElements.forEach((element) => {
    observer.observe(element);
  });
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      alert(
        "Please fill in all required fields (Name, Email, Subject, Message)",
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector(".btn-submit");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Simulate API call (replace with actual backend endpoint)
    setTimeout(() => {
      // Show success message
      alert("Thank you for your message! We will get back to you soon.");

      // Reset form
      contactForm.reset();

      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// ========================================
// SCROLL-TO-TOP BUTTON
// ========================================

window.addEventListener("scroll", function () {
  // Create scroll-to-top button if it doesn't exist
  let scrollTopBtn = document.getElementById("scrollTopBtn");

  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement("button");
    scrollTopBtn.id = "scrollTopBtn";
    scrollTopBtn.innerHTML = "↑";
    scrollTopBtn.className = "scroll-top-btn";
    document.body.appendChild(scrollTopBtn);

    // Add CSS for scroll-top button
    const style = document.createElement("style");
    style.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #1e40af 0%, #0ea5e9 100%);
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 24px;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(30, 64, 175, 0.3);
                transition: all 0.3s ease;
                z-index: 999;
            }
            
            .scroll-top-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(30, 64, 175, 0.5);
            }
            
            .scroll-top-btn.show {
                display: flex;
            }
        `;
    document.head.appendChild(style);

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Show/hide button based on scroll position
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// ========================================
// NAVBAR ACTIVE LINK INDICATOR
// ========================================

window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link-custom");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href").slice(1) === currentSection) {
      link.classList.add("active");
    }
  });
});

// ========================================
// ADD ANIMATION DELAY TO STAGGERED ITEMS
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // Add staggered animation to contact cards
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.parentElement.style.transitionDelay = `${index * 0.15}s`;
  });
});
