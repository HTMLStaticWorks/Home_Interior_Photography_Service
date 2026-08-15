/* 
   Home Interior & Architectural Photography Template
   ThemeForest Premium Commercial Quality
   Main Layout & Interactions JS (main.js)
*/

document.addEventListener('DOMContentLoaded', function () {
  // --- Header Scroll States ---
  const header = document.querySelector('.header-editorial');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Mobile Navigation Overlay ---
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  
  if (hamburgerBtn && mobileNavOverlay) {
    hamburgerBtn.addEventListener('click', function () {
      const isActive = hamburgerBtn.classList.toggle('active');
      mobileNavOverlay.classList.toggle('active');
      
      // Accessibility states
      hamburgerBtn.setAttribute('aria-expanded', isActive);
      
      // Prevent body scrolling when menu is active
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking the dedicated close button
    const closeBtn = document.getElementById('mobileMenuCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        hamburgerBtn.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }
  }

  // --- Mobile Dropdowns (Submenus) ---
  const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      const submenu = this.closest('.mobile-menu-item').querySelector('.mobile-submenu');
      if (submenu) {
        const isCollapsed = window.getComputedStyle(submenu).display === 'none';
        
        if (isCollapsed) {
          submenu.style.display = 'block';
          this.textContent = '↑';
          this.setAttribute('aria-expanded', 'true');
        } else {
          submenu.style.display = 'none';
          this.textContent = '↓';
          this.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // --- Blog & Contact Newsletter Form UI Handlers ---
  const newsletterForms = document.querySelectorAll('.newsletter-form-footer, .newsletter-form-section');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      
      if (input && input.value.trim() !== '') {
        const originalHtml = this.innerHTML;
        
        // Show success state
        if (this.classList.contains('newsletter-form-footer')) {
          this.innerHTML = `<span style="font-size: 0.8rem; color: #A67C52; padding: 10px 0;">THANK YOU FOR SUBSCRIBING</span>`;
        } else {
          this.innerHTML = `<div class="alert alert-success">Thank you! You have been successfully subscribed to our editorial updates.</div>`;
        }
        
        // Optional: restore form after 5 seconds
        setTimeout(() => {
          this.innerHTML = originalHtml;
          // Re-bind listeners if form is restored
          // In a real production codebase, we'd have proper AJAX handling here
        }, 5000);
      }
    });
  });
});
