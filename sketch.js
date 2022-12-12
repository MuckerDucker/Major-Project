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
// let somePellet;
// let foodcounter;
// let state = "start";
let blockWidth;
let blockHeight;
let pacX = 9;
let pacY = 7;
// let ghostX = 8;
// let ghostY = 5;
// let pacImg;
// let ghostImg;

//loading all images
// function preload(){
//   ghostImg = loadImage("ghost.jpg");
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  // grid[pacY][pacX];
  // grid[ghostY][ghostX] = G;
}

// function startScreen() {
//   // probably text or a start key
// }

function draw() {
  // if (state === "start"){
  //   startScreen();
  // }
  // if (state === "main"){
  //   showPac();
  displayGrid(grid);
  showPac();
  // moveWhenSide();
  // foodchecker();
  //}
}



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

function showPac(){
  fill("yellow");
  circle(blockHeight * pacX, blockWidth * pacY, 20);
}

function keyPressed(){
  // initiating main screen
  // if (state === "start" && keyCode === 32){
  //   state = "main";
  // }
  // Pac movement
  if (keyCode === UP_ARROW) {
    if (grid[pacY-1][pacX] !== B){
      //sets spot to black(eats food if it exists)
      grid[pacY][pacX] = 1;
      
      //move
      pacY--;
    }
  }

  if (keyCode === DOWN_ARROW) {
    if (grid[pacY+1][pacX] !== B) {
      //setting trail to black
      grid[pacY][pacX] = 1;
      
      //move
      pacY++;

      //changes pacs location
      grid[pacY][pacX] = M;
    }
  }

  if (keyCode === RIGHT_ARROW) {
    if (grid[pacY][pacX+1] !== B) {
      //setting trail to black
      grid[pacY][pacX] = 1;
      
      //move
      pacX++;

      //changes pacs location
      grid[pacY][pacX] = M;
    }
  }

  if (keyCode === LEFT_ARROW) {
    if (grid[pacY][pacX-1] !== B) {
      //setting trail to black
      grid[pacY][pacX] = 1;
      
      //move
      pacX-- ;

      //changes pacs location
      grid[pacY][pacX] = M;
    }
  }
}

// // Moves Pac to the other side when he takes the path
// function moveWhenSide(){
//   if (grid[21][6] && keyCode === RIGHT_ARROW){
//     pacX = 0;
//     grid[pacY][pacX] = M;
//   }
//   if (grid[0][6] && keyCode === LEFT_ARROW){
//     pacX = 21;
//     grid[pacY][pacX] = M;
//   }
// }

// // checking if the ghost won
// function ghostWin(){
//   if(ghostX === pacX && ghostY === pacY){
//     background(ghostWinImg);
//   }
// }
