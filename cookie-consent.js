// Cookie Consent Management
document.addEventListener("DOMContentLoaded", function() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookies = document.getElementById('accept-cookies');
  const declineCookies = document.getElementById('decline-cookies');
  const manageCookies = document.getElementById('manage-cookies');
  
  // Check if user has already made a cookie choice
  // Small delay to ensure everything is loaded
  setTimeout(function() {
    const cookieConsent = localStorage.getItem('cookie-consent');
    // Only show the banner if no choice has been made yet
    if (!cookieConsent) {
      cookieBanner.style.display = 'block';
      cookieBanner.style.bottom = '0';
      cookieBanner.classList.add('show');
      console.log('Cookie banner shown - no previous choice found');
    } else {
      console.log('Cookie consent already set:', cookieConsent);
      if (cookieConsent === 'accepted') {
        try {
          initializeGoogleAnalytics();
          if (typeof initializeFacebookPixel === 'function') {
            initializeFacebookPixel();
          }
        } catch(e) {
          console.log('Error initializing analytics:', e);
        }
      }
    }
  }, 1000);
  
  // Enhanced event listeners with direct style manipulation
  acceptCookies.addEventListener('click', function(e) {
    e.preventDefault();
    try {
      localStorage.setItem('cookie-consent', 'accepted');
    } catch(e) {
      console.log('Error saving to localStorage:', e);
    }
    cookieBanner.style.bottom = '-100%';
    cookieBanner.classList.remove('show');
    try {
      initializeGoogleAnalytics();
      if (typeof initializeFacebookPixel === 'function') {
        initializeFacebookPixel();
      }
    } catch(e) {
      console.log('Error initializing analytics:', e);
    }
  });
  
  declineCookies.addEventListener('click', function(e) {
    e.preventDefault();
    try {
      localStorage.setItem('cookie-consent', 'declined');
    } catch(e) {
      console.log('Error saving to localStorage:', e);
    }
    cookieBanner.style.bottom = '-100%';
    cookieBanner.classList.remove('show');
  });
  
  // Make sure the manage cookies button works
  if (manageCookies) {
    console.log('Manage cookies button found:', manageCookies);
    manageCookies.addEventListener('click', function(e) {
      console.log('Manage cookies button clicked');
      e.preventDefault();
      try {
        localStorage.removeItem('cookie-consent');
      } catch(e) {
        console.log('Error removing from localStorage:', e);
      }
      cookieBanner.style.display = 'block';
      cookieBanner.style.bottom = '0';
      cookieBanner.classList.add('show');
    });
  } else {
    console.error('Manage cookies button not found!');
  }
});
