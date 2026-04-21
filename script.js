const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.querySelector('.nav-panel');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => {
        const isOpen = navPanel.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navPanel.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18,
    });

    reveals.forEach((item) => revealObserver.observe(item));
} else {
    reveals.forEach((item) => item.classList.add('is-visible'));
}

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const subject = String(formData.get('subject') || '').trim();
        const message = String(formData.get('message') || '').trim();

        if (!name || !email || !subject || !message) {
            formMessage.textContent = 'Please complete every field before sending.';
            return;
        }

        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            '',
            message,
        ].join('\n');

        const mailtoLink = `mailto:bajaojoshua2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        formMessage.textContent = 'Your email app should open with this message ready to send.';
    });
}
