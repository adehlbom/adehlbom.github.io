// Navigation and scroll effects
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  const header = document.querySelector('.site-header');
  const backToTopButton = document.getElementById('back-to-top');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  const updateOnScroll = () => {
    // Sticky header
    if (header && window.scrollY > 100) {
      header.classList.add('sticky');
    } else if (header) {
      header.classList.remove('sticky');
    }
    
    // Activate menu items based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');
    const scrollOffset = (header ? header.offsetHeight : 0) + 100;
    const scrollPosition = window.scrollY + scrollOffset;
    
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
    
    if (backToTopButton) {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    }
  };
  
  window.addEventListener('scroll', updateOnScroll);
  updateOnScroll();
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      if (navList && navList.classList.contains('active')) {
        navList.classList.remove('active');
        if (menuToggle) {
          menuToggle.classList.remove('active');
        }
        document.body.classList.remove('menu-open');
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = header ? header.offsetHeight : 0;
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.pageYOffset - offset,
          behavior: 'smooth'
        });
      }
    });
  });
  
  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Initialize Intersection Observer for scroll animations
  const animatedSelectors = [
    '.animate-fade-in',
    '.animate-slide-up',
    '.animate-fade-in-delay-1',
    '.animate-fade-in-delay-2',
    '.animate-slide-up-delay-1',
    '.animate-slide-up-delay-2',
    '.animate-slide-up-delay-3'
  ];
  const animatedElements = document.querySelectorAll(animatedSelectors.join(', '));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    animatedElements.forEach(element => {
      element.classList.add('animated');
    });
  } else if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(element => observer.observe(element));
  }
});
