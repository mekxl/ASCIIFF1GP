const gameElement = document.getElementById("game");

const largura = 40;
const altura = 20;
let pista = [];
let jogadorX = Math.floor(largura / 2);
let posicaoY = altura - 2;
let pistaPronta = false;
let podeMover = false;

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

function desenharJogo() {
  if (!pistaPronta) return;

  const copia = pista.slice(); // cópia da pista
  const linha = copia[posicaoY].split("");
  linha[jogadorX] = "^"; // carro do jogador
  copia[posicaoY] = linha.join("");

  gameElement.textContent = copia.join("\n");
}

function moverJogador(dx) {
  if (!podeMover) return;

  jogadorX += dx;
  if (jogadorX < 0) jogadorX = 0;
  if (jogadorX >= largura) jogadorX = largura - 1;
  desenharJogo();
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moverJogador(-1);
  if (event.key === "ArrowRight") moverJogador(1);
});

// Sequência de luzes de largada estilo F1
function iniciarLargada() {
  let luzes = 0;
  const totalLuzes = 5;

  function mostrarLuzes() {
    luzes++;
    const luzesAtuais = Array(luzes).fill("🔴").join(" ");
    gameElement.textContent = "\n\n     LARGADA F1\n\n     " + luzesAtuais;

    if (luzes < totalLuzes) {
      setTimeout(mostrarLuzes, 1000);
    } else {
      setTimeout(() => {
        gameElement.textContent = "\n\n     LARGADA F1\n\n     🟢 VAI!!!";
        podeMover = true;
        setTimeout(() => {
          desenharPista();
          desenharJogo();
        }, 1000);
      }, 1000);
    }
  }

  mostrarLuzes();
}

// Início do jogo
iniciarLargada();
