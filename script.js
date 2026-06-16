// ===========================
// NAVBAR: scroll shadow
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===========================
// OFFCANVAS MENU
// ===========================
const offcanvasToggle = document.getElementById('offcanvasToggle');
const offcanvasClose  = document.getElementById('offcanvasClose');
const offcanvas       = document.getElementById('offcanvas');
const overlay         = document.getElementById('offcanvasOverlay');

function openOffcanvas() {
  offcanvas.classList.add('active');
  overlay.classList.add('active');
  offcanvasToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOffcanvas() {
  offcanvas.classList.remove('active');
  overlay.classList.remove('active');
  offcanvasToggle.classList.remove('active');
  document.body.style.overflow = '';
}

offcanvasToggle.addEventListener('click', () => {
  offcanvas.classList.contains('active') ? closeOffcanvas() : openOffcanvas();
});

offcanvasClose.addEventListener('click', closeOffcanvas);
overlay.addEventListener('click', closeOffcanvas);

// Close on nav link click
document.querySelectorAll('.offcanvas__link').forEach(link => {
  link.addEventListener('click', closeOffcanvas);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeOffcanvas();
});

// ===========================
// REVEAL ON SCROLL
// ===========================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Instantly show hero elements
document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));

// ===========================
// SUBSCRIBE FORM
// ===========================
const form       = document.getElementById('subscribe-form');
const formError  = document.getElementById('form-error');
const formSuccess= document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName  = document.getElementById('first-name').value.trim();
  const lastName   = document.getElementById('last-name').value.trim();
  const email      = document.getElementById('email').value.trim();
  const newsletter = document.getElementById('newsletter').checked;

  if (!firstName)  { formError.textContent = 'Please enter your first name.'; return; }
  if (!lastName)   { formError.textContent = 'Please enter your last name.'; return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formError.textContent = 'Please enter a valid email address.'; return;
  }
  if (!newsletter) { formError.textContent = 'Please agree to subscribe to our newsletter.'; return; }

  formError.textContent = '';
  form.style.display = 'none';
  formSuccess.style.display = 'block';
});
