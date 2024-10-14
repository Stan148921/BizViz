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

// Function to toggle service details on button click
function toggleDetails(buttonElement) {
    const details = buttonElement.closest('.service-item').querySelector('.service-details');
    
    // Toggle display of the service details
    const isVisible = details.style.display === 'block';
    details.style.display = isVisible ? 'none' : 'block';
    buttonElement.innerText = isVisible ? 'View Details' : 'Hide Details'; // Update button text accordingly
}

// Function to toggle service details with collapsing other details
function toggleServiceDetails(container) {
    const details = container.nextElementSibling; // Get the next sibling (service-details)
    
    // Collapse all other service details before expanding the clicked one
    const allDetails = document.querySelectorAll('.service-details');
    allDetails.forEach(detail => {
        if (detail !== details) {
            detail.style.display = 'none'; // Hide other details
        }
    });
    
    // Toggle the clicked service details
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block"; // Show details
    } else {
        details.style.display = "none"; // Hide details
    }
}

