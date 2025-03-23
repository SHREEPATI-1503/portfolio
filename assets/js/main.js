// Hide/Show navbar on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/Hide navbar
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
        // Scrolling down & past navbar
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up or at top
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(to right, rgba(45, 45, 45, 0.98), rgba(45, 45, 45, 0.95))';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'linear-gradient(to right, rgba(45, 45, 45, 0.95), rgba(45, 45, 45, 0.85))';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const isMobile = window.innerWidth <= 768;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const extraOffset = isMobile ? 60 : 0;  // Increased offset for mobile
        const targetPosition = targetElement.offsetTop - navbarHeight - extraOffset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Ensure menu closes and content is visible
        if (isMobile) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            // Small delay to ensure smooth transition
            setTimeout(() => {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
        
        // Add active class to current nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Add animation on scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.service-card, .about-content');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if(position.top < window.innerHeight) {
            element.classList.add('animate');
        }
    });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Improve mobile menu performance
let scrollPosition = 0;

function lockScroll() {
    scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

function unlockScroll() {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    if (navLinks.classList.contains('active')) {
        lockScroll();
        navLinks.style.display = 'flex';
        void navLinks.offsetHeight;
        navLinks.style.opacity = '1';
        navLinks.style.visibility = 'visible';
    } else {
        unlockScroll();
        navLinks.style.opacity = '0';
        navLinks.style.visibility = 'hidden';
        setTimeout(() => {
            navLinks.style.display = 'none';
        }, 300);
    }
});

// Improve link click handling
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            navLinks.style.opacity = '0';
            navLinks.style.visibility = 'hidden';
            unlockScroll();
            
            // Hide the menu completely after transition
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
        }
        
        // Small delay to ensure menu is hidden before scrolling
        setTimeout(() => {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - (isMobile ? 20 : 0);
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            document.querySelectorAll('.nav-links a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
        }, isMobile ? 350 : 0);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');
    errorDisplay.textContent = message;
    input.classList.add('error');
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorDisplay = formGroup.querySelector('.error-message');
    errorDisplay.textContent = '';
    input.classList.remove('error');
}

function showFormStatus(type, message) {
    formStatus.className = 'form-status';
    formStatus.classList.add(type);
    formStatus.textContent = message;

    if (type === 'success') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 3000);
    }
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');

    // Validate name
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email');
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    // Validate subject
    const subject = document.getElementById('subject');
    if (subject.value.trim() === '') {
        showError(subject, 'Subject is required');
        isValid = false;
    }

    // Validate message
    const message = document.getElementById('message');
    if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
    }

    if (isValid) {
        try {
            // Here you would normally send the form data to a server
            // For demonstration, we'll just show a success message
            showFormStatus('success', 'Message sent successfully!');
            contactForm.reset();
        } catch (error) {
            showFormStatus('error', 'There was an error sending your message. Please try again.');
        }
    }
});

// Clear errors when user starts typing
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => clearError(input));
});

// Highlight active section while scrolling
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Image Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// Scroll functionality for horizontal scroll containers
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.certifications-container, .portfolio-container, .experience-container');
    
    containers.forEach(container => {
        const items = container.querySelectorAll('.certification-card, .portfolio-item, .experience-item');
        const scrollLeftBtn = container.parentElement.querySelector('.scroll-left');
        const scrollRightBtn = container.parentElement.querySelector('.scroll-right');
        let currentIndex = 0;

        // Show first item
        if (items.length > 0) {
            items[0].classList.add('active');
        }

        // Update visibility of scroll buttons
        function updateScrollButtons() {
            if (items.length <= 1) {
                scrollLeftBtn.style.display = 'none';
                scrollRightBtn.style.display = 'none';
            } else {
                scrollLeftBtn.style.display = 'flex';
                scrollRightBtn.style.display = 'flex';
            }
        }

        function scrollTo(index, direction) {
            if (items.length === 0) return;

            // Remove active class from current item
            items[currentIndex].classList.remove('active');
            
            // Update current index
            currentIndex = index;
            
            // Add active class to new item with animation
            const newItem = items[currentIndex];
            newItem.style.animation = direction === 'right' ? 
                'slideInRight 0.5s forwards' : 
                'slideInLeft 0.5s forwards';
            newItem.classList.add('active');
            
            // Clear animation after it's done
            setTimeout(() => {
                newItem.style.animation = '';
            }, 500);
        }

        scrollLeftBtn?.addEventListener('click', () => {
            const newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            scrollTo(newIndex, 'left');
        });

        scrollRightBtn?.addEventListener('click', () => {
            const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            scrollTo(newIndex, 'right');
        });

        // Initialize button visibility
        updateScrollButtons();
    });
});

// Portfolio Slider
document.addEventListener('DOMContentLoaded', function() {
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer) {
        const items = portfolioContainer.querySelectorAll('.portfolio-card');
        const scrollLeftBtn = portfolioContainer.parentElement.querySelector('.scroll-left');
        const scrollRightBtn = portfolioContainer.parentElement.querySelector('.scroll-right');
        let currentIndex = 0;

        function updateScrollButtons() {
            if (items.length <= 1) {
                scrollLeftBtn.style.display = 'none';
                scrollRightBtn.style.display = 'none';
                return;
            }
            scrollLeftBtn.style.display = 'flex';
            scrollRightBtn.style.display = 'flex';
        }

        function scrollTo(index, direction) {
            const currentItem = items[currentIndex];
            const newItem = items[index];
            
            currentItem.classList.remove('active');
            currentItem.style.animation = direction === 'left' ? 'slideOutRight 0.5s ease' : 'slideOutLeft 0.5s ease';
            
            newItem.classList.add('active');
            newItem.style.animation = direction === 'left' ? 'slideInLeft 0.5s ease' : 'slideInRight 0.5s ease';
            
            currentIndex = index;
            
            // Clear animation after it's done
            setTimeout(() => {
                currentItem.style.animation = '';
                newItem.style.animation = '';
            }, 500);
        }

        scrollLeftBtn?.addEventListener('click', () => {
            const newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            scrollTo(newIndex, 'left');
        });

        scrollRightBtn?.addEventListener('click', () => {
            const newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            scrollTo(newIndex, 'right');
        });

        // Initialize button visibility
        updateScrollButtons();
    }
}); 