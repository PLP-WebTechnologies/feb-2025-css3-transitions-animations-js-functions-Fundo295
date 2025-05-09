// DOM Elements
const themeSelect = document.getElementById('theme');
const speedSelect = document.getElementById('animation-speed');
const saveBtn = document.getElementById('save-btn');
const animateBtn = document.getElementById('animate-btn');
const bounceBtn = document.getElementById('bounce-btn');
const animatedElement = document.getElementById('animated-element');
const galleryImages = document.querySelectorAll('.gallery-img');

// Load saved preferences
function loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedSpeed = localStorage.getItem('animationSpeed');
    
    if (savedTheme) {
        themeSelect.value = savedTheme;
        document.body.className = savedTheme;
    }
    
    if (savedSpeed) {
        speedSelect.value = savedSpeed;
    }
}

// Save preferences to localStorage
function savePreferences() {
    const theme = themeSelect.value;
    const speed = speedSelect.value;
    
    localStorage.setItem('theme', theme);
    localStorage.setItem('animationSpeed', speed);
    
    // Apply theme immediately
    document.body.className = theme;
    
    // Show confirmation
    alert('Preferences saved!');
}

// Animation functions
function triggerAnimation() {
    // Clear any existing animations
    animatedElement.className = 'box';
    
    // Trigger reflow
    void animatedElement.offsetWidth;
    
    // Add animation class based on speed
    const speed = speedSelect.value;
    animatedElement.classList.add('rotate', speed);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        animatedElement.classList.remove('rotate', speed);
    }, 2000);
}

function triggerBounce() {
    // Clear any existing animations
    animatedElement.className = 'box';
    
    // Trigger reflow
    void animatedElement.offsetWidth;
    
    // Add bounce animation with selected speed
    const speed = speedSelect.value;
    animatedElement.classList.add('bounce', speed);
    
    // Stop bouncing after 3 seconds
    setTimeout(() => {
        animatedElement.classList.remove('bounce', speed);
    }, 3000);
}


// Image gallery hover effect
function setupGallery() {
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.classList.add('pulse');
        });
        
        img.addEventListener('mouseleave', () => {
            img.classList.remove('pulse');
        });
        
        img.addEventListener('click', () => {
            // Store last clicked image in localStorage
            localStorage.setItem('lastClickedImage', img.src);
            alert(`Image saved! You last clicked: ${img.src}`);
        });
    });
}

// Event Listeners
saveBtn.addEventListener('click', savePreferences);
animateBtn.addEventListener('click', triggerAnimation);
bounceBtn.addEventListener('click', triggerBounce);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    setupGallery();
    
    // Check if there's a last clicked image
    const lastImage = localStorage.getItem('lastClickedImage');
    if (lastImage) {
        console.log('Last clicked image was:', lastImage);
    }
});