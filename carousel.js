document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.testimonials-carousel');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');
  const wrapper = document.querySelector('.carousel-wrapper');

  if (!carousel || !prevBtn || !nextBtn) return;

  // Calculate scroll amount based on card width
  const getScrollAmount = () => {
    const card = carousel.querySelector('.testimonial-card');
    if (!card) return 300;
    // Scroll by one card width plus gap
    return card.offsetWidth + 16; // 16px is var(--space-sm)
  };

  // Button Event Listeners
  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  // Auto-scroll logic
  let autoScrollInterval;

  const startAutoScroll = () => {
    // Only auto-scroll on desktop where hover is possible
    if (window.innerWidth <= 768) return;
    
    autoScrollInterval = setInterval(() => {
      // If we've reached the end, scroll back to start
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      }
    }, 4500);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  // Start auto-scroll initially
  startAutoScroll();

  // Pause on hover
  wrapper.addEventListener('mouseenter', stopAutoScroll);
  wrapper.addEventListener('mouseleave', startAutoScroll);
  
  // Pause on touch interactions
  wrapper.addEventListener('touchstart', stopAutoScroll, { passive: true });
});
