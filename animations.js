document.addEventListener('DOMContentLoaded', () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // Do not apply scroll animations if they prefer reduced motion

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // Trigger slightly before the element comes into view
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Optional: Stop observing once animated in to keep it visible
        // If we want it to animate every time, remove this unobserve
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements that should animate on scroll
  const animateElements = document.querySelectorAll('.scroll-animate');
  
  animateElements.forEach(el => {
    observer.observe(el);
  });
});
