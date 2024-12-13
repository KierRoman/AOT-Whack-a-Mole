const board = document.querySelector('#board');
const scoreEl = document.querySelector('#score');
const topEl = document.querySelector('h1')
const help = document.querySelector('#help');
let startEl = document.querySelector('#start')
let score = 0;
// let time = 60;
let thisTitan;
let thisScout;

startEl.addEventListener('click', () => {
    startEl.style.display = 'none';
    game();
})
// window.onload = function () {
//     game();
// console.log(startEl)
// }

let game = () => {
    for (let i = 0; i < 9; i++) {
        let hole = document.createElement('div');
        hole.id = i.toString();
        document.querySelector('#board').appendChild(hole);
    }
    // setInterval(timer, )
    setInterval(popTitan, 1500);
    setInterval(popScout, 2200);
}

let randomHole = () => {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}


let popTitan = () => {
    if (topEl.innerText == 'GAME OVER!') {
        return;
    }
    if (thisTitan) {
        thisTitan.innerHTML = '';
    }
    let titan = document.createElement('img');
    titan.src = 'Uggo-Titan.png';

    let num = randomHole();

    if (thisScout && thisScout.id == num) {
        return;
    }
    thisTitan = document.getElementById(num);
    titan.addEventListener('click', () => {
        score += 10
        scoreEl.innerHTML = score
    })
    thisTitan.appendChild(titan);
}

let popScout = () => {
    if (topEl.innerText == 'GAME OVER!') {
        return;
    }
    if (thisScout) {
        thisScout.innerHTML = '';
    }
    let scout = document.createElement('img');
    scout.src = 'Mikasa.png';

    let num = randomHole();

    if (thisTitan && thisTitan.id == num) {
        return;
    }
    thisScout = document.getElementById(num);
    scout.addEventListener('click', () => {
        topEl.innerHTML = 'GAME OVER!'
    })
    thisScout.appendChild(scout);

}
let helpMe = () => { }
