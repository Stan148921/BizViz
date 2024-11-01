// Function to toggle the mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('show');
    }
}

// Function to handle arrow click
function handleArrowClick(arrowId) {
    const targetElement = document.getElementById(arrowId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to show/hide the overall summary
function showSummary(imageElement) {
    const summary = document.querySelector('.overall-summary');
    if (summary) {
        summary.classList.toggle('visible'); // Toggle the visibility class instead of direct style
    }
}

function toggleServiceDetails(button) {
    const serviceItem = button.closest('.service-item');
    const details = serviceItem ? serviceItem.querySelector('.service-details') : null;

    if (details) {
        // Collapse all other service details before expanding the clicked one
        const allDetails = document.querySelectorAll('.service-details');
        allDetails.forEach(detail => {
            if (detail !== details) {
                detail.style.display = 'none';
                const otherButton = detail.closest('.service-item')?.querySelector('.learn-more-button');
                if (otherButton) {
                    otherButton.textContent = "Learn More";
                    otherButton.classList.remove('active');
                }
            }
        });

        // Toggle the clicked service details
        if (details.style.display === "none" || details.style.display === "") {
            details.style.display = "block";
            button.textContent = "Hide Details";
            button.classList.add('active');
        } else {
            details.style.display = "none";
            button.textContent = "Learn More";
            button.classList.remove('active');
        }
    }
}

// Animated counters
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    let count = 0;
    const increment = target / 200; // Adjust for speed

    const updateCount = () => {
        if (count < target) {
            count += increment;
            el.innerText = Math.ceil(count);
            setTimeout(updateCount, 10); // Slightly increase timeout for smoother effect
        } else {
            el.innerText = target;
        }
    };

    updateCount();
}

// Parallax effect (with throttling)
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const parallax = document.querySelector('.services-intro');
            if (parallax) {
                let scrollPosition = window.pageYOffset;
                parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            }
            isScrolling = false;
        });
        isScrolling = true;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Scroll Arrow
    const scrollArrow = document.querySelector('.scroll-down-arrow a');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Card Headers
    const cardHeaders = document.querySelectorAll('.card-header');
    cardHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content) {
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reason Select
    const reasonSelect = document.getElementById('reason');
    const servicesGroup = document.getElementById('services-group');

    if (reasonSelect && servicesGroup) {
        reasonSelect.addEventListener('change', function() {
            servicesGroup.style.display = this.value === 'service_inquiry' ? 'block' : 'none';
        });
    }

    // Adding click event listeners for down arrows
    const downArrow1 = document.getElementById('down-arrow1');
    const downArrow2 = document.getElementById('down-arrow2');

    if (downArrow1) {
        downArrow1.addEventListener('click', function() {
            handleArrowClick('target-section-id-1'); // Replace with the actual ID of the section you want to scroll to
        });
    }

    if (downArrow2) {
        downArrow2.addEventListener('click', function() {
            handleArrowClick('target-section-id-2'); // Replace with the actual ID of the section you want to scroll to
        });
    }

    // Animated counters
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Slideshow
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    document.querySelector('.next').addEventListener('click', function() {
        changeSlide(currentSlide + 1);
    });

    document.querySelector('.prev').addEventListener('click', function() {
        changeSlide(currentSlide - 1);
    });

    function changeSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + totalSlides) % totalSlides; // Loop back to start or end
        slides[currentSlide].classList.add('active');
    }

    // Auto Slide
    const autoSlide = setInterval(() => {
        changeSlide(currentSlide + 1);
    }, 5000);

    // Clear interval on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(autoSlide);
    });

    /* Contact Form Script */
    const contactForm = document.getElementById('contactForm');
    const evalForm = document.getElementById('evalform');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    if (evalForm) {
        evalForm.addEventListener('submit', handleFormSubmit);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log('Form submission started');

        const form = event.target;
        const serviceID = 'service_qaf6shk';
        const templateID = form.id === 'contactForm' ? 'template_p7ao7kj' : 'template_n5igijt';

        console.log('Sending email...');
        emailjs.sendForm(serviceID, templateID, form)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showPopup('Thank you for your submission!', 'We will be in touch shortly.');
                clearForm(form);
            }, function(error) {
                console.error('FAILED...', error);
                showPopup('Error', 'Failed to send message. Please try again.', false);
            });
    }

    function showPopup(title, message, isSuccess = true) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
            <div class="popup-content ${isSuccess ? 'success' : 'error'}">
                <h2>${title}</h2>
                <p>${message}</p>
                <button onclick="this.closest('.popup').remove()">Close</button>
            </div>
        `;
        document.body.appendChild(popup);
    }

    function clearForm(form) {
        form.reset();
    }
    document.addEventListener('DOMContentLoaded', function() {
        const acceptButton = document.getElementById('accept-cookies');
        const declineButton = document.getElementById('decline-cookies');
    
        if (acceptButton) {
            acceptButton.addEventListener('click', acceptCookies);
        }
    
        if (declineButton) {
            declineButton.addEventListener('click', declineCookies);
        }
    
        // Check for cookies consent
        if (document.cookie.indexOf("cookies_accepted=true") === -1) {
            showCookieBanner();
        }
    });
    
    function showCookieBanner() {
        document.getElementById('cookie-banner').style.display = 'block';
    }
    
    function acceptCookies() {
        document.cookie = "cookies_accepted=true; max-age=" + 60 * 60 * 24 * 365 + "; path=/";
        document.getElementById('cookie-banner').style.display = 'none';
        loadGoogleAnalytics();
    }
    
    function declineCookies() {
        document.getElementById('cookie-banner').style.display = 'none';
    }
    
    function loadGoogleAnalytics() {
        var gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-HYR4ESN93X";
        document.head.appendChild(gaScript);
    
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-HYR4ESN93X');
    }
});    