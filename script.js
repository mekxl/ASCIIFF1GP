const gameElement = document.getElementById("game");

const largura = 40;
const altura = 20;
let pista = [];
let jogadorX = Math.floor(largura / 2);
let voltasTotais = 5;
let voltasCompletas = 0;
let pistaDesenhada = false;
let posicaoY = altura - 2; // onde o jogador aparece
let pistaPronta = false;

// Traçado simplificado da pista de Interlagos em ASCII (top-down)
const interlagos = [
  "          ||          ",
  "          ||          ",
  "         /  \\         ",
  "        |    |        ",
  "        |    |        ",
  "       /      \\       ",
  "      |        |      ",
  "     |          |     ",
  "     |          |     ",
  "     \\          /     ",
  "      \\        /      ",
  "       \\      /       ",
  "        |    |        ",
  "        |    |        ",
  "         \\  /         ",
  "          ||          ",
  "          ||          ",
  "          ||          ",
  "          ||          ",
  "          ||          "
];

function desenharPista() {
  pista = interlagos.map((linha) => {
    const linhaCompleta = linha.padStart((largura - linha.length) / 2 + linha.length, " ");
    return linhaCompleta.padEnd(largura, " ");
  });
  pistaPronta = true;
}

// Desenha o jogador no meio da pista
function desenharJogo() {
  if (!pistaPronta) return;

  const copia = pista.slice(); // cópia da pista
  const linha = copia[posicaoY].split("");
  linha[jogadorX] = "^"; // símbolo do carro do jogador
  copia[posicaoY] = linha.join("");

  gameElement.textContent = copia.join("\n");
}

function moverJogador(dx) {
  jogadorX += dx;
  if (jogadorX < 0) jogadorX = 0;
  if (jogadorX >= largura) jogadorX = largura - 1;
  desenharJogo();
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moverJogador(-1);
  if (event.key === "ArrowRight") moverJogador(1);
});

// Inicia o jogo
desenharPista();
desenharJogo();
