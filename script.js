// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// EmailJS Configuration for Contact Form
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init("87Q11KLCQrwMVQUqL"); // Replace with your actual EmailJS user ID
    
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form before submission
            if (!validateForm(contactForm)) {
                formMessage.style.display = 'block';
                formMessage.style.color = '#ff4757';
                formMessage.textContent = 'Please fill in all required fields.';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 3000);
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm('service_afsu3sl', 'template_bkv7fwi', contactForm)
                .then(function(response) {
                    formMessage.style.display = 'block';
                    formMessage.style.color = '#00ff88';
                    formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    contactForm.reset();
                }, function(error) {
                    formMessage.style.display = 'block';
                    formMessage.style.color = '#ff4757';
                    formMessage.textContent = 'Failed to send message. Please try again or email me directly at bajaojoshua2@gmail.com';
                    console.error('EmailJS error:', error);
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                });
        });
    }
});

// Form validation
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

// Add CSS for form messages
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
