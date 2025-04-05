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
let opponents = [
  { x: 15, y: 5, direction: 1 }, // Carro 1
  { x: 25, y: 10, direction: -1 }, // Carro 2
];

function renderTrack(track, playerPos) {
  const output = track.map((line, y) => {
    if (y === playerPos.y) {
      return line.substring(0, playerPos.x) + "^" + line.substring(playerPos.x + 1);
    }
    return line;
  });

  // Desenhar os adversários
  opponents.forEach(opponent => {
    if (opponent.y < track.length) {
      const line = output[opponent.y].split("");
      line[opponent.x] = "A"; // Representa o carro adversário
      output[opponent.y] = line.join("");
    }
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
  lapCount = 1; // Começa a contagem de voltas
  renderTrack(INTERLAGOS_TRACK, playerPosition);
  moveOpponents(); // Inicia o movimento dos adversários
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

function moveOpponents() {
  opponents.forEach(opponent => {
    opponent.x += opponent.direction; // Move o carro adversário
    // Verifica se o carro adversário bateu nas bordas
    if (opponent.x <= 0 || opponent.x >= INTERLAGOS_TRACK[0].length) {
      opponent.direction *= -1; // Inverte a direção
    }
  });
  renderTrack(INTERLAGOS_TRACK, playerPosition);
  if (raceStarted) {
    setTimeout(moveOpponents, 1000); // Move os adversários a cada segundo
  }
}

// Início do jogo
renderTrack(INTERLAGOS_TRACK, playerPosition);
setTimeout(showLightsAndStartRace, 2000);
