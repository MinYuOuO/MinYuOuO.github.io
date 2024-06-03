
const player_eng = ["doggy", "dog", "cat", "bear", "duck", "Hedgedog", "Fox"];
const player_ch = ["狗狗", "猫咪", "鸭子", "鹦鹉", "小鸟", "海豚", "海鸥", "松鼠"];
var click_times = 0;
var random_num = 0;
var random_text = "";

function GetRandomText(Target, Max) {
    return Target[Math.floor(Math.random()*Max)];
}

function GetRandomNum(Max) {
    return Math.ceil(Math.random()*Max);
}

var text = document.getElementById("spawn_text");
var box_button = document.getElementById("box-button");
var comment_text = document.getElementById("comment_text");

function SenseText_ch(){
    var number_generate = GetRandomNum(9)
    var text_generate = GetRandomText(player_eng, 7)
    text.innerHTML = "此时，世界上有" + number_generate + "只" + text_generate + "正在想你。";
    click_times++;
    return random_num = number_generate, random_text = text_generate;
}

function SenseText_eng(){
    var number_generate = GetRandomNum(9)
    var text_generate = GetRandomText(player_eng, 7)
    if (number_generate === 1){
        text.innerHTML = number_generate + " " + text_generate + " is thinking of you now";
    } else {
        text.innerHTML = number_generate + " " + text_generate + " are thinking of you now";
    }
    click_times++;
    clicks(click_times, "english");
    return random_num = number_generate, random_text = text_generate;
}

function clicks(click_times, lang){
    if (lang === "english") {
        if (click_times === 1){
            comment_text.innerHTML = "This is not this real";
        } else if (click_times === 2){
            comment_text.innerHTML = " ";
        } else if (click_times === 3){
            alert ("Stop spending time on this");
        } else if (click_times === 5){
            comment_text.innerHTML = "<a href=\"https://www.youtube.com/watch?v=xvFZjo5PgG0&t=2s\">Feel bored?</a>";
        } else if (click_times === 6){
            alert ("You should do something more meaningful");
        } else if (click_times === 7){
            comment_text.innerHTML = "Someone thinking about you is the most meaningful things?";
        } else if (click_times === 8){
            comment_text.innerHTML = " ";
        }
    }
}

function generateLink() {
    var data = "ran=" + encodeURIComponent(random_num) + encodeURIComponent(random_text);
    var url = "https://wa.me/?text=" + encodeURIComponent("https://minyuouo.github.io/worty-person.html?") + data;
    document.getElementById("linkContainer").innerHTML = '<a href="' + url + '" target="_blank">Click here to send via WhatsApp</a>';
}

function generateShareLink() {
    number_generate = document.getElementById("share_number");
    text_generate = document.getElementById("share_text");
    var data = "ran=" + encodeURIComponent(number_generate.value) + encodeURIComponent(text_generate.value);
    var url = "https://wa.me/?text=" + encodeURIComponent("https://minyuouo.github.io/worty-person.html?") + data;
    document.getElementById("share_link").innerHTML = '<a href="' + url + '" target="_blank">Click here to send via WhatsApp</a>';
}

window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var ranValue = urlParams.get('ran');
    if (ranValue) {
        var parts = ranValue.split(/[a-zA-Z]+/);
        random_num = parts[0];
        random_text = ranValue.replace(random_num, "");
    }
    
    if (random_num || random_text) {
        if (random_num === 1){
            text.innerHTML = random_num + " " + random_text + " is thinking of you now";
        } else if (random_text == "I") {
            text.innerHTML = random_num + " " + random_text + " am thinking of you now";
        } else {
            text.innerHTML = random_num + " " + random_text + " are thinking of you now";
        }
    }
};

function updateShareText() {
    number_generate = document.getElementById("share_number").value;
    text_generate = document.getElementById("share_text").value;
    var shareText = document.getElementById("spawnShareText");

    if (number_generate == 1){
        shareText.innerHTML = number_generate + " " + text_generate + " is thinking of you now";
    } else if (text_generate == "I") {
        shareText.innerHTML = number_generate + " " + text_generate + " am thinking of you now";
    } else {
        shareText.innerHTML = number_generate + " " + text_generate + " are thinking of you now";
    }
}
