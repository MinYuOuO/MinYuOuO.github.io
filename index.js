// script.js
const clickCountSpan = document.getElementById("clickCount");
const clickSound = document.getElementById("clickSound");
let clickCount = 0;


document.addEventListener("click", event => {
    if (event.button === 0) {
        clickCount++;
        clickCountSpan.textContent = clickCount;

        clickSound.play();

        if(clickSound.paused){
            clickSound.play();
        }

    }
});
