document.getElementById('year').textContent = new Date().getFullYear();

const siteHeader = document.getElementById('top');
const toggleHeaderScrolled = () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 40);
};
toggleHeaderScrolled();
window.addEventListener('scroll', toggleHeaderScrolled);

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = Math.min(Math.max(Math.abs(distance) * 0.8, 600), 1800);
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerOffset = siteHeader.offsetHeight + 16;
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    smoothScrollTo(Math.max(targetY, 0));
    history.pushState(null, '', targetId);
  });
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = 'Дякуємо! Ваша заявка надіслана, ми зв\'яжемося з вами найближчим часом.';
  form.reset();
});
