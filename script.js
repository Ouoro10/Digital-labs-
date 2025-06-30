// Burger menu toggle for mobile
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('nav ul');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('toggle');
});

// Smooth scroll disabled for multi-page site, navigation handled by href

// Simple alert form submission handler example (to be adapted on contact page)
document.querySelector('form')?.addEventListener('submit', function(e){
  e.preventDefault();
  alert('Merci pour votre message ! Nous vous contacterons bientôt.');
  this.reset();
});
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi classique du formulaire
    alert('Merci pour votre message, nous reviendrons vers vous rapidement !');
    this.reset(); // Réinitialise le formulaire après envoi
  });
}
