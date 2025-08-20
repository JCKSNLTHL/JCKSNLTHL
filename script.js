const DISCORD_ID = "442048154800488448"; // fest eingetragen

async function loadDiscord() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
    const { data } = await res.json();

    document.getElementById("discord-username").innerText =
      data.discord_user.username + "#" + data.discord_user.discriminator;

    document.getElementById("discord-avatar").src =
      `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;

    const statusEl = document.getElementById("discord-status");
    let statusColor;
    switch(data.discord_status) {
      case "online": statusColor = "#0f0"; break;
      case "idle": statusColor = "#ff0"; break;
      case "dnd": statusColor = "#f00"; break;
      default: statusColor = "#888"; break;
    }
    statusEl.innerText = "Status: " + data.discord_status;
    statusEl.style.color = statusColor;
  } catch (e) {
    console.error("Fehler beim Laden von Discord:", e);
    document.getElementById("discord-status").innerText = "Status nicht verfügbar";
  }
}

loadDiscord();

// Audio Player mit Progressbar
let isPlaying = false;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.innerText = "▶";
  } else {
    audio.play();
    playBtn.innerText = "⏸";
  }
  isPlaying = !isPlaying;
}

audio.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + "%";
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
