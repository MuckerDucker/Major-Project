// Project Title
// Kati Kesur
// Novmeber 17, 2022

// used to code ghost movement https://www.todayifoundout.com/index.php/2015/10/ghosts-pac-man-work/#:~:text=Although%20the%20ghosts%20can%20sometimes,turn%20and%20then%20continue%20moving.
  
// class definition
class Pellet {
  constructor(x, y, eaten){
    this.x = x;
    this.y = y;
    this.side = 9;
    this.eaten = false; 
  }

  display(){
    fill("white");
    rect(this.x, this.y, this.side);
  }

  isEaten(){
    return this.eaten = true;
  }
}

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
  blockWidth = width / grid[0].length;
  blockHeight = height / grid.length;
  pacX = windowWidth/2 - blockWidth;
  pacY = windowHeight/2 + blockHeight * 1.5;
  pacD = windowHeight/35 + windowWidth/40;

  // placing a pellet in the place of every "0" on the map
  for ( let y = 0; y < grid.length;y++){
    for(let x = 0; x < grid[y].length; x++){
      if (grid[y][x] === 0){
        let pellet = new Pellet(x * blockWidth + (blockWidth/2 - 1 ), y * blockHeight + (blockHeight/2 - 1), false);
        pellets.push(pellet);
      }
    }
  }  
}

function draw() {
  if (state === "main"){
    displayGrid(grid);
    // showStart();
    movePac();
    showPac();
    moveWhenSide();
    for (let pellet of pellets){
      pellet.display();
    }
  }
  if (state === "end"){
    theme.setLoop(false);
  }
}

function displayGrid(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 0) {
        fill("black");
        rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
        // fill("white");
        // rect(blockWidth, blockWidth, 10, 10);
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


function movePac(){
  let nextX = pacX;
  let nextY = pacY;
  // let nextYY = pacY - blockHeight/2;

  // move up
  if (keyCode === UP_ARROW ) {  
    nextY-= 3;
  }
  // move down
  else if (keyCode === DOWN_ARROW) {
    nextY+= 3;
  }
  // move right
  else if (keyCode === RIGHT_ARROW) {
    nextX+=3;
  }
  // move left
  else if (keyCode === LEFT_ARROW) {
    nextX-=3 ;
  }

  // let nextGridYY = Math.floor(nextYY/blockHeight);
  let nextGridY = Math.floor(nextY/blockHeight);
  let nextGridX = Math.floor(nextX/blockWidth);
  
  if (grid[nextGridY][nextGridX + 1] !== B && grid[nextGridY][nextGridX] !== B){
    pacX = nextX;
    pacY = nextY;
  }
  for (let i = pellets.length - 1; i >= 0; i--){
    let distance = dist(pacX, pacY, pellets[i].x, pellets[i].y);
    // eslint-disable-next-line no-extra-parens
    if ((distance < blockHeight/2 && distance < blockWidth/2) || (distance < blockHeight)){
      pellets[i].isEaten();
      pellets.splice(i, 1);
    }
  }
}

// function showStart(){
//   // text("start",windowWidth/2, windowHeight/2);
//   button = createButton("Start");
//   fill(buttonColour);
//   button.position(windowWidth/2, windowHeight/2);
//   button.mousePressed(theme.loop);
// }

// insert     waka.play(); somewhere

function showPac(){
  ellipseMode(CORNER);
  fill("yellow");
  ellipse(pacX + 5, pacY + 2.5, blockWidth - 10, blockHeight - 5);
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