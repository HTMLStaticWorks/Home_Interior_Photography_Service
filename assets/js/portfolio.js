/* 
   Home Interior & Architectural Photography Template
   ThemeForest Premium Commercial Quality
   Portfolio Filtering, Masonry, and Lightbox Script (portfolio.js)
*/

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Portfolio elements
  const masonryContainer = document.querySelector('.masonry-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // All original portfolio cards, saved in memory
  let portfolioItems = Array.from(document.querySelectorAll('.portfolio-card-source'));
  
  // If we are on the portfolio page, initialize the masonry grid
  if (masonryContainer && portfolioItems.length > 0) {
    
    // Append items directly to container
    function renderMasonry(filterValue = 'all') {
      // Clear container
      masonryContainer.innerHTML = '';
      
      // Filter items
      const filteredItems = portfolioItems.filter(item => {
        if (filterValue === 'all') return true;
        return item.getAttribute('data-category') === filterValue;
      });
      
      // Distribute filtered items directly
      filteredItems.forEach(item => {
        // Clone node to insert
        const cardClone = item.cloneNode(true);
        // Make it visible
        cardClone.style.display = 'block';
        cardClone.classList.remove('portfolio-card-source');
        cardClone.classList.add('portfolio-card');
        
        masonryContainer.appendChild(cardClone);
      });
      
      // Re-initialize lightbox hooks for newly rendered cards
      initLightbox();
    }
    
    // Filter click handler
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filterVal = this.getAttribute('data-filter');
        renderMasonry(filterVal);
      });
    });
    
    // Initial Render
    renderMasonry('all');
    
    // Re-render on window resize (debounce style)
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filterVal = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        renderMasonry(filterVal);
      }, 100);
    });
  } else {
    // If not a masonry-filtered grid page, still initialize lightbox for standard static galleries (e.g. details page)
    initLightbox();
  }
  
  // --- Lightbox Feature ---
  function initLightbox() {
    const galleryImages = document.querySelectorAll('[data-lightbox]');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    
    if (!lightboxOverlay || galleryImages.length === 0) return;
    
    const lightboxImg = lightboxOverlay.querySelector('.lightbox-image');
    const lightboxCaption = lightboxOverlay.querySelector('.lightbox-caption');
    const closeBtn = lightboxOverlay.querySelector('.lightbox-close');
    const prevBtn = lightboxOverlay.querySelector('.lightbox-prev');
    const nextBtn = lightboxOverlay.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    let imageList = [];
    
    // Build list of images to navigate
    imageList = Array.from(galleryImages).map((el, index) => {
      // Bind click event
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openLightbox(index);
      });
      
      return {
        src: el.getAttribute('href') || el.querySelector('img').src,
        caption: el.getAttribute('data-caption') || el.querySelector('img').alt || ''
      };
    });
    
    function openLightbox(index) {
      currentIndex = index;
      updateLightboxContent();
      lightboxOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Lock scrolling
      
      // Accessibility focus trap
      closeBtn.focus();
    }
    
    function closeLightbox() {
      lightboxOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    function updateLightboxContent() {
      const currentImg = imageList[currentIndex];
      if (currentImg) {
        lightboxImg.src = currentImg.src;
        lightboxCaption.textContent = currentImg.caption;
      }
    }
    
    function nextImage() {
      currentIndex = (currentIndex + 1) % imageList.length;
      updateLightboxContent();
    }
    
    function prevImage() {
      currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
      updateLightboxContent();
    }
    
    // Bind Controls
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    // Overlay Click to close
    lightboxOverlay.addEventListener('click', function (e) {
      if (e.target === lightboxOverlay || e.target === lightboxImg.parentElement) {
        closeLightbox();
      }
    });
    
    // Keyboard Controls
    document.addEventListener('keydown', function (e) {
      if (window.getComputedStyle(lightboxOverlay).display !== 'none') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    });
    
    // Swipe Gestures Support for Mobile
    let startX = 0;
    lightboxOverlay.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightboxOverlay.addEventListener('touchend', function (e) {
      let endX = e.changedTouches[0].screenX;
      let diffX = endX - startX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX < 0) {
          nextImage(); // Swiped left -> load next
        } else {
          prevImage(); // Swiped right -> load prev
        }
      }
    }, { passive: true });
  }
});
