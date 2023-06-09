let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

let squares = [
  0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375,
  400, 425, 450, 475,
];
let a_x;
let a_y;
let p_x;
let p_y;

let ex_p = [];

let dirc = "up";
let loopcount = 0;
let score = 2;
let p_size = 25;
let g_size = 20;
let tik = 300;

drawApple();
function drawApple(mode) {
  a_x = squares.sample();
  a_y = squares.sample();
  context.beginPath();
  context.rect(a_x, a_y, p_size, p_size);
  context.fillStyle = "#ff0000";
  context.closePath();
  context.fill();
  if (mode ==  true){
    drawPlayerstart();
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

let p_x_pos = [];
let p_y_pos = [];

/////////////// Button ///////////////
document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) {
    if (dirc != "right") {
      dirc = "left";
      if (p_x < 0) {
        p_x = 475;
      }
    }
  } else if (event.keyCode == 38) {
    if (dirc != "down") {
      dirc = "up";
      if (p_y < 0) {
        p_y = 475;
      }
    }
  } else if (event.keyCode == 39) {
    if (dirc != "left") {
      dirc = "right";
      if (p_x > 475) {
        p_x = 0;
      }
    }
  } else if (event.keyCode == 40) {
    if (dirc != "up") {
      dirc = "down";
      if (p_y > 475) {
        p_y = 0;
      }
    }
  }
  document.getElementById("dirc").innerHTML = "Direction: " + dirc;
});

/////////////// Timer ///////////////
setInterval(function () {
  if (dirc == "left") {
    p_x += - p_size;
    if (p_x < 0) {
      p_x = 475;
    }
  } else if (dirc == "up") {
    p_y += - p_size;
    if (p_y < 0) {
      p_y = 475;
    }
  } else if (dirc == "right") {
    p_x += p_size;
    if (p_x > 475) {
      p_x = 0;
    }
  } else if (dirc == "down") {
    p_y += p_size;
    if (p_y > 475) {
      p_y = 0;
    }
  }

  
  document.getElementById("dirc").innerHTML = "Direction: " + dirc;
  context.clearRect(0, 0, p_size * g_size, p_size * g_size);
  // drawApple
  context.beginPath();
  context.rect(a_x, a_y, p_size, p_size);
  context.fillStyle = "#ff0000";
  context.closePath();
  context.fill();
  // drawPlayer
  if (p_x == a_x && p_y == a_y) {
    score++;
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
  console.log(p_x_pos);
  for (let i = 0; i < score; i++) {
    if (p_x_pos[p_x_pos.length - 2 - i] == p_x && p_y_pos[p_y_pos.length - 2 - i] == p_y) {
      location.reload;
    }
    context.beginPath();
    context.rect(p_x_pos[p_x_pos.length - 1 - i], p_y_pos[p_y_pos.length - 1 - i], p_size, p_size);
    context.fillStyle = i % 2 ? "#00de00" : "hotpink";
    context.closePath();
    context.fill();
  }

}, tik);
