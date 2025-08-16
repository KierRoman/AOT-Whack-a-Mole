const board = document.querySelector("#board");
const scoreEl = document.querySelector("#score");
const topEl = document.querySelector("h1");
const help = document.querySelector("#help");
let startEl = document.querySelector("#start");
const ticToc = document.querySelector("#timer");
let resetEl = document.querySelector("#reset");
let highscoreEl = document.getElementById("highscores");
let score = 0;
let thisTitan;
let titanInterval, scoutInterval;
let thisScout;
const clock = 2;
let time = clock * 60;
let erenRoar;
let helpWdw;
let isHovering = false;

startEl.addEventListener("click", () => {
  document.getElementById("music").play();
  document.getElementById("music").volume = 0.1;
  help.style.display = "none";
  startEl.style.display = "none";
  highscoreEl.style.display = "none";
  game();
  runTime();
});
help.addEventListener("mouseover", () => {
  if (topEl.innerText == "GAME OVER!" || startEl.style.display == "none") {
    return;
  }
  if (startEl) {
    startEl.style.display = "none";
  }

  if (!erenRoar) {
    erenRoar = new Audio("titan_eren_roar.mp3");
    erenRoar.volume = 0.1;
    erenRoar.play();
  }

  if (!helpWdw) {
    helpWdw = document.createElement("img");
    helpWdw.src = "Titan Rules.png";
    helpWdw.alt = "Rules of the game";
    helpWdw.style.pointerEvents = "auto";
    helpWdw.style.display = "block";
    help.appendChild(helpWdw);

    helpWdw.addEventListener("mouseenter", () => {
      isHovering = true;
    });

    helpWdw.addEventListener("mouseleave", () => {
      isHovering = false;
      setTimeout(stopRoarIfNotHovering, 100);
    });
  } else {
    helpWdw.style.display = "block";
  }

  isHovering = true;
});

help.addEventListener("mouseleave", () => {
  isHovering = false;
  setTimeout(stopRoarIfNotHovering, 100);
});

let stopRoarIfNotHovering = () => {
  if (!isHovering) {
    if (erenRoar) {
      erenRoar.pause();
      erenRoar.currentTime = 0;
      erenRoar = null;
    }
    if (helpWdw) {
      helpWdw.style.display = "none";
    }

    if (startEl && startEl.style.display === "none") {
      startEl.style.display = "block";
    }
  }
};

let game = () => {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let hole = document.createElement("div");
    hole.id = i.toString();
    board.appendChild(hole);
  }

  titanInterval = setInterval(popTitan, 1000);
  scoutInterval = setInterval(popScout, 1750);

  setInterval(checkDifficulty, 1000);
};

let checkDifficulty = () => {
  if (score >= 400 || time < 20) {
    clearInterval(titanInterval);
    clearInterval(scoutInterval);
    titanInterval = setInterval(popTitan, 400);
    scoutInterval = setInterval(popScout, 350);
  } else if (score >= 250 || time < 60) {
    clearInterval(titanInterval);
    clearInterval(scoutInterval);
    titanInterval = setInterval(popTitan, 500);
    scoutInterval = setInterval(popScout, 400);
  } else if (score >= 150) {
    clearInterval(titanInterval);
    clearInterval(scoutInterval);
    titanInterval = setInterval(popTitan, 550);
    scoutInterval = setInterval(popScout, 650);
  }
};

let randomHole = () => {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
};

let popTitan = () => {
  if (topEl.innerText == "GAME OVER!") {
    return;
  }
  if (thisTitan) {
    thisTitan.innerHTML = "";
  }
  let titan = document.createElement("img");
  titan.src = "Reiner.png";
  titan.alt = "The Armored Titan(AOT)";

  let num = randomHole();

  if (thisScout && thisScout.id == num) {
    return;
  }
  thisTitan = document.getElementById(num);
  titan.addEventListener("click", () => {
    score += 10;
    scoreEl.innerHTML = score;
    titan.style.display = "none";
  });
  thisTitan.appendChild(titan);
};

let popScout = () => {
  if (topEl.innerText == "GAME OVER!") {
    return;
  }
  if (thisScout) {
    thisScout.innerHTML = "";
  }
  let scout = document.createElement("img");
  scout.src = "25-257517_a-o-t-attack-on-titan-png.png";
  scout.alt = "Levi Ackerman(AOT)";

  let num = randomHole();

  if (thisTitan && thisTitan.id == num) {
    return;
  }
  thisScout = document.getElementById(num);
  scout.addEventListener("click", () => {
    const sadMusic = new Audio("SadAOT.mp3");
    sadMusic.volume = 0.1;
    sadMusic.loop = true;
    sadMusic.play();
    const bgMusic = document.getElementById("music");
    bgMusic.pause();
    bgMusic.currentTime = 0;
    topEl.innerHTML = "GAME OVER!";
  });
  thisScout.appendChild(scout);
};

let runTime = () => {
  let run = setInterval(watch, 1000);
  function watch() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    ticToc.innerHTML = `${minutes}:${seconds}`;
    time--;
    if (time < 0 || topEl.innerHTML === "GAME OVER!") {
      clearInterval(run);
      ticToc.style.display = "none";
      topEl.innerHTML = "GAME OVER!";
      resetEl.style.visibility = "visible";

      const highScores = getHighScores();
      const lowestHighScore = highScores[highscoreCount - 1]?.score ?? 0;

      if (score > lowestHighScore || highScores.length < highscoreCount) {
      const scoreModal = document.getElementById("scoreInputModal");
      scoreModal.style.display = "flex";

      document.getElementById("playerName").focus();
      } else {
        renderHighscores();
        highscoreEl.style.display = "block";
      }

      const sadMusic = new Audio("SadAOT.mp3");
      sadMusic.volume = 0.1;
      sadMusic.loop = true;
      sadMusic.play();
      document.getElementById("music").volume = 0;
    }
  }
};

resetEl.addEventListener("click", () => {
  location.reload(); // Simple way to restart the game
});

// Lets log highscores...///

const highscoreCount = 3;

let getHighScores = () => {
  const scores = localStorage.getItem("highscores");
  return scores ? JSON.parse(scores) : [];
};

let saveHighScores = (scores) => {
  localStorage.setItem("highscores", JSON.stringify(scores));
};

let submitScore = (name, score) => {
  const newScore = { name, score };
  const highScores = getHighScores();

  if (score > 0) {

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    
    const trimmedScores = highScores.slice(0, highscoreCount);
    
    saveHighScores(trimmedScores);
    renderHighscores();
  }
};

document.getElementById("submitScoreBtn").addEventListener("click", () => {
  const nameInput = document.getElementById("playerName");
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter your name!")
    return;
  }

  submitScore(name, score);

  document.getElementById('scoreInputModal').style.display = "none";
  nameInput.value = "";

  document.getElementById("highscores").style.display = 'block';

})


let renderHighscores = () => {
  const highScores = getHighScores();
  const scoreboard = document.getElementById("highscores");
  scoreboard.innerHTML = `
  <h3>🏆 High Scores</h3>
  <ol>
  ${highScores.map((s) => `<li>${s.name}: ${s.score}</li>`).join("")}
  </ol>
  `;
};
renderHighscores();



// <----------------------------------------CODE GRAVEYARD---------------------------------------->
// Thoughts of a timer being added???
