// Project Title
// Kati Kesur
// Novmeber 17, 2022

// used to code ghost movement https://www.todayifoundout.com/index.php/2015/10/ghosts-pac-man-work/#:~:text=Although%20the%20ghosts%20can%20sometimes,turn%20and%20then%20continue%20moving.
  
// Pellet class definition
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


// defining variables in the map
let O = 0;
let Y = 2;
let C = 3;
let T = 4;
let I = 5;
let U = 6;
let N = 7;
let W = 8;
let H = 9;
let D = 10;
let S = 11;
let L = 12;
let P = 13;
let Z = 14;
let J = 15;

// map used
let grid = [
  [P, H, H, H, H, T, H, H, H, H, H, H, H, H, T, H, H, H, H, Z],
  [I, O, O, O, O, I, O, O, O, O, O, O, O, O, I, O, O, O, O, I],
  [I, O, P, D, O, U, O, S, H, H, H, H, D, O, U, O, S, Z, O, I],
  [I, O, I, O, O, O, O, O, O, O, O, O, O, O, O, O, O, I, O, I],
  [U, O, U, O, S, D, O, P, D, Y, Y, S, Z, O, S, D, O, U, O, U],
  [O, O, O, O, O, O, O, I, Y, Y, Y, Y, I, O, O, O, O, O, O, O],
  [N, O, N, O, S, D, O, C, H, H, H, H, J, O, S, D, O, N, O, N],
  [I, O, I, O, O, O, O, O, O, Y, O, O, O, O, O, O, O, I, O, I],
  [I, O, C, D, O, N, O, S, H, H, H, H, D, O, N, O, S, J, O, I],
  [I, O, O, O, O, I, O, O, O, O, O, O, O, O, I, O, O, O, O, I],
  [C, H, H, H, H, W, H, H, H, H, H, H, H, H, W, H, H, H, H, J]];

// defining variables
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
let corner;
let wall;
let endWall;
let tWall;
let horizontalWall;
let dWall;
let leftEndWall;
let topEndWall;
let botLeftCorner;
let topLeftCorner;
let topRightCorner;
let botRightCorner;
let upsideDownT;
let ghostWinImg;
let pac;
let moveX;
let moveY;
let ghostX = 500;
let ghostY = 276;

function preload(){
  soundFormats("mp3");
  waka = loadSound("waka.mp3");
  theme = loadSound("theme.mp3");
  corner = loadImage("corner_wall.png");
  wall = loadImage("middle_wall.png");
  endWall = loadImage("end_wall.png");
  tWall = loadImage("t_wall.png");
  upsideDownT = loadImage("t_down_wall.png");
  horizontalWall = loadImage("h_wall.png");
  dWall = loadImage("right_end_wall.png");
  leftEndWall = loadImage("left_end_wall.png");
  topEndWall = loadImage("top_end_wall.png");
  botLeftCorner = loadImage("bottom_left_corner.png");
  topLeftCorner = loadImage("top_left_corner.png");
  topRightCorner = loadImage("top_right_corner.png");
  botRightCorner = loadImage("bottom_right_corner.png");
  ghostWinImg = loadImage("ghost_win.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  blockWidth = width / grid[0].length;
  blockHeight = height / grid.length;
  pacX = windowWidth/2 - blockWidth/2 ;
  pacY = windowHeight/2 + blockHeight * 2;
  pacD = (windowHeight + windowWidth)/35;
  angleMode(DEGREES);

  // placing a pellet in the place of every "O" on the map
  for ( let y = 0; y < grid.length;y++){
    for(let x = 0; x < grid[y].length; x++){
      if (grid[y][x] === O){
        let pellet = new Pellet(x * blockWidth + (blockWidth/2 - 3 ), y * blockHeight + (blockHeight/2 - 3), false);
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
    music();
    ghost();
    moveWhenSide();
    foodchecker();
    for (let pellet of pellets){
      pellet.display();
    }
  }
  if (state === "end"){
    theme.setLoop(false);
  }
}

// Displaying map
function displayGrid(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === O) {
        fill("black");
        rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === Y) {
        fill("black");
        rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === C) {
        image(corner, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === W) {
        image(tWall, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === I) {
        image(wall, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === U) {
        image(endWall, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if(grid[y][x] === 1){
        fill("black");
        rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === T) {
        image(upsideDownT, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === H) {
        image(horizontalWall, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === D) {
        image(dWall, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === S) {
        image(leftEndWall, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === N) {
        image(topEndWall, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === L) {
        image(botLeftCorner, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === P) {
        image(topLeftCorner, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === Z) {
        image(topRightCorner, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === J) {
        image(botRightCorner, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
    }
  }
}

// pac mans movement
function movePac(){
  let nextX = pacX;
  let nextY = pacY;

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

  let nextGridY = Math.floor(nextY/blockHeight);
  let nextGridX = Math.floor(nextX/blockWidth);

  // eating pellets
  for (let i = pellets.length - 1; i >= 0; i--){
    let distance = dist(pacX, pacY, pellets[i].x, pellets[i].y);
    if (grid[nextGridY][nextGridX] !== H && grid[nextGridY][nextGridX] !== C && grid[nextGridY][nextGridX] !== L && grid[nextGridY][nextGridX] !== S && grid[nextGridY][nextGridX] !== Z && grid[nextGridY][nextGridX] !== P && grid[nextGridY][nextGridX] !== I && grid[nextGridY][nextGridX] !== U && grid[nextGridY][nextGridX] !== N && grid[nextGridY][nextGridX] !== W && grid[nextGridY][nextGridX] !== D && grid[nextGridY][nextGridX] !== T && grid[nextGridY][nextGridX] !== J){
      pacX = nextX;
      pacY = nextY;
    }
    
    if (distance < pacD/1.5){
      pellets[i].isEaten();
      pellets.splice(i, 1);
      // eating_fruit.play(); //breaks the code
    }
  }
}

//Ghost function and movement
function ghost(){
  fill("red");
  rect(ghostX, ghostY, pacD);
  if (grid[Math.floor(ghostY/blockHeight)][Math.floor(ghostX/blockWidth)] !== I && grid[Math.floor(ghostY/blockHeight)][Math.floor(ghostX/blockWidth)] !== Z){
    ghostX+= 1.2;
  }
  if (grid[Math.floor(ghostY/blockHeight)][Math.floor(ghostX/blockWidth)] === I && grid[Math.floor(ghostY/blockHeight)][Math.floor(ghostX/blockWidth)] !== H){
    ghostY -= 1;
  }
  if (grid[Math.floor(ghostY/blockHeight)][Math.floor(ghostX/blockWidth)] === Z){
    ghostX -= 1;
  }
}

//theme music
function music(){
  if (mouseIsPressed){
    theme.play();
  }
}


function showPac(){
  fill("yellow");
  ellipse(pacX, pacY, pacD);
  // image(pacImg, pacX, pacY, pacD, pacD);
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

// Checking how much food is left // include power pellets
function foodchecker(){
  if(pellets.length === 0){
    textSize(74);
    fill("white");
    text("you win");
  }
}

// checking if the ghost won
function ghostWin(){
  if(ghostX === pacX && ghostY === pacY){
    background(ghostWinImg);
  }
}

// attempts at a start button
// function showStart(){
//   // text("start",windowWidth/2, windowHeight/2);
//   button = createButton("Start");
//   fill(buttonColour);
//   button.position(windowWidth/2, windowHeight/2);
//   button.mousePressed(theme.loop);
// }

// insert     waka.play(); somewhere

// attempts at better ghost movement/possible pathfinding

// function ghost(){
//   let nextGhostX = ghostX;
//   let nextGhostY = ghostY;
//   fill("red");
//   rect(ghostX, ghostY, 30);
//   let nextGhostGridY = Math.floor(nextY/blockHeight);
//   let nextGhostGridX = Math.floor(nextX/blockWidth);

//   moveX = random(-3, 3);
//   moveY = random(-3, 3);
//   if (grid[nextGhostGridY][nextGhostGridX] !== H && grid[nextGhostGridY][nextGhostGridX] !== C && grid[nextGhostGridY][nextGhostGridX] !== L && grid[nextGhostGridY][nextGhostGridX] !== S && grid[nextGhostGridY][nextGhostGridX] !== Z && grid[nextGhostGridY][nextGhostGridX] !== P && grid[nextGhostGridY][nextGhostGridX] !== I && grid[nextGhostGridY][nextGhostGridX] !== U && grid[nextGhostGridY][nextGhostGridX] !== N && grid[nextGhostGridY][nextGhostGridX] !== W && grid[nextGhostGridY][nextGhostGridX] !== D && grid[nextGhostGridY][nextGhostGridX] !== T && grid[nextGhostGridY][nextGhostGridX] !== J){

//     ghostX = nextGhostX + moveX;
//     ghostY = nextGhostY + moveY;
//   }

// }

// function ghost(){
//   fill("red");
//   rect(ghostX, ghostY, 30);
//   let canMove = false;
//   let d = dist(ghostX, ghostY, pacX, pacY);
//   if (d > 100){
//     let ghostNextX = ghostX + (pacX - ghostX);
//     let ghostNextY = ghostY + (pacY - ghostY);
//     if (grid[nextGridY][nextGridX] !== H && grid[nextGridY][nextGridX] !== C && grid[nextGridY][nextGridX] !== L && grid[nextGridY][nextGridX] !== S && grid[nextGridY][nextGridX] !== Z && grid[nextGridY][nextGridX] !== P && grid[nextGridY][nextGridX] !== I && grid[nextGridY][nextGridX] !== U && grid[nextGridY][nextGridX] !== N && grid[nextGridY][nextGridX] !== W && grid[nextGridY][nextGridX] !== D && grid[nextGridY][nextGridX] !== T && grid[nextGridY][nextGridX] !== J){
//       ghostX = ghostNextX;
//       ghostY = ghostNextY;
//     }
//   }
  
// }