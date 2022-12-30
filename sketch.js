// Project Title
// Kati Kesur
// Novmeber 17, 2022

// used to code ghost movement https://www.todayifoundout.com/index.php/2015/10/ghosts-pac-man-work/#:~:text=Although%20the%20ghosts%20can%20sometimes,turn%20and%20then%20continue%20moving.
  
// class definition
// class Pellet {
//   constructor(x, y, eaten){
//     this.x = x;
//     this.y = y;
//     this.eaten = eaten;     
//   }

//   display(){
//     circle(this.x, this.y, 6);
//     fill("white");
//   }
// }

// defining variables
let B = 2;

let grid = [
  [B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B],
  [B, 0, 0, 0, 0, B, 0, 0, 0, 0, 0, 0, 0, 0, B, 0, 0, 0, 0, B],
  [B, 0, B, B, 0, B, 0, B, B, B, B, B, B, 0, B, 0, B, B, 0, B],
  [B, 0, B, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, B, 0, B],
  [B, 0, B, 0, B, B, 0, B, B, 1, 1, B, B, 0, B, B, 0, B, 0, B],
  [0, 0, 0, 0, 0, 0, 0, B, 1, 1, 1, 1, B, 0, 0, 0, 0, 0, 0, 0],
  [B, 0, B, 0, B, B, 0, B, B, B, B, B, B, 0, B, B, 0, B, 0, B],
  [B, 0, B, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, B, 0, B],
  [B, 0, B, B, 0, B, 0, B, B, B, B, B, B, 0, B, 0, B, B, 0, B],
  [B, 0, 0, 0, 0, B, 0, 0, 0, 0, 0, 0, 0, 0, B, 0, 0, 0, 0, B],
  [B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B]];

let blockWidth;
let blockHeight;
let pacD;
let pacX;
let pacY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pacX = windowWidth/2;
  pacY = windowHeight/2;
  pacD = windowHeight/14;
}

function draw() {
  displayGrid(grid);
  move();
  showPac();
  moveWhenSide();
}

function displayGrid(grid) {
  blockWidth = width / grid[0].length;
  blockHeight = height / grid.length;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 0) {
        fill("black");
        rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
        fill("white");
        rect(x, y, 5, 5);
      }
      else if (grid[y][x] === B) {
        fill("blue");
        rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if(grid[y][x] === 1){
        fill("black");
        rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
    }
  }
}

function move(){
  let nextX = pacX;
  let nextY = pacY;

  // checking if pac is going to run into a wall
 if (keyCode === UP_ARROW && pacX !== 0) {  
    if(pacY - 3 !== B)
    // move up
    nextY-= 3;
  }
  // checking if pac is going to run into a wall
  else if (keyCode === DOWN_ARROW) {
    nextY+= 3;
  }
  // checking if pac is going to run into a wall
  else if (keyCode === RIGHT_ARROW) {
    //move
    nextX+=3;
  }
  // checking if pac is going to run into a wall
  else if (keyCode === LEFT_ARROW) {
    nextX-=3 ;
  }

  if (grid[nextY][nextX] === B){
    pacX = nextX;
    pacY = nextY;
  }
  
}

function showPac(){
  fill("yellow");
  circle(pacX, pacY, pacD);
}


// Moves Pac to the other side when he takes the path
function moveWhenSide(){
  if (pacX > blockWidth * 20 && keyCode === RIGHT_ARROW){
    pacX = 0;

  }
  if (pacX < 1 && keyCode === LEFT_ARROW){
    pacX = width;
  }
}

// // checking if the ghost won
// function ghostWin(){
//   if(ghostX === pacX && ghostY === pacY){
//     background(ghostWinImg);
//   }
// }