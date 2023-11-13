let time = JSON.parse(localStorage.getItem("time")) || {
    seconds: 0,
    minutes: 0, 
    hours: 0,
    total: 0
};



let acheievements = JSON.parse(localStorage.getItem("achievements")) || {
    my: []
}
function achAppend(array){
    if (array.length === 0){
        document.getElementById("achievements").innerHTML = `<h3 style="text-align: center";>У вас пока нет достижений(</h3>`
    }
    else{
        document.getElementById("achievements").innerHTML = '';
        for(i = 0; i < array.length; i++){
            let p = document.createElement("p");
            p.innerHTML = `${i+1}. ${array[i].trim()}`;
            document.getElementById("achievements").append(p);
        }
    }
}
achAppend(acheievements.my);
document.body.addEventListener("click", () => {
    if ((event.target.id != "timer_add") && (event.target.closest("#modal_container") == null)){
        document.getElementById("modal").style.display = "none";
    }
})
document.getElementById("modal_add").addEventListener("click", () => {
    if (document.getElementById("modal_input").value.trim() != ""){
        acheievements.my.push(document.getElementById("modal_input").value);
        document.getElementById("modal_input").value = "";
        achAppend(acheievements.my);
        document.getElementById("modal").style.display = "none";
        localStorage.setItem("achievements", JSON.stringify(acheievements))
    }

})


document.getElementById("timer-seconds").innerHTML = time.seconds < 10 ? '0' + time.seconds : time.seconds;
document.getElementById("timer-minutes").innerHTML = time.minutes < 10 ? '0' + time.minutes + ':' : time.minutes + ':';
document.getElementById("timer-hours").innerHTML = time.hours < 10 ? '0' + time.hours + ':' : time.hours + ':';

document.getElementById("timer_add").addEventListener("click", () => {document.getElementById("modal").style.display = "flex";})

const cat = document.getElementById("cat")

cat.style.left = -90 + time.total * 0.525 + "px";


let play = false;
let timeout = false;

document.getElementById("timer-play").addEventListener("click", () => {
    if (play === false){
        document.getElementById("anime_girl_img").src = "./img/anime2-transformed.png";
        play = true;
        playEvent = setInterval(() => {
            if (time.seconds == 59){
                time.seconds = 0;
                document.getElementById("phrase").style.visibility="visible";
                timeout = true;
                document.getElementById("timer-seconds").innerHTML = '0' + time.seconds;
                if (time.minutes == 59){
                    time.minutes = 0;
                    document.getElementById("timer-minutes").innerHTML = '0' + time.minutes + ':';
                    time.hours++;
                    document.getElementById("timer-hours").innerHTML = time.hours < 10 ? '0' + time.hours + ':' : time.hours + ':';
                    time.total = 0;
                }
                else{
                    time.minutes++;
                    document.getElementById("timer-minutes").innerHTML = time.minutes < 10 ? '0' + time.minutes + ':' : time.minutes + ':';
                }
            }
            else{
                if (timeout){
                    setTimeout(() => {document.getElementById("phrase").style.visibility="hidden";}, 10000);
                    timeout = false;
                }
                time.seconds++;
                document.getElementById("timer-seconds").innerHTML = time.seconds < 10 ? '0' + time.seconds : time.seconds;
            }
            time.total++;
            localStorage.setItem("time", JSON.stringify(time))
            console.log(-90 + time.total * 2 + "px")
            cat.style.left = -90 + time.total * 0.525 + "px";
        }, 1000);
    }
    else{
        clearInterval(playEvent);
        play = false;
        localStorage.setItem("time", JSON.stringify(time))
        document.getElementById("anime_girl_img").src = "./img/anime1-transformed.png";
    }
});

document.getElementById("timer-stop").addEventListener("click", () => {
    if (play === true){
        clearInterval(playEvent);
        play = false;
        localStorage.setItem("time", JSON.stringify(time))
        console.log(3)
        document.getElementById("anime_girl_img").src = "./img/anime1-transformed.png";
    }
});

document.getElementById("timer-restart").addEventListener("click", () => {
    if (play === true){
        clearInterval(playEvent);
    }
    play = false;
    time.seconds = 0;
    time.minutes = 0;
    time.hours = 0;
    document.getElementById("timer-seconds").innerHTML = '0' + time.seconds;
    document.getElementById("timer-minutes").innerHTML = '0' + time.minutes + ':';
    document.getElementById("timer-hours").innerHTML = '0' + time.hours + ':';
    time.total = 0;
    cat.style.left = "-90px"
    localStorage.setItem("time", JSON.stringify(time))
    console.log(4)
    document.getElementById("anime_girl_img").src = "./img/anime1-transformed.png";
});
// delete localStorage["Ключ"]
