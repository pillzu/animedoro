const loading_page = document.querySelector(".load");
const main = document.querySelector(".main");
const about_link = document.querySelector(".about-link");
const about = document.querySelector(".about");
const back_button = document.querySelector(".back");
const timer_place = document.querySelector("#time");
const next_episode = document.querySelector("#nxt_time");
const play_pause = document.querySelector("#play");
const stop = document.querySelector("#stop");
const bar = document.querySelector("#val");
const extra_time = document.querySelector("#extra_time");
const audio = new Audio("./assets/ended.mp3");
const playlist = document.querySelector("#playlist");

function UX() {
  let timer, blink;
  function changeTimeUI(time) {
    let time_left = new Date(null);
    time_left.setTime(seconds * 1000);
    let time_left_str = time_left.toISOString().substr(14, 5);
    timer_place.innerHTML = time_left_str;
  }
  function nextEpisode(time) {
    let curr_time = new Date();
    let next_time = new Date(curr_time.getTime() + time * 1000);
    let next_time_str = next_time.toString().substr(16, 5);
    next_episode.innerHTML = next_time_str;
  }
  function init_time() {
    return 37 * 60;
  }
  function progress_bar(seconds, total) {
    let time_bar = 570 - (seconds / total) * 570;
    bar.style.strokeDashoffset = time_bar;
  }
  function timer_ended(seconds) {
    if (seconds == 0) {
      audio.play();
      play_pause.src = "./assets/img/int_icon/Play.png";
      clearInterval(timer);
      blink = setInterval(() => {
        let visiblity = timer_place.style.visibility;
        timer_place.style.visibility =
          visiblity == "visible" ? "hidden" : "visible";
      }, 400);
    }
  }
  let total = init_time();
  let seconds = total;
  nextEpisode(seconds);
  changeTimeUI(seconds);
  play_pause.addEventListener("click", () => {
    if (play_pause.dataset.playing == 0) {
      nextEpisode(seconds);
      play_pause.src = "./assets/img/int_icon/Pause.png";
      play_pause.dataset.playing = 1;
      timer = setInterval(() => {
        seconds -= 1;
        progress_bar(seconds, total);
        changeTimeUI(seconds);
        timer_ended(seconds);
      }, 1000);
    } else {
      play_pause.src = "./assets/img/int_icon/Play.png";
      play_pause.dataset.playing = 0;
      clearInterval(timer);
    }
  });
  extra_time.addEventListener("click", () => {
    if (seconds + 300 > 3600) {
      alert(
        "Try Focussing for 1 hr only, anything more can hamper your ability to focus! Let's stick to 57 minutes for now"
      );
    } else {
      seconds += 300;
      total += 300;
      changeTimeUI(seconds);
      nextEpisode(seconds);
    }
  });

  stop.addEventListener("click", () => {
    clearInterval(timer);
    timer_place.style.visibility = "visible";
    total = init_time();
    seconds = init_time();
    play_pause.src = "./assets/img/int_icon/Play.png";
    audio.pause();
    progress_bar(seconds, total);
    audio.currentTime = 0;
    changeTimeUI(seconds);
    clearInterval(blink);
  });
  playlist.addEventListener("click", () => {
    window.open(
      "https://open.spotify.com/playlist/37i9dQZF1DX7EF8wVxBVhG?si=J3mz7IKwTFGvwQDO1lwEEg"
    );
  });
}

function UI() {
  window.onload = () => {
    window.setTimeout(() => {
      loading_page.classList.add("fade-out");
      main.classList.add("fade-in");
      main.style.visibility = "unset";
      document.location.href = "#";
      window.setTimeout(() => {
        loading_page.style.display = "none";
      }, 500);
    }, 5000);
  };

  about_link.addEventListener("click", () => {
    if (about.classList.contains("slide-out")) {
      about.classList.toggle("slide-out");
    }
    about.style.visibility = "unset";
    about.style.display = "flex";
    about.classList.toggle("slide-in");
    window.setTimeout(() => {
      main.style.display = "none";
    }, 500);
  });

  back_button.addEventListener("click", () => {
    main.style.display = "unset";
    about.classList.toggle("slide-in");
    about.classList.toggle("slide-out");
    window.setTimeout(() => {
      about.style.display = "none";
    }, 400);
  });
}

UI();
UX();
