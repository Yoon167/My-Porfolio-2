// ==============================
// Mobile Navigation Toggle
// ==============================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ==============================
// Smooth Scrolling for Internal Links
// ==============================
document.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==============================
// EmailJS Configuration (Only on Contact Page)
// ==============================
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        // Initialize EmailJS
        emailjs.init({ publicKey: "87Q11KLCQrwMVQUqL" });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate form before submission
            if (!validateForm(contactForm)) {
                showMessage(formMessage, 'Please fill in all required fields.', '#ff4757');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Send email using EmailJS
            emailjs.sendForm('service_afsu3sl', 'template_bkv7fwi', contactForm)
                .then(() => {
                    showMessage(formMessage, 'Message sent successfully! I\'ll get back to you soon.', '#00ff88');
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('EmailJS error:', error);
                    showMessage(formMessage, 'Failed to send message. Please try again later.', '#ff4757');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// ==============================
// Helper Functions
// ==============================
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

function showMessage(element, message, color) {
    element.style.display = 'block';
    element.style.color = color;
    element.textContent = message;

    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// ==============================
// Inject minimal CSS for error highlighting
// ==============================
const style = document.createElement('style');
style.textContent = `
    #form-message {
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
        font-weight: 500;
    }
    .form-group input.error, .form-group textarea.error {
        border-color: #ff4757;
    }
`;
document.head.appendChild(style);
