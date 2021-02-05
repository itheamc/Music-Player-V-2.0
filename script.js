const main_div = document.getElementById("main_div");
const music_player_div = document.getElementById("music_player_div");

const progress_bar = document.getElementById("progress_bar");
const progress_line = document.getElementById("progress");
const progress_circle = document.getElementById("progress_circle");

const image = document.getElementById("cover_image");
const current_time = document.getElementById("mucic_current_time");
const total_duration = document.getElementById("music_total_duration");
const play = document.getElementById("play_div");
const next = document.getElementById("forward");
const previous = document.getElementById("backward");
const music = document.getElementById("music");
const play_pause_icon = document.getElementById("play");

total_duration.innerHTML = "0:00";

const loadMusic = function() {
    music.setAttribute("src", "music/libaas.mp3");
    image.setAttribute("src", "image/awaara.jpg");
}

loadMusic();

let isPlaying = false;
const playNow = function() {
    isPlaying = true;
    music.play();
    image.classList.add("rotating_anim");
    music_player_div.classList.add("flash_animation");
    main_div.classList.remove("box_shadow");
    play_pause_icon.classList.replace("fa-play", "fa-pause");

}

const pauseNow = function() {
    isPlaying = false;
    music.pause();
    image.classList.remove("rotating_anim");
    music_player_div.classList.remove("flash_animation");
    main_div.classList.add("box_shadow");
    play_pause_icon.classList.replace("fa-pause", "fa-play");
}

const musicFunction = function() {
    isPlaying ? pauseNow() : playNow();
}

play.addEventListener('click', musicFunction);

// Some Variable
let musicDur = 0;
const updateCurrentTime = (currentTime) => {
    let tempMin = Math.floor(currentTime/60);
    let tempSec = Math.floor(currentTime % 60);
    if(tempSec < 10) {
        tempSec = `0${tempSec}`;
    }
    current_time.textContent = `${tempMin}:${tempSec}`;
}

const setDuration = (t) => {
    musicDur = t;
    let duration_min = Math.floor(t/60);
    let duration_sec = Math.floor(t % 60);
    total_duration.textContent = `${duration_min}:${duration_sec}`;

}

// updating progress
const updateProgress = (cur_t, dur) => {
    const progress_width = progress_bar.clientWidth;
    let clicked_at = (progress_width * cur_t) / dur;
    let translation_x_per = ((clicked_at - 8.5) / 15) * 100;
    progress_line.style.width = `${(cur_t / dur) * 100}%`;
    progress_circle.style.transform = `translateX(${translation_x_per}%)`;
}

music.addEventListener('timeupdate', (event) => {

    const {currentTime, duration} = event.target;
    if(duration) {
        setDuration(duration)
    }
    updateCurrentTime(currentTime);
    updateProgress(currentTime, duration);
    if(currentTime === duration) {
        pauseNow();
    }
});


progress_bar.addEventListener('click', (event) => {
    const maxOffsetX = progress_bar.clientWidth;
    // console.log(progress_bar.offsetWidth);
    const clickedAt = event.offsetX;
    music.currentTime = (clickedAt / maxOffsetX) * musicDur;
});