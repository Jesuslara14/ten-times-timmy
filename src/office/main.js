const swipeButtons = document.getElementsByClassName('sideButton');
const officeViewContainer = document.getElementById('officeViewContainer');

// Add event listeners to both buttons
for (let i = 0; i < swipeButtons.length; i++) {
    swipeButtons[i].addEventListener('mouseover', (e) => swipe(e));
}

function swipe(event) {
    const buttonId = event.target.id;
    const itemWidth = officeViewContainer.firstElementChild.offsetWidth; // Get the width of a single item
    let currentScrollPosition = officeViewContainer.scrollLeft;

    // Determine swipe direction
    if (buttonId === 'swipeLeft') {
        // Move to the previous item
        currentScrollPosition -= itemWidth;
        // Ensure we don't scroll past the first item
        if (currentScrollPosition < 0) {
            currentScrollPosition = 0;
        }
    } else if (buttonId === 'swipeRight') {
        // Move to the next item
        currentScrollPosition += itemWidth;
        // Ensure we don't scroll past the last item
        const maxScrollLeft = officeViewContainer.scrollWidth - officeViewContainer.clientWidth;
        if (currentScrollPosition > maxScrollLeft) {
            currentScrollPosition = maxScrollLeft;
        }
    }

    // Scroll to the new position smoothly
    officeViewContainer.scrollTo({
        left: currentScrollPosition,
        behavior: 'smooth'
    });
}
