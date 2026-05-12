// Header scroll effect
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.global-nav');
hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

// Close nav on link click
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);
fadeEls.forEach(el => observer.observe(el));

// Privacy policy modal
const policyLink  = document.getElementById('policy-link');
const modal       = document.getElementById('policy-modal');
const overlay     = document.getElementById('modal-overlay');
const modalClose  = document.querySelector('.modal-close');

function openModal() {
  modal.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

policyLink.addEventListener('click', e => { e.preventDefault(); openModal(); });
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Contact form — simple client-side validation feedback
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  const requiredFields = form.querySelectorAll('[required]');
  let valid = true;

  requiredFields.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
      field.style.borderColor = '#c0392b';
      valid = false;
    }
  });

  if (!valid) {
    const first = form.querySelector('[required][style*="c0392b"]');
    if (first) first.focus();
    return;
  }

  btn.textContent = '送信中...';
  btn.disabled = true;

  // Simulate async send (replace with actual fetch to backend)
  setTimeout(() => {
    btn.textContent = '送信完了';
    form.reset();
    const note = document.createElement('p');
    note.style.cssText = 'color:#1a7a3c;font-size:.88rem;margin-top:8px;';
    note.textContent = 'お問い合わせを受け付けました。内容を確認の上、代表より折り返しご連絡いたします。';
    form.appendChild(note);
    setTimeout(() => {
      btn.textContent = '送信する';
      btn.disabled = false;
      note.remove();
    }, 6000);
  }, 1200);
});
