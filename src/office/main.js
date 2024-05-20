const swipeButtons = document.getElementsByClassName('sideButton');
const officeViewContainer = document.getElementById('officeViewContainer');

// Add event listeners to both buttons
for (let i = 0; i < swipeButtons.length; i++) {
    swipeButtons[i].addEventListener('mouseover', (e) => swipe(e));
}

function swipe(event) {
    const buttonId = event.target.id;
    const containerWidth = officeViewContainer.offsetWidth;
    let currentScrollPosition = officeViewContainer.scrollLeft;

    // Determine swipe direction
    if (buttonId === 'swipeLeft') {
        // Move to the previous panel
        currentScrollPosition -= containerWidth;
    } else if (buttonId === 'swipeRight') {
        // Move to the next panel
        currentScrollPosition += containerWidth;
    }

    // Scroll to the new position smoothly
    officeViewContainer.scrollTo({
        left: currentScrollPosition,
        behavior: 'smooth'
    });
}
