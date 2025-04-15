// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      
      try {
        const response = await fetch(this.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'fields[email]': email,
            'ml-submit': '1'
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          document.getElementById('success').classList.remove('hidden');
        } else {
          alert('Något gick fel. Försök igen.');
        }
      } catch (error) {
        alert('Något gick fel. Försök igen.');
      }
    });
    
    // Close success message
    document.querySelector('.close-success')?.addEventListener('click', () => {
      document.getElementById('success').classList.add('hidden');
      document.getElementById('email').value = '';
    });
  }
});
