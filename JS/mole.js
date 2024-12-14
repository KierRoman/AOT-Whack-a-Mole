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
help.addEventListener('mouseover', () => {
    if (topEl.innerText == 'GAME OVER!') {
        return;
    }
    let helpWdw = document.createElement('img');
    helpWdw.src = 'Titan Rules.png';
    helpWdw.alt = 'Rules of the game';
    help.appendChild(helpWdw);

    help.addEventListener('mouseout', () => {
        helpWdw.style.display = 'none';
    })
})

let game = () => {
    for (let i = 0; i < 9; i++) {
        let hole = document.createElement('div');
        hole.id = i.toString();
        document.querySelector('#board').appendChild(hole);
    }
    // setInterval(timer, )
    setInterval(popTitan, 1000);
    setInterval(popScout, 1750);
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
    titan.src = 'Reiner.png';
    titan.alt = 'The Armored Titan(AOT)';

    let num = randomHole();

    if (thisScout && thisScout.id == num) {
        return;
    }
    thisTitan = document.getElementById(num);
    titan.addEventListener('click', () => {
        score += 10
        scoreEl.innerHTML = score
        titan.style.display = 'none';
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
    scout.src = '25-257517_a-o-t-attack-on-titan-png.png';
    scout.alt = 'Levi Ackerman(AOT)';

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

