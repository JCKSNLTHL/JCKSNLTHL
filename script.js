const DISCORD_ID = "442048154800488448";

async function loadDiscord() {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
  const data = await res.json();

  if (!data.success) {
    document.getElementById("name").innerText = "Fehler beim Laden";
    return;
  }

  const user = data.data.discord_user;
  const avatar = user.avatar;

  // Prüfen ob animiert (fängt mit "a_" an)
  let avatarUrl = "";
  if (avatar.startsWith("a_")) {
    avatarUrl = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${avatar}.gif?size=256`;
  } else {
    avatarUrl = `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${avatar}.png?size=256`;
  }

  document.getElementById("avatar").src = avatarUrl;
  document.getElementById("name").innerText = `${user.username}#${user.discriminator}`;
  document.getElementById("status").innerText = data.data.discord_status;
}

loadDiscord();
