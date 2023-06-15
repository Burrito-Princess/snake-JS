let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

let squares = [
  0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375,
  400, 425, 450, 475,
];
let mode_array = [
  "blue",
  "rainbow",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
];
let a_x;
let a_y;
let p_x;
let p_y;

let ex_p = [];

let direc = "up";
let loopcount = 0;
let score = 2;
let p_size = 25;
let g_size = 20;
let tik = 100;
let mode = "normal";
let p_x_pos = [];
let p_y_pos = [];

// tableCreate();
drawApple();

function drawApple(player) {
  if (mode == "rainbow") {
    console.log(mode);
    a_x = squares.sample();
    a_y = squares.sample();
    context.beginPath();
    context.rect(a_x, a_y, p_size, p_size);
    context.fillStyle = "#ff0000";
    context.closePath();
    context.fill();
  } else {
    mode = mode_array.sample();
    console.log(mode);
    a_x = squares.sample();
    a_y = squares.sample();
    context.beginPath();
    context.rect(a_x, a_y, p_size, p_size);
    context.fillStyle = "#ff0000";
    context.closePath();
    context.fill();
  }
  for (let i = 0; i < score; i++){
    if (
    a_x[p_x_pos.length - 2 - i] == p_x &&
    a_y[p_y_pos.length - 2 - i] == p_y
  ) {
    drawApplePause(i)
  }
  function drawApplePause(pause){
    if (pause < score + 5){

    } else {
      drawApple();
    }
  }
  }
  
  if (player == true) {
    drawPlayerStart();
  }
}
drawPlayerStart();

function drawPlayerStart() {
  p_x = squares.sample();
  p_y = squares.sample();
  drawPlayer();
}

function drawPlayer() {
  if (p_x == a_x && p_y == a_y) {
    drawPlayerStart();
  } else {
    context.beginPath();
    context.rect(p_x, p_y, p_size, p_size);
    context.fillStyle = "#00ff00";
    context.closePath();
    context.fill();
  }
}

function reDrawPlayer() {
  context.beginPath();
  context.rect(p_x, p_y, p_size, p_size);
  context.fillStyle = "#00ff00";
  context.closePath();
  context.fill();
}

/////////////// Button ///////////////
document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) {
    if (direc != "right") {
      direc = "left";
      if (p_x < 0) {
        p_x = 475;
      }
    }
  } else if (event.keyCode == 38) {
    if (direc != "down") {
      direc = "up";
      if (p_y < 0) {
        p_y = 475;
      }
    }
  } else if (event.keyCode == 39) {
    if (direc != "left") {
      direc = "right";
      if (p_x > 475) {
        p_x = 0;
      }
    }
  } else if (event.keyCode == 40) {
    if (direc != "up") {
      direc = "down";
      if (p_y > 475) {
        p_y = 0;
      }
    }
  }
  document.getElementById("dirc").innerHTML = "Direction: " + direc;
});
let rainbow_array = ["red", "orange", "yellow", "green", "blue", "purple"];
let colour;
let count = 0;
/////////////// Timer ///////////////
setInterval(timer, tik);
let highscores;
let dataArray = [];
function timer() {
  highscores = getHighscores();
  highscores
    .then((data) => {
      dataArray = data;
      // console.log(dataArray);
      for (let i = 0; i < dataArray.length; i++) {
        // document.getElementById(i).innerHTML = dataArray[i].name;
        // document.getElementById("0_" + i).innerHTML = dataArray[i].score;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  dirc = direc;
  if (mode == "rainbow") {
    count++;
    if (count == 100) {
      mode = "normal";
      count = 0;
    }
  }
  if (dirc == "left") {
    p_x += -p_size;
    if (p_x < 0 && mode != "blue") {
      p_x = 475;
    } else if (mode == "blue" && p_x < 0) {
      gameover();
    }
  } else if (dirc == "up") {
    p_y += -p_size;
    if (p_y < 0 && mode != "blue") {
      p_y = 475;
    } else if (mode == "blue" && p_y < 0) {
      gameover();
    }
  } else if (dirc == "right") {
    p_x += p_size;
    if (p_x > 475 && mode != "blue") {
      p_x = 0;
    } else if (mode == "blue" && p_x > 475) {
      gameover();
    }
  } else if (dirc == "down") {
    p_y += p_size;
    if (p_y > 475 && mode != "blue") {
      p_y = 0;
    } else if (mode == "blue" && p_y > 475) {
      gameover();
    }
  }

  document.getElementById("dirc").innerHTML = "Direction: " + dirc;
  context.clearRect(0, 0, p_size * g_size, p_size * g_size);
  // drawApple
  context.beginPath();
  context.rect(a_x, a_y, p_size, p_size);
  context.fillStyle = "#ffaaaa";
  context.closePath();
  context.fill();
  // drawPlayer
  if (p_x == a_x && p_y == a_y) {
    score++;
    if (mode == "rainbow") {
      score++;
    }
    document.getElementById("score").innerHTML = "Score: " + score;
    drawApple();
  } else {
    context.beginPath();
    context.rect(p_x, p_y, p_size, p_size);
    context.fillStyle = "#00ff00";
    context.closePath();
    context.fill();
  }
  p_x_pos.push(p_x);
  p_y_pos.push(p_y);
  let c = 0;
  for (let i = 0; i < score; i++, c++) {
    if (
      p_x_pos[p_x_pos.length - 2 - i] == p_x &&
      p_y_pos[p_y_pos.length - 2 - i] == p_y
    ) {
      console.log("game-over");
      gameover();
    }
    context.beginPath();
    context.rect(
      p_x_pos[p_x_pos.length - 1 - i],
      p_y_pos[p_y_pos.length - 1 - i],
      p_size,
      p_size
    );

    if (mode == "rainbow") {
      if (c > 5) {
        c = 0;
      }
      context.fillStyle = rainbow_array[c];
    } else if (mode == "normal") {
      context.fillStyle = i % 2 ? "#00de00" : "hotpink";
    } else if (mode == "blue") {
      context.fillStyle = "#0000ff";
    }
    context.closePath();
    context.fill();
  }
}

const setHighscore = async (name, score) => {
  return await fetch("set_highscore.php", {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, score }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
const getHighscores = async () => {
  return await fetch("get_highscore.php", {
    method: "GET",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

function gameover() {
  context.fillStyle = "red";
  context.fillRect(0, 0, 500, 500);
  document.cookie = score;
  alert("game over \nscore: " + score);
  let username = document.getElementById("name").value;
  username = username.toUpperCase();
  setHighscore(username, score);

  score = 2;
  tableCreate();
  drawApple(true);
}

function tableCreate() {
    const body = document.body,
          tbl = document.createElement('table');
    tbl.style.width = '100px';
    tbl.style.border = '1px solid black';
  
    for (let i = 0; i < 6; i++) {
      const tr = tbl.insertRow();
      for (let j = 0; j < 2; j++) {
          const td = tr.insertCell();
          if (j == 0){
            let name = dataArray[i].name;
            td.appendChild(document.createTextNode(name));
          } else if (j == 1){
            let score = dataArray[i].score;
            td.appendChild(document.createTextNode(score));
          }
          
          td.style.border = '1px solid black';
        }
    }
    document.getElementById("leader-board").appendChild(tbl);
    
  }
  

