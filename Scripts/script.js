// script.js

// Function to toggle the mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show'); // Toggle the 'show' class
}

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
    const scrollArrow = document.querySelector('.scroll-down-arrow a');
    
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const cardHeaders = document.querySelectorAll('.card-header');
    
    cardHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});
