/**
 * Card Interactions - Makes character and place cards interactive
 * Enables clicking on cards to reveal more information
 */

document.addEventListener('DOMContentLoaded', () => {
  // Character Cards Interaction
  const characterCards = document.querySelectorAll('.character-card');
  
  characterCards.forEach(card => {
    // Create the "see more" button for each card
    const seeMoreBtn = document.createElement('button');
    seeMoreBtn.className = 'see-more';
    seeMoreBtn.setAttribute('aria-label', 'Se mer information');
    seeMoreBtn.innerHTML = '<i class="fas fa-info"></i>';
    card.appendChild(seeMoreBtn);
    
    // Restructure card content to support full-image design
    const cardFront = card.querySelector('.card-front');
    const cardImage = card.querySelector('.card-image');
    const cardContent = card.querySelector('.card-content');
    
    if (cardContent) {
      // Move cardContent out to be a direct child of the card
      const contentClone = cardContent.cloneNode(true);
      card.appendChild(contentClone);
      
      // Create a label with just the title
      const characterName = cardContent.querySelector('h3').textContent;
      const characterType = cardContent.querySelector('.character-type').textContent;
      
      const characterLabel = document.createElement('div');
      characterLabel.className = 'character-label';
      characterLabel.innerHTML = `
        <h3>${characterName}</h3>
        <p class="character-type">${characterType}</p>
      `;
      card.appendChild(characterLabel);
      
      // If original content is inside cardFront, we can remove it
      if (cardFront && cardFront.contains(cardContent)) {
        cardContent.remove();
      }
    }
    
    // Toggle content reveal on click
    seeMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.toggle('flipped');
    });
    
    // Also toggle on card click
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
  
  // Place Cards Interaction
  const placeCards = document.querySelectorAll('.place-card');
  
  placeCards.forEach(card => {
    const cardContent = card.querySelector('.card-content');
    
    if (cardContent) {
      // Create the title label that's always visible
      const placeName = cardContent.querySelector('h3').textContent;
      const placeType = cardContent.querySelector('.place-type').textContent;
      
      const placeTitle = document.createElement('div');
      placeTitle.className = 'place-title';
      placeTitle.innerHTML = `
        <h3>${placeName}</h3>
        <p class="place-type">${placeType}</p>
      `;
      card.appendChild(placeTitle);
    }
    
    // Create the info toggle button
    const infoToggle = document.createElement('button');
    infoToggle.className = 'place-info-toggle';
    infoToggle.setAttribute('aria-label', 'Visa mer information');
    infoToggle.innerHTML = '<i class="fas fa-info"></i>';
    card.appendChild(infoToggle);
    
    // Toggle content reveal on button click
    infoToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.toggle('reveal');
    });
    
    // Also toggle on card click
    card.addEventListener('click', () => {
      card.classList.toggle('reveal');
    });
  });
});
