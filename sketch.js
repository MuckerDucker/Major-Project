// Project Title
// Kati Kesur
// Novmeber 17, 2022

// used to code ghost movement https://www.todayifoundout.com/index.php/2015/10/ghosts-pac-man-work/#:~:text=Although%20the%20ghosts%20can%20sometimes,turn%20and%20then%20continue%20moving.
  
// class definition
class Pellet {
  constructor(x, y, eaten){
    this.x = x;
    this.y = y;
    this.eaten = eaten;     
  }

  display(){
    circle(this.x, this.y, 6);
    fill("white");
  }
}

// defining variables
let grid = "map.txt";
let somePellet;
let foodcounter;
let B = 2;
let state = "start";
let blockWidth;
let blockHeight;
let pacX = 9;
let pacY = 7;
let ghostX = 8;
let ghostY = 5;
let pacImg;
let ghostImg;

//loading all images
// function preload(){
//   ghostImg = loadImage("ghost.jpg");
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  // grid[pacY][pacX];
  // grid[ghostY][ghostX] = G;
}

function startScreen() {
  // probably text or a start key
}

function draw() {
  // if (state === "start"){
  //   startScreen();
  // }
  // if (state === "main"){
  //   showPac();
  displayGrid(grid);
  // moveWhenSide();
  // foodchecker();
  //}
}

function showPac(){
  circle(pacY, pacX, 20);
  fill("yellow");
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
  let blockWidth = width / grid[0].length;
  let blockHeight = height / grid.length;
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


// function keyPressed(){
//   // initiating main screen
//   if (state === "start" && keyCode === 32){
//     state = "main";
//   }
//   // Pac movement
//   if (keyCode === UP_ARROW) {
//     if (grid[pacY-1][pacX] !== B){
//       //sets spot to black(eats food if it exists)
//       grid[pacY][pacX] = 1;
      
//       //move
//       pacY--;

//       //changes pacs location
//       grid[pacY][pacX] = M;
//     }
//   }

//   if (keyCode === DOWN_ARROW) {
//     if (grid[pacY+1][pacX] !== B) {
//       //setting trail to black
//       grid[pacY][pacX] = 1;
      
//       //move
//       pacY++;

//       //changes pacs location
//       grid[pacY][pacX] = M;
//     }
//   }

//   if (keyCode === RIGHT_ARROW) {
//     if (grid[pacY][pacX+1] !== B) {
//       //setting trail to black
//       grid[pacY][pacX] = 1;
      
//       //move
//       pacX++;

//       //changes pacs location
//       grid[pacY][pacX] = M;
//     }
//   }

//   if (keyCode === LEFT_ARROW) {
//     if (grid[pacY][pacX-1] !== B) {
//       //setting trail to black
//       grid[pacY][pacX] = 1;
      
//       //move
//       pacX-- ;

//       //changes pacs location
//       grid[pacY][pacX] = M;
//     }
//   }
  
//   if (keyCode === 83) {
//     if (grid[ghostY+1][ghostX] !== B){
//       // ensuring the ghost leaves no trail
//       if(grid[ghostY+1][ghostX] === 1){
//         grid[ghostY][ghostX] = 1;
//       }
//       if(grid[ghostY+1][ghostX] === 0){
//         grid[ghostY][ghostX] = 0;
//       }
//       //move
//       ghostY++;
  
//       //changes ghost's location
//       grid[ghostY][ghostX] = G;
//     }
//   }
  
//   if (keyCode === 68) {
//     if (grid[ghostY][ghostX + 1] !== B){
//       // ensuring the ghost leaves no trail
//       if(grid[ghostY][ghostX + 1] === 1){
//         grid[ghostY][ghostX] = 1;
//       }
//       if(grid[ghostY][ghostX + 1] === 0){
//         grid[ghostY][ghostX] = 0;
//       }
        
//       //move
//       ghostX++;
  
//       //changes ghost's location
//       grid[ghostY][ghostX] = G;
//     }
//   }
  
//   if (keyCode === 65) {
//     if (grid[ghostY][ghostX - 1] !== B){
//       // ensuring the ghost leaves no trail
//       if(grid[ghostY][ghostX - 1] === 1){
//         grid[ghostY][ghostX] = 1;
//       }
//       if(grid[ghostY][ghostX - 1] === 0){
//         grid[ghostY][ghostX] = 0;
//       }
        
//       //move
//       ghostX-- ;
  
//       //changes ghost's location
//       grid[ghostY][ghostX] = G;
//     }
//   }
// }

// //Code for Final Project
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
