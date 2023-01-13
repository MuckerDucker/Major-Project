// Project Title
// Kati Kesur
// Novmeber 17, 2022

// used to code ghost movement https://www.todayifoundout.com/index.php/2015/10/ghosts-pac-man-work/#:~:text=Although%20the%20ghosts%20can%20sometimes,turn%20and%20then%20continue%20moving.
  
// class definition
// class Pellet {
//   constructor(x, y, eaten){
//     this.x = x;
//     this.y = y;
//     this.side = 5;
//     this.eaten = false; 
//   }

//   display(){
//     fill("white");
//     rect(this.x, this.y, this.side);
//   }

//   isEaten(){
//     return this.eaten = true;
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
let pellets = [];
// let somePellet = new Pellet//(grid[]);
let waka;
let theme;
let state = "main";
let buttonColour = 255;
let button;

function preload(){
  soundFormats("mp3");
  waka = loadSound("waka.mp3");
  theme = loadSound("theme.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pacX = windowWidth/2;
  pacY = windowHeight/2;
  pacD = windowHeight/35 + windowWidth/40;
}

function draw() {
  if (state === "main"){
    displayGrid(grid);
    showStart();
    movePac();
    showPac();
    moveWhenSide();
    
  }
  if (state === "end"){
    theme.setLoop(false);
  }
  // for (let pellet of pellets){
  //   somePellet.display();
  // }
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
        rect(blockWidth, blockWidth, 10, 10);
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

function pellet(){
  if (grid[pacX][pacY] === 0){
    let che = 9;
  }
}

function movePac(){
  let nextX = pacX;
  let nextY = pacY;

  // checking if pac is going to run into a wall
  if (keyCode === UP_ARROW ) {  
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

  let nextGridY = Math.floor(nextY/blockHeight);
  let nextGridX = Math.floor(nextX/blockWidth);

  if (grid[nextGridY][nextGridX] !== B + pacD/2 && grid[nextGridY][nextGridX] !== B && grid[nextGridY][nextGridX] !== B && grid[nextGridY][nextGridX] !== B){
    pacX = nextX;
    pacY = nextY;
  }
}

function showStart(){
  // text("start",windowWidth/2, windowHeight/2);
  button = createButton("Start");
  fill(buttonColour);
  button.position(windowWidth/2, windowHeight/2);
  button.mousePressed(theme.loop);
}

// insert     waka.play(); somewhere

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

// // Checking how much food is left // include power pellets
// function foodchecker(){
//   foodcounter = 0;
//   for (let y = 0; y < grid.length; y++) {
//     for (let x = 0; x < grid[y].length; x++) {
//       if (grid[y][x] === 0){
//         foodcounter++;        
//       }
//     }
//   }
//   if (foodcounter === 0){
//     state = "level_two";
//   } 
// }