// Form submission handling + timed newsletter popup
document.addEventListener('DOMContentLoaded', function() {
  const signupForms = Array.from(document.querySelectorAll('[data-signup-form]'));
  const successMessage = document.getElementById('success');
  const closeSuccessButton = document.querySelector('.close-success');
  const newsletterModal = document.getElementById('newsletter-modal');
  const closeNewsletterButton = document.querySelector('.newsletter-modal__close');
  const modalContent = newsletterModal ? newsletterModal.querySelector('.newsletter-modal__content') : null;
  const primaryEmailInput = document.querySelector('#signup-form [data-email-input]');
  const openNewsletterTrigger = document.getElementById('newsletter-trigger');
  const modalDismissKey = 'newsletter-modal-dismissed';
  const popupDelayMs = 3500;
  const scrollThreshold = 250;
  let popupTimer = null;
  let popupScheduled = false;
  let lastSubmittedInput = null;
  
  if (successMessage && !successMessage.hasAttribute('tabindex')) {
    successMessage.setAttribute('tabindex', '-1');
  }
  
  const parseMailerLiteResponse = async (response) => {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (error) {
      const match = text.match(/\{.*\}/s);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch (innerError) {
          console.log('Unable to parse MailerLite JSONP payload:', innerError);
        }
      }
      return { success: /success/i.test(text) };
    }
  };
  
  const getFromStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  };
  
  const setInStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Ignore storage issues (private mode, disabled storage, etc.)
    }
  };
  
  const hasDismissedModal = () => getFromStorage(modalDismissKey) === 'true';
  const markModalDismissed = () => setInStorage(modalDismissKey, 'true');
  
  const showTrigger = () => {
    if (openNewsletterTrigger) {
      openNewsletterTrigger.classList.remove('hidden');
    }
  };
  
  const hideTrigger = () => {
    if (openNewsletterTrigger) {
      openNewsletterTrigger.classList.add('hidden');
    }
  };
  
  const hideNewsletterModal = () => {
    if (!newsletterModal) return;
    newsletterModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    markModalDismissed();
    showTrigger();
  };
  
  const showNewsletterModal = (force = false) => {
    if (!newsletterModal || (!force && hasDismissedModal())) return;
    newsletterModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    hideTrigger();
    if (modalContent) {
      modalContent.focus();
    }
  };
  
  const schedulePopup = () => {
    if (popupScheduled || hasDismissedModal() || !newsletterModal) {
      return;
    }
    popupScheduled = true;
    popupTimer = setTimeout(() => {
      if (!hasDismissedModal()) {
        showNewsletterModal();
      }
      popupTimer = null;
    }, popupDelayMs);
  };
  
  if (newsletterModal) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        schedulePopup();
      }
    }, { passive: true });
    
    if (closeNewsletterButton) {
      closeNewsletterButton.addEventListener('click', hideNewsletterModal);
    }
    
    newsletterModal.addEventListener('click', (event) => {
      if (event.target === newsletterModal) {
        hideNewsletterModal();
      }
    });
    
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !newsletterModal.classList.contains('hidden')) {
        hideNewsletterModal();
      }
    });
  }
  
  if (openNewsletterTrigger) {
    openNewsletterTrigger.addEventListener('click', () => showNewsletterModal(true));
  }
  
  if (hasDismissedModal()) {
    showTrigger();
  }
  
  const handleSuccess = () => {
    hideNewsletterModal();
    if (successMessage) {
      successMessage.classList.remove('hidden');
      successMessage.focus();
    }
  };
  
  const resetInputs = () => {
    signupForms.forEach((form) => {
      const emailField = form.querySelector('[data-email-input]');
      if (emailField) {
        emailField.value = '';
      }
    });
  };
  
  const focusDefaultInput = () => {
    if (primaryEmailInput) {
      primaryEmailInput.focus();
    } else if (lastSubmittedInput) {
      lastSubmittedInput.focus();
    }
  };
  
  signupForms.forEach((form) => {
    const emailInput = form.querySelector('[data-email-input]');
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!emailInput || !submitButton) {
      return;
    }
    
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      lastSubmittedInput = emailInput;
      
      const formData = new URLSearchParams({
        'fields[email]': emailInput.value,
        'ml-submit': '1'
      });
      
      try {
        const response = await fetch(this.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData
        });
        
        if (!response.ok) {
          throw new Error(`MailerLite returned status ${response.status}`);
        }
        
        const result = await parseMailerLiteResponse(response);
        
        if (result && result.success) {
          handleSuccess();
        } else {
          throw new Error('Unexpected response from MailerLite.');
        }
      } catch (error) {
        console.error('Signup failed:', error);
        alert('Något gick fel. Försök igen eller kontakta oss på info@glitterdalen.se.');
      } finally {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
      }
    });
  });
  
  const closeSuccess = () => {
    if (successMessage) {
      successMessage.classList.add('hidden');
    }
    resetInputs();
    focusDefaultInput();
  };
  
  if (closeSuccessButton) {
    closeSuccessButton.addEventListener('click', closeSuccess);
  }
    
  if (successMessage) {
    successMessage.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeSuccess();
      }
    });
  }
});
