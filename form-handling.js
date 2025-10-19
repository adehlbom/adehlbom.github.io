// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signup-form');
  if (!signupForm) {
    return;
  }
  
  const emailInput = signupForm.querySelector('#email');
  const submitButton = signupForm.querySelector('button[type="submit"]');
  const successMessage = document.getElementById('success');
  const closeSuccessButton = document.querySelector('.close-success');
  
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
  
  signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!emailInput || !submitButton) {
      return;
    }
    
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    
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
        if (successMessage) {
          successMessage.classList.remove('hidden');
          successMessage.focus();
        }
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
  
  if (closeSuccessButton) {
    closeSuccessButton.addEventListener('click', () => {
      if (successMessage) {
        successMessage.classList.add('hidden');
      }
      if (emailInput) {
        emailInput.value = '';
        emailInput.focus();
      }
    });
  }
    
  if (successMessage) {
    successMessage.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        successMessage.classList.add('hidden');
        if (emailInput) {
          emailInput.focus();
        }
      }
    });
  }
});
