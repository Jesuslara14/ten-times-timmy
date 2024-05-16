const swipeButtons = document.getElementsByClassName('sideButton');

const officeViews = document.getElementsByClassName('officeView');

for(let i = 0; i < swipeButtons.length; i++){
    swipeButtons[i].addEventListener('mouseover', (e) => swipe(e));
}

/* Office view functions */

function swipe(event){
    console.log(event.target.id);
}