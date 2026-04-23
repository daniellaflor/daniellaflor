const mario =document.querySelector('.mario')
const pipe =document.querySelector('.pipe')

// Busca os elementos HTML com as classes mario e pipe
// mario é o personagem que vai pular
// pipe é o obstáculo que vem em direção ao Mario


const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 500);
}

// classList.add('jump'): Aplica uma classe CSS que provavelmente tem uma animação de subir e descer
// setTimeout: Aguarda 500ms (meio segundo) e remove a classe
// Resultado: Mario sobe e desce, simulando um pulo
 
// setInterval: Executa o código repetidamente a cada 10 milissegundos

const loop = setInterval(() => {


    const pipePosition = pipe.offsetLeft;             // Distância do cano em relação à borda esquerda do container
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    console.log(marioPosition);

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './img/game-over.png';
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'
    }

}, 10)

// window.getComputedStyle(mario) : Pega todas as propriedades CSS calculadas do Mario
// .bottom : Pega o valor da propriedade 'bottom' (posição vertical)
// .replace('px', '') : Remove o 'px' deixando só o número (ex: "80px" vira "80")
// + no início : Converte a string para número (ex: "80" vira 80)



document.addEventListener('keydown', jump)