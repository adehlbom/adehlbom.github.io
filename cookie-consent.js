// Cookie Consent Management
document.addEventListener("DOMContentLoaded", function() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookies = document.getElementById('accept-cookies');
  const declineCookies = document.getElementById('decline-cookies');
  const manageCookiesFooter = document.getElementById('manage-cookies');
  const manageCookiesBanner = document.getElementById('manage-cookies-banner');
  const preferencesPanel = document.getElementById('cookie-preferences');
  const analyticsToggle = document.getElementById('analytics-toggle');
  const savePreferences = document.getElementById('save-cookie-preferences');
  const cancelPreferences = document.getElementById('cancel-cookie-preferences');
  
  if (!cookieBanner || !acceptCookies || !declineCookies) {
    return;
  }
  
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

  const syncToggleWithConsent = () => {
    if (!analyticsToggle) return;
    const consent = getConsent();
    analyticsToggle.checked = consent !== 'declined';
  };

  const disableMainButtons = () => {
    if (acceptCookies) acceptCookies.disabled = true;
    if (declineCookies) declineCookies.disabled = true;
  };

  const enableMainButtons = () => {
    if (acceptCookies) acceptCookies.disabled = false;
    if (declineCookies) declineCookies.disabled = false;
  };

  const openPreferences = () => {
    if (!preferencesPanel) return;
    syncToggleWithConsent();
    disableMainButtons();
    cookieBanner.classList.add('show-preferences');
  };

  const closePreferences = () => {
    if (!preferencesPanel) return;
    cookieBanner.classList.remove('show-preferences');
    enableMainButtons();
  };

  const hideBanner = () => {
    closePreferences();
    cookieBanner.style.bottom = '-100%';
    cookieBanner.classList.remove('show');
    setTimeout(() => {
      cookieBanner.style.display = 'none';
    }, 400);
  };
  
  const showBanner = (openSettings = false) => {
    closePreferences();
    cookieBanner.style.display = 'block';
    requestAnimationFrame(() => {
      cookieBanner.style.bottom = '0';
      cookieBanner.classList.add('show');
      if (openSettings) {
        openPreferences();
      }
    });
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
  
  if (savePreferences) {
    savePreferences.addEventListener('click', (event) => {
      event.preventDefault();
      const allowAnalytics = analyticsToggle ? analyticsToggle.checked : false;
      if (allowAnalytics) {
        setConsent('accepted');
        enableAnalytics();
      } else {
        setConsent('declined');
      }
      hideBanner();
    });
  }

  if (cancelPreferences) {
    cancelPreferences.addEventListener('click', (event) => {
      event.preventDefault();
      closePreferences();
    });
  }

  const attachManageHandler = (element) => {
    if (!element) return;
    element.addEventListener('click', (event) => {
      event.preventDefault();
      clearConsent();
      showBanner(true);
    });
  };
  
  attachManageHandler(manageCookiesFooter);
  attachManageHandler(manageCookiesBanner);
});
