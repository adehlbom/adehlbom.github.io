// Navigation and scroll effects
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Sticky header on scroll
  const header = document.querySelector('.site-header');
  const heroSection = document.querySelector('.hero-section');
  let heroHeight;
  
  // Recalculate the hero height on resize
  function updateHeroHeight() {
    if (heroSection) {
      heroHeight = heroSection.offsetHeight;
    }
  }
  
  updateHeroHeight();
  window.addEventListener('resize', updateHeroHeight);
  
  // Handle scroll events
  window.addEventListener('scroll', () => {
    // Sticky header
    if (header && window.scrollY > 100) {
      header.classList.add('sticky');
    } else if (header) {
      header.classList.remove('sticky');
    }
    
    // Activate menu items based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Initialize Intersection Observer for scroll animations
  const observerOptions = {
    root: null, // relative to viewport
    threshold: 0.1, // 10% of the element must be visible
    rootMargin: '0px 0px -50px 0px' // slightly earlier trigger
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);
  
  // Observe all elements with .scroll-animate class
  document.querySelectorAll('.scroll-animate').forEach(element => {
    observer.observe(element);
  });
});
