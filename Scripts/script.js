// DOM Content Loaded Listener
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks?.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (navLinks?.classList.contains('show') &&
                !hamburgerMenu.contains(e.target) &&
                !navLinks.contains(e.target)) {
                navLinks.classList.remove('show');
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll Arrow Click Handling
    const scrollArrows = document.querySelectorAll('[data-scroll-target]');
    scrollArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const targetId = arrow.getAttribute('data-scroll-target');
            const targetElement = document.getElementById(targetId);
            targetElement?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                let count = 0;
                const increment = target / 200;

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 10);
                    } else {
                        entry.target.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    // Parallax Effect
    const parallaxElement = document.querySelector('.services-intro');
    if (parallaxElement) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            parallaxElement.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Cookie Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');

    if (cookieBanner && document.cookie.indexOf('cookies_accepted=true') === -1) {
        cookieBanner.style.display = 'block';
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            document.cookie = 'cookies_accepted=true; max-age=' + 60 * 60 * 24 * 365 + '; path=/';
            cookieBanner.style.display = 'none';
            loadGoogleAnalytics();
        });
    }

    if (declineCookies) {
        declineCookies.addEventListener('click', () => {
            cookieBanner.style.display = 'none';
        });
    }

    function loadGoogleAnalytics() {
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-HYR4ESN93X';
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-HYR4ESN93X');
    }

    // Service Details Toggle
    const learnMoreButtons = document.querySelectorAll('.learn-more-button');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceItem = button.closest('.service-item');
            const details = serviceItem?.querySelector('.service-details');

            if (details) {
                const isVisible = details.style.display === 'block';
                document.querySelectorAll('.service-details').forEach(detail => {
                    detail.style.display = 'none';
                    detail.closest('.service-item')?.querySelector('.learn-more-button')?.classList.remove('active');
                });

                if (!isVisible) {
                    details.style.display = 'block';
                    button.classList.add('active');
                    button.textContent = 'Hide Details';
                } else {
                    button.classList.remove('active');
                    button.textContent = 'Learn More';
                }
            }
        });
    });

    // Form Submission Handling
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const serviceID = 'service_qaf6shk';
        const templateID = form.id === 'contactForm' ? 'template_p7ao7kj' : 'template_n5igijt';

        emailjs.sendForm(serviceID, templateID, form).then(() => {
            showPopup('Thank you!', 'Your message has been sent successfully.', true);
            form.reset();
        }).catch(() => {
            showPopup('Error', 'Failed to send your message. Please try again.', false);
        });
    };

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    function showPopup(title, message, isSuccess) {
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

    // Carousel/Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    // Ensure slides exist before proceeding
    if (totalSlides > 0) {
        const changeSlide = (index) => {
            // Safely remove 'active' class from the current slide
            if (slides[currentSlide]) {
                slides[currentSlide].classList.remove('active');
            }

            // Safely update the currentSlide index with wrap-around logic
            currentSlide = (index + totalSlides) % totalSlides;

            // Safely add 'active' class to the new current slide
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('active');
            }
        };

        // Add event listeners for next/prev buttons only if they exist
        if (nextButton) {
            nextButton.addEventListener('click', () => changeSlide(currentSlide + 1));
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => changeSlide(currentSlide - 1));
        }

        // Auto slide functionality with interval
        const autoSlide = setInterval(() => changeSlide(currentSlide + 1), 5000);

        // Clear the auto slide interval when the window is unloaded
        window.addEventListener('beforeunload', () => clearInterval(autoSlide));

    } else {
        console.error('No slides found for the carousel.');
    }

    // JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "BizzViz",
        "description": "IT support and digital solutions for small businesses",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Waverly",
            "addressRegion": "NY"
        },
        "areaServed": [
            "Waverly, NY",
            "Elmira, NY", 
            "Horseheads, NY",
            "United States"
        ],
        "serviceArea": [
            "On-site IT Support in Southern Tier, NY",
            "Remote IT Services Nationwide"
        ]
    });
    document.head.appendChild(script);

    // Card Toggle Behavior
    const cardHeaders = document.querySelectorAll('.card-header');
    cardHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.content-card');
            const content = card.querySelector('.card-content');
            
            header.classList.toggle('expanded');
            content.classList.toggle('expanded');
            
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});
