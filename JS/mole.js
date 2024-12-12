const board = document.querySelector('#board')
const scoreEl = document.querySelector('#score')
const help = document.querySelector('#help')
let thisTitan;

window.onload = function(){
    popUp();
}

const popUp = () => {
    for (let i = 0; i < 9; i++){
        let hole = document.createElement('div');
        hole.id = i.toString();
        document.getElementById('board').appendChild(hole)
    }
    setInterval(, 1000)
}

const randomHole = () => {
    let num = Math.floor(Math.random()* 9);
    return num.toString();
}



const popTitan = () => {
    let titan = document.createElement('img');
    titan.src = 'Uggo-Titan.png';

    let num = randomHole();
    thisTitan = document.getElementById(num);
    thisTitan.appendChild(titan)
}

//Try to start game with page load...

// function time() {
//     c
// }