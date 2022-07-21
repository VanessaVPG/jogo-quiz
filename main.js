const personagem = document.querySelector('.personagem');
const background = document.querySelector('.background');
let position = 0;
let isGameOver =false;
let isJumping = false;


function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}
function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
       //Descendo
      clearInterval(upInterval);
     
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          personagem.style.bottom = position + "px";
        }
      }, 20);
    }else
    //Subindo
     position += 20;
    personagem.style.bottom = position + "px";
  }, 20);
}

function criarBarril() {
  const barril = document.createElement('div');
  let barrilPosicao = 1000;
  let randomTime = Math.random() * 6000 ;

  if (isGameOver) return;

  barril.classList.add('barril');
  background.appendChild(barril);
  barril.style.left = barrilPosicao + 'px';

  let leftInterval = setInterval(() => {
    //para aumentar a complexidade/velocidade, é aqui que mexeremos.

    if (barrilPosicao < -60) {
      clearInterval(leftInterval);
      background.removeChild(barril);
    } else if(barrilPosicao > 0 && barrilPosicao < 60 && position < 60){
      //GameOver
      clearInterval(leftInterval);
      isGameOver = true;
      document.body.innerHTML = "<h1 class ='game-over'>Fim de jogo...Temos algumas perguntas para você!</h1>,<a class='clicar' href='quiz.html'>Não clique aqui!!!!!</a>"; 

    }else
     {
      barrilPosicao -= 10;
      barril.style.left = barrilPosicao + "px";
    }
  }, 20);
  setTimeout(criarBarril, randomTime);
}
criarBarril();
document.addEventListener("keyup", handleKeyUp);


