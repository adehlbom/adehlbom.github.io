// Cookie Consent Management
document.addEventListener("DOMContentLoaded", function() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookies = document.getElementById('accept-cookies');
  const declineCookies = document.getElementById('decline-cookies');
  const manageCookiesFooter = document.getElementById('manage-cookies');
  const manageCookiesBanner = document.getElementById('manage-cookies-banner');
  
  if (!cookieBanner || !acceptCookies || !declineCookies) {
    return;
  }
  
  const hideBanner = () => {
    cookieBanner.style.bottom = '-100%';
    cookieBanner.classList.remove('show');
    setTimeout(() => {
      cookieBanner.style.display = 'none';
    }, 400);
  };
  
  const showBanner = () => {
    cookieBanner.style.display = 'block';
    requestAnimationFrame(() => {
      cookieBanner.style.bottom = '0';
      cookieBanner.classList.add('show');
    });
  };
  
  const enableAnalytics = () => {
    try {
      if (typeof initializeGoogleAnalytics === 'function') {
        initializeGoogleAnalytics();
      }
      if (typeof initializeFacebookPixel === 'function') {
        initializeFacebookPixel();
      }
    } catch (error) {
      console.log('Error initializing analytics:', error);
    }
  };
  
  const getConsent = () => {
    try {
      return localStorage.getItem('cookie-consent');
    } catch (error) {
      console.log('Error reading from localStorage:', error);
      return null;
    }
  };
  
  const setConsent = (value) => {
    try {
      localStorage.setItem('cookie-consent', value);
    } catch (error) {
      console.log('Error writing to localStorage:', error);
    }
  };
  
  const clearConsent = () => {
    try {
      localStorage.removeItem('cookie-consent');
    } catch (error) {
      console.log('Error removing from localStorage:', error);
    }
  };
  
  setTimeout(() => {
    const consent = getConsent();
    if (!consent) {
      showBanner();
    } else if (consent === 'accepted') {
      enableAnalytics();
    }
  }, 800);
  
  acceptCookies.addEventListener('click', (event) => {
    event.preventDefault();
    setConsent('accepted');
    enableAnalytics();
    hideBanner();
  });
  
  declineCookies.addEventListener('click', (event) => {
    event.preventDefault();
    setConsent('declined');
    hideBanner();
  });
  
  const attachManageHandler = (element) => {
    if (!element) return;
    element.addEventListener('click', (event) => {
      event.preventDefault();
      clearConsent();
      showBanner();
    });
  };
  
  attachManageHandler(manageCookiesFooter);
  attachManageHandler(manageCookiesBanner);
});
