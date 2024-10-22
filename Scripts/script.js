// script.js

// Function to toggle the mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show'); // Toggle the 'show' class
}
// Function to handle arrow click
function handleArrowClick(arrowId) {
    const targetElement = document.getElementById(arrowId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', function() {

// Function to show/hide the overall summary
function showSummary(imageElement) {
    const summary = document.querySelector('.overall-summary'); // Select the overall summary
    summary.style.display = summary.style.display === 'block' ? 'none' : 'block'; // Toggle the summary visibility
}

function toggleServiceDetails(button) {
    const serviceItem = button.closest('.service-item');
    const details = serviceItem.querySelector('.service-details');
    
    // Collapse all other service details before expanding the clicked one
    const allDetails = document.querySelectorAll('.service-details');
    allDetails.forEach(detail => {
        if (detail !== details) {
            detail.style.display = 'none';
            const otherButton = detail.closest('.service-item').querySelector('.learn-more-button');
            otherButton.textContent = "Learn More";
            otherButton.classList.remove('active');
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
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Reason Select
    const reasonSelect = document.getElementById('reason');
    const servicesGroup = document.getElementById('services-group');
    reasonSelect.addEventListener('change', function() {
        servicesGroup.style.display = this.value === 'service_inquiry' ? 'block' : 'none';
    });
});

// Animated counters
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    let count = 0;
    const increment = target / 200; // Adjust for speed

    const updateCount = () => {
        if (count < target) {
            count += increment;
            el.innerText = Math.ceil(count);
            setTimeout(updateCount, 1);
        } else {
            el.innerText = target;
        }
    };

    updateCount();
}

// Trigger counter animation when in view
const counters = document.querySelectorAll('.counter');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.services-intro');
    if (parallax) {
        let scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});
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
});