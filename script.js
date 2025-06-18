// Mobile Navigation Menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Toggle Navigation
burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('active');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Prevent body scroll when menu is open
burger.addEventListener('click', () => {
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form Validation
const subscriptionForm = document.querySelector('.subscription-form form');

if (subscriptionForm) {
    subscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(subscriptionForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        let isValid = true;
        const errors = {};
        
        // Name validation
        if (!data.name || data.name.length < 3) {
            errors.name = 'Nama harus diisi minimal 3 karakter';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Email tidak valid';
            isValid = false;
        }
        
        // Phone validation
        const phoneRegex = /^[0-9]{10,13}$/;
        if (!data.phone || !phoneRegex.test(data.phone.replace(/\D/g, ''))) {
            errors.phone = 'Nomor telepon tidak valid';
            isValid = false;
        }
        
        // Address validation
        if (!data.address || data.address.length < 10) {
            errors.address = 'Alamat harus diisi minimal 10 karakter';
            isValid = false;
        }
        
        // Package validation
        if (!data.package) {
            errors.package = 'Silakan pilih paket';
            isValid = false;
        }
        
        // Installation date validation
        if (!data.installation) {
            errors.installation = 'Silakan pilih tanggal instalasi';
            isValid = false;
        }
        
        // Show errors if any
        if (!isValid) {
            Object.keys(errors).forEach(field => {
                const input = document.getElementById(field);
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = errors[field];
                
                // Remove existing error message if any
                const existingError = input.parentElement.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                input.parentElement.appendChild(errorDiv);
                input.classList.add('error');
            });
            
            return;
        }
        
        // If form is valid, show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Pendaftaran berhasil! Tim kami akan menghubungi Anda segera.';
        
        subscriptionForm.innerHTML = '';
        subscriptionForm.appendChild(successMessage);
    });
}

// Package Selection
const packageButtons = document.querySelectorAll('.btn-package');

packageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const packageCard = button.closest('.package-card');
        const packageName = packageCard.querySelector('h3').textContent;
        const packagePrice = packageCard.querySelector('.price').textContent;
        
        // Scroll to subscription form
        document.querySelector('#subscription').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Set selected package in form
        const packageSelect = document.getElementById('package');
        if (packageSelect) {
            packageSelect.value = packageName.toLowerCase();
        }
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .error-message {
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .error {
        border-color: #dc2626 !important;
    }
    
    .success-message {
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
    }
    
    .nav-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 70px;
        background: white;
        width: 100%;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .toggle .line2 {
        opacity: 0;
    }
    
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

document.head.appendChild(style); 