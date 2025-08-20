const DISCORD_ID = "442048154800488448"; // <--- HIER DEINE DISCORD USER ID EINTRAGEN

async function loadDiscord() {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
  const { data } = await res.json();

  document.getElementById("discord-username").innerText =
    data.discord_user.username + "#" + data.discord_user.discriminator;

  document.getElementById("discord-avatar").src =
    `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;

  document.getElementById("discord-status").innerText = "Status: " + data.discord_status;
}

loadDiscord();

// Audio Player
let isPlaying = false;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");

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
