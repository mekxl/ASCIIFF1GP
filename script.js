const trackElement = document.getElementById("game");

const INTERLAGOS_TRACK = [
  "                   ||                   ",
  "                   ||                   ",
  "                  /  \\                  ",
  "                 |    |                 ",
  "                 |    |                 ",
  "                /      \\                ",
  "               |        |               ",
  "              |          |              ",
  "              |          |              ",
  "              \\          /              ",
  "               \\        /               ",
  "                \\      /                ",
  "                 |    |                 ",
  "                 |    |                 ",
  "                  \\  /                  ",
  "                   ||                   ",
  "                   ||                   ",
  "                   ||                   ",
  "                   ||                   ",
  "                   ||                   ",
];

let playerPosition = { x: 20, y: 18 };
let lapCount = 0;
let raceStarted = false;

function renderTrack(track, playerPos) {
  const output = track.map((line, y) => {
    if (y === playerPos.y) {
      return line.substring(0, playerPos.x) + "^" + line.substring(playerPos.x + 1);
    }
    return line;
  });
  trackElement.textContent = output.join("\n");
}

function renderStartLights(step) {
  const lights = ["🔴", "🔴", "🔴", "🔴", "🔴"];
  let output = "\n\n\n";
  output += "    " + lights.map((l, i) => (i < step ? l : "⚫")).join(" ") + "\n";
  output += "\nPREPARE-SE...\n";
  trackElement.textContent = output;
}

function startRace() {
  raceStarted = true;
  renderTrack(INTERLAGOS_TRACK, playerPosition);
}

function showLightsAndStartRace() {
  let step = 0;
  const interval = setInterval(() => {
    step++;
    renderStartLights(step);
    if (step >= 5) {
      clearInterval(interval);
      setTimeout(startRace, 1000);
    }
  }, 800);
}

renderTrack(INTERLAGOS_TRACK, playerPosition);
setTimeout(showLightsAndStartRace, 2000);
