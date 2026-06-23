document.addEventListener('DOMContentLoaded', () => {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      // Close all other faqs (optional accordion behavior)
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== button) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherBtn.nextElementSibling.hidden = true;
          otherBtn.parentElement.classList.remove('active');
        }
      });

      // Toggle current
      button.setAttribute('aria-expanded', !isExpanded);
      button.nextElementSibling.hidden = isExpanded;
      button.parentElement.classList.toggle('active', !isExpanded);
    });
  });
});
