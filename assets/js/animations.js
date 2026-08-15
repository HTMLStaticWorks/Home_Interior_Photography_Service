/* 
   Home Interior & Architectural Photography Template
   ThemeForest Premium Commercial Quality
   GSAP Animation Hooks & Fallback Interaction Observer (animations.js)
*/

document.addEventListener('DOMContentLoaded', function () {
  // Check if GSAP is loaded
  if (typeof gsap !== 'undefined') {
    // Register scrolltrigger plugin if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // --- Hero Animations ---
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDesc = document.querySelector('.hero-description');
    const heroBtns = document.querySelector('.hero-actions-container');
    const heroImage = document.querySelector('.hero-bg-image');
    
    const tlHero = gsap.timeline();
    
    if (heroImage) {
      tlHero.to(heroImage, {
        scale: 1,
        duration: 2.5,
        ease: 'power2.out'
      });
    }
    
    if (heroSubtitle) {
      tlHero.fromTo(heroSubtitle, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=2.0'
      );
    }
    
    if (heroTitle) {
      tlHero.fromTo(heroTitle, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=1.6'
      );
    }
    
    if (heroDesc) {
      tlHero.fromTo(heroDesc, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=1.2'
      );
    }
    
    if (heroBtns) {
      tlHero.fromTo(heroBtns, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.8'
      );
    }

    // Add Loaded Class to Hero
    const heroSection = document.querySelector('.hero-cinematic');
    if (heroSection) {
      heroSection.classList.add('loaded');
    }

    // --- Scroll Trigger Animations ---
    const fadeUpItems = document.querySelectorAll('.fade-up-element');
    fadeUpItems.forEach(item => {
      gsap.fromTo(item, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Image reveal masks (GSAP trigger)
    const revealMasks = document.querySelectorAll('.reveal-mask');
    revealMasks.forEach(mask => {
      gsap.to(mask, {
        scrollTrigger: {
          trigger: mask,
          start: 'top 80%',
          onEnter: () => mask.classList.add('active')
        }
      });
    });

    // Subtle image parallax or scroll zoom
    const zoomImgScroll = document.querySelectorAll('.img-scroll-zoom img');
    zoomImgScroll.forEach(img => {
      gsap.fromTo(img, 
        { scale: 1 },
        {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });

  } else {
    // --- Fallback Option using Intersection Observer ---
    console.log('GSAP not loaded. Applying native Intersection Observer fallbacks.');
    
    // Add Loaded class to hero natively
    const heroSection = document.querySelector('.hero-cinematic');
    const heroImage = document.querySelector('.hero-bg-image');
    if (heroSection) {
      heroSection.classList.add('loaded');
    }
    if (heroImage) {
      heroImage.style.transform = 'scale(1)';
    }

    // Fade-up elements observer
    const fadeUpObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const fadeUpItems = document.querySelectorAll('.fade-up-element');
    fadeUpItems.forEach(item => {
      // Set opacity/transform in CSS fallback or inject inline style
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      fadeUpObserver.observe(item);
    });

    // Mask reveals observer
    const maskObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const revealMasks = document.querySelectorAll('.reveal-mask');
    revealMasks.forEach(mask => {
      maskObserver.observe(mask);
    });
  }
});
