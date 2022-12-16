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
let pacD = 60;
let pacX;
let pacY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pacX = windowWidth/2;
  pacY = windowHeight/2;
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
  if (keyCode === UP_ARROW) {  
    //move
    pacY-= 3;
  }

  else if (keyCode === DOWN_ARROW) {
    pacY+= 3;
  }

  else if (keyCode === RIGHT_ARROW) {
    //move
    pacX+=3;

  }

  else if (keyCode === LEFT_ARROW) {
    pacX-=3 ;

  }
}

function showPac(){
  fill("yellow");
  circle(pacX, pacY, pacD);
}



// Moves Pac to the other side when he takes the path
function moveWhenSide(){
  // if (pacX >  && keyCode === RIGHT_ARROW){
  //   pacX = 0;
  //   grid[pacY][pacX] = M;
  // }
  if (pacX < 1 && keyCode === LEFT_ARROW){
    pacX = 21 * blockWidth;
  }
}

// // checking if the ghost won
// function ghostWin(){
//   if(ghostX === pacX && ghostY === pacY){
//     background(ghostWinImg);
//   }
// }
