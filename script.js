// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initScrollIndicator();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Scroll animations using ScrollReveal
function initScrollAnimations() {
    // Check if ScrollReveal is loaded
    if (typeof ScrollReveal === 'undefined') {
        console.warn('ScrollReveal library not loaded');
        return;
    }

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 2000,
        delay: 100,
        reset: false
    });

    // Animate different elements with different configurations
    sr.reveal('.section-title', {
        origin: 'top',
        distance: '30px',
        duration: 1000
    });

    sr.reveal('.about-text', {
        origin: 'left',
        distance: '80px',
        duration: 1500
    });

    sr.reveal('.about-skills', {
        origin: 'right',
        distance: '80px',
        duration: 1500,
        delay: 200
    });

    sr.reveal('.skill-category', {
        interval: 200,
        duration: 1500
    });

    sr.reveal('.timeline-item', {
        interval: 300,
        duration: 1500
    });

    sr.reveal('.education-item', {
        interval: 200,
        duration: 1500
    });

    sr.reveal('.project-card', {
        interval: 200,
        duration: 1500,
        scale: 0.9
    });

    sr.reveal('.contact-item', {
        origin: 'left',
        interval: 200,
        duration: 1500
    });

    sr.reveal('.contact-form', {
        origin: 'right',
        duration: 1500,
        delay: 300
    });

    sr.reveal('.footer-content', {
        origin: 'bottom',
        duration: 1000
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }

        // Create mailto link
        const subject = encodeURIComponent(`Contact Portfolio - ${name}`);
        const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:nolan974pro@gmail.com?subject=${subject}&body=${body}`;

        // Log to console for debugging
        console.log('Form submitted:', {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        });

        // Open mailto link
        window.location.href = mailtoLink;

        // Show success message
        showNotification('Merci pour votre message ! Votre client email va s\'ouvrir.', 'success');

        // Reset form
        contactForm.reset();
    });

    // Add floating label effect
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            input.addEventListener('focus', function() {
                label.style.color = 'var(--primary-color)';
            });

            input.addEventListener('blur', function() {
                if (!input.value) {
                    label.style.color = 'var(--text-light)';
                }
            });
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#" or empty
            if (!targetId || targetId === '#') {
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current nav link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-70px 0px -50% 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize active navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initActiveNavigation();
});

// Add typing animation for hero title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTypingAnimation, 500);
});

// Add parallax effect to hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Throttle scroll events for better performance
    const throttledScrollHandler = throttle(function() {
        // Handle scroll events here if needed
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledScrollHandler);
});

// Add loading animation
function initLoadingAnimation() {
    // Add fade-in class to body after loading
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
}

// Initialize loading animation
document.addEventListener('DOMContentLoaded', initLoadingAnimation);

// Add CSS for loading animation
const loadingStyles = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

// Inject loading styles
const styleElement = document.createElement('style');
styleElement.textContent = loadingStyles;
document.head.appendChild(styleElement);
