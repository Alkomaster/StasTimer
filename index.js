let time = JSON.parse(localStorage.getItem("time")) || {
    seconds: 0,
    minutes: 0, 
    hours: 0,
};

let acheievements = JSON.parse(localStorage.getItem("achievements")) || {
    my: [],
};

let catPhrase = {
    total: time.seconds + time.minutes * 60 + time.hours * 3600,
    phrases : {
        "300": "Ты реально сел за это, молодец!",
        "600": "Давай, продолжай в том же духе",
        "1800": "Уже полчаса продуктивной работы, так держать!",
        "3600": "ТЫ ЗАНИМАЕШЬСЯ УЖЕ ЧАС, АМОГУС КРУТЫШКА!!!",
        "5400": "Полтора часа, неплохо, держишь темп",
        "7200": "Продолжай в том же духе, буб",
        "10800": "Не может быть, что б ты столько работал, нубик",
        "14400": "Ты меня пугаешь, иди отдохни",
        "18000": "Нубик, иди спать, быстро, ты ж так помрешь"
    }
};


let play = false;
let timeout = false;

let complimentFlag = false;
let modalFlag = false;


function dell(i){
    acheievements.my.splice(i, 1);
    localStorage.setItem("achievements", JSON.stringify(acheievements));
    achAppend(acheievements.my);
}

function achAppend(array){
    if (array.length === 0){
        document.getElementById("achievements").innerHTML = `<h3 style="text-align: center";>У вас пока нет достижений(</h3>`
    }
    else{
        document.getElementById("achievements").innerHTML = '';
        for(let i = 0; i < array.length; i++){
            let p = document.createElement("p");
            p.innerHTML = `${i+1}. ${array[i].trim()} <button id="delete_achieve" onclick="dell(${i})"><img src="./img/trash.svg"></button>`;
            p.classList.add('task-list-achievement');
            document.getElementById("achievements").append(p);
        }
    }
}




document.body.addEventListener("click", () => {
    if ((modalFlag) && (event.target.id != "timer_add") && (event.target.closest("#modal_container") == null)){
        document.getElementById("modal").style.display = "none";
        modalFlag = false;
    }
    if ((complimentFlag) && (event.target.id != "compliment") && (event.target.closest("#complimet_modal_container") == null)){
        document.getElementById("complimet_modal").classList.remove("compliment-modal")
        complimentFlag = false;
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

document.getElementById("timer_add").addEventListener("click", () => {document.getElementById("modal").style.display = "flex"; modalFlag = true;})

document.getElementById("timer-play").addEventListener("click", () => {
    if (play === false){
        document.getElementById("anime_girl_img").src = "./img/anime2-transformed.png";
        play = true;
        playEvent = setInterval(() => {
            catPhrase.total++;
            if (Object.keys(catPhrase.phrases).includes(`${catPhrase.total}`)){
                document.getElementById("phrase").style.visibility="visible";
                document.getElementById("phrase").innerHTML = catPhrase.phrases[catPhrase.total];
                setTimeout(() => {document.getElementById("phrase").style.visibility="hidden";}, 10000);
            } 
            if (time.seconds == 59){
                time.seconds = 0;
                document.getElementById("timer-seconds").innerHTML = '0' + time.seconds;
                if (time.minutes == 59){
                    time.minutes = 0;
                    document.getElementById("timer-minutes").innerHTML = '0' + time.minutes + ':';
                    time.hours++;
                    document.getElementById("timer-hours").innerHTML = time.hours < 10 ? '0' + time.hours + ':' : time.hours + ':';
                }
                else{
                    time.minutes++;
                    document.getElementById("timer-minutes").innerHTML = time.minutes < 10 ? '0' + time.minutes + ':' : time.minutes + ':';
                }
            }
            else{
                time.seconds++;
                document.getElementById("timer-seconds").innerHTML = time.seconds < 10 ? '0' + time.seconds : time.seconds;
            }
            
            localStorage.setItem("time", JSON.stringify(time))
            cat.style.left = -90 + (catPhrase.total % 3600) * ((window.innerWidth - 140) / 3600) + "px";
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
    catPhrase.total = 0;
    cat.style.left = "-90px"
    localStorage.setItem("time", JSON.stringify(time))
    document.getElementById("anime_girl_img").src = "./img/anime1-transformed.png";
});

document.getElementById("compliment").addEventListener("click", () => {
    document.getElementById("complimet_modal").classList.add("compliment-modal");
    complimentFlag = true;
})



achAppend(acheievements.my);

document.getElementById("timer-seconds").innerHTML = time.seconds < 10 ? '0' + time.seconds : time.seconds;
document.getElementById("timer-minutes").innerHTML = time.minutes < 10 ? '0' + time.minutes + ':' : time.minutes + ':';
document.getElementById("timer-hours").innerHTML = time.hours < 10 ? '0' + time.hours + ':' : time.hours + ':';



const cat = document.getElementById("cat")
cat.style.left = -90 + (catPhrase.total % 3600) * (window.innerWidth / 3600) + "px";





// delete localStorage["Ключ"]
