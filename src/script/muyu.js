var count = 0;
const countDisplay = document.getElementById("count");
const clickSound = document.getElementById("clickSound");
const dialogWindow = document.getElementById("dialogWindow");
const achiveName = document.getElementById("achiveName");
const achiveCondition = document.getElementById("achiveCondition");
const achiveDescription = document.getElementById("achiveDescription");

function click_muyu(){
    count++;
    events(count);
    countDisplay.innerHTML = count;

    clickSound.play();

    const increment = document.createElement("div");
    increment.textContent = "+1";
    increment.className = "increment";

    document.body.appendChild(increment);
    setTimeout(() => {
        document.body.removeChild(increment);
    }, 1000);
}

function events(count){
    if (count === 1){
        dialogWindow.showModal();
        achiveName.innerHTML = "Initiate of the Way";
        achiveCondition.innerHTML = "First time striking the wooden fish";
        achiveDescription.innerHTML = "Embarking on the Taoist path with a steadfast heart";
    } else if (count === 10){
        dialogWindow.showModal();
        achiveName.innerHTML = "Path of Practice";
        achiveCondition.innerHTML = "Accumulate 10 strikes on the wooden fish";
        achiveDescription.innerHTML = "Walking the path of practice, unwavering";
    } else if (count === 50){
        dialogWindow.showModal();
        achiveName.innerHTML = "Awakening to the Tao";
        achiveCondition.innerHTML = "Accumulate 50 strikes on the wooden fish";
        achiveDescription.innerHTML = "Awakening to the Tao, the heart begins to open";
    } else if (count === 100){
        dialogWindow.showModal();
        achiveName.innerHTML = "Mastery of the Way";
        achiveCondition.innerHTML = "Accumulate 100 strikes on the wooden fish";
        achiveDescription.innerHTML = "Mastering the Way, the spirit soars";
    } else if (count === 500){
        dialogWindow.showModal();
        achiveName.innerHTML = "Complete Spiritual Attainment";
        achiveCondition.innerHTML = "Accumulate 500 strikes on the wooden fish";
        achiveDescription.innerHTML = "Attainment of complete spiritual mastery, boundless as the Tao";
    } else if (count === 1000){
        dialogWindow.showModal();
        achiveName.innerHTML = "Perfection of the Tao";
        achiveCondition.innerHTML = "Accumulate 1000 strikes on the wooden fish";
        achiveDescription.innerHTML = "Perfecting the Tao, radiating brilliance like the sun and moon";
    }
}
