
const player_eng = ["doggy", "dog", "cat"];
const player_ch = ["狗狗", "猫咪", "鸭子", "鹦鹉", "小鸟", "海豚", "海鸥"];

function GetRandomText(Target, Max) {
    return Target[Math.floor(Math.random()*Max)];
}

function GetRandomNum(Max) {
    return Math.ceil(Math.random()*Max);
}

var text = document.getElementById("spawn_text");
var box_button = document.getElementsByClassName("box-button");

function SenseText_ch(){
    text.innerHTML = "此时，世界上有" + GetRandomNum(9) + "只" + GetRandomText(player_ch, 7) + "正在想你。";
    box_button.style.opacity = "100%";
}

function SenseText_eng(){
    text.innerHTML = "Somehow, There are " + GetRandomNum(9) + " " + GetRandomText(player_eng, 2) + " are missing you";
}
