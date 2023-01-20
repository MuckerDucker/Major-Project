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

let grid = [
  [P, H, H, H, H, T, H, H, H, H, H, H, H, H, T, H, H, H, H, Z],
  [I, 0, 0, 0, 0, I, 0, 0, 0, 0, 0, 0, 0, 0, I, 0, 0, 0, 0, I],
  [I, 0, P, D, 0, U, 0, S, H, H, H, H, D, 0, U, 0, S, Z, 0, I],
  [I, 0, I, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, I, 0, I],
  [U, 0, U, 0, S, D, 0, P, D, 1, 1, S, Z, 0, S, D, 0, U, 0, U],
  [0, 0, 0, 0, 0, 0, 0, I, 1, 1, 1, 1, I, 0, 0, 0, 0, 0, 0, 0],
  [N, 0, N, 0, S, D, 0, C, H, H, H, H, J, 0, S, D, 0, N, 0, N],
  [I, 0, I, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, I, 0, I],
  [I, 0, C, D, 0, N, 0, S, H, H, H, H, D, 0, N, 0, S, J, 0, I],
  [I, 0, 0, 0, 0, I, 0, 0, 0, 0, 0, 0, 0, 0, I, 0, 0, 0, 0, I],
  [C, H, H, H, H, W, H, H, H, H, H, H, H, H, W, H, H, H, H, J]];

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
let hWall;
let dWall;
let leftEndWall;
let topEndWall;
let botLeftCorner;
let topLeftCorner;
let topRightCorner;
let botRightCorner;

function preload(){
  soundFormats("mp3");
  waka = loadSound("waka.mp3");
  theme = loadSound("theme.mp3");
  corner = loadImage("corner_wall.png");
  wall = loadImage("middle_wall.png");
  endWall = loadImage("end_wall.png");
  tWall = loadImage("t_wall.png");
  tDownWall = loadImage("t_down_wall.png");
  hWall = loadImage("h_wall.png");
  dWall = loadImage("right_end_wall.png");
  leftEndWall = loadImage("left_end_wall.png");
  topEndWall = loadImage("top_end_wall.png");
  botLeftCorner = loadImage("bottom_left_corner.png");
  topLeftCorner = loadImage("top_left_corner.png");
  topRightCorner = loadImage("top_right_corner.png");
  botRightCorner = loadImage("bottom_right_corner.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  blockWidth = width / grid[0].length;
  blockHeight = height / grid.length;
  pacX = windowWidth/2 - blockWidth/2 - 5;
  pacY = windowHeight/2 + blockHeight * 2 - 3;
  pacD = (windowHeight + windowWidth)/35;
  angleMode(DEGREES);

  // placing a pellet in the place of every "0" on the map
  for ( let y = 0; y < grid.length;y++){
    for(let x = 0; x < grid[y].length; x++){
      if (grid[y][x] === 0){
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

function displayGrid(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 0) {
        fill("black");
        rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === B) {
        fill("blue");
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
        image(tDownWall, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
      }
      else if (grid[y][x] === H) {
        image(hWall, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
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
  // else if (keyCode === RIGHT_ARROW && collidePointCircle(gridX, gridY, pacX, pacY, pacD) === false) {
  //   pacX+=3;
  // }
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
  // let d = dist(nextX + pacD/2, grid[nextGridY][nextGridX]*blockHeight,  nextY + pacD/2, grid[nextGridY][nextGridX]*blockWidth)
  
  if (grid[nextGridY][nextGridX] !== B && grid[nextGridY][nextGridX] !== C && grid[nextGridY][nextGridX] !== L && grid[nextGridY][nextGridX] !== S && grid[nextGridY][nextGridX] !== Z && grid[nextGridY][nextGridX] !== P && grid[nextGridY][nextGridX] !== I && grid[nextGridY][nextGridX] !== H && grid[nextGridY][nextGridX] !== U && grid[nextGridY][nextGridX] !== N && grid[nextGridY][nextGridX] !== W && grid[nextGridY][nextGridX] !== D && grid[nextGridY][nextGridX] !== T && grid[nextGridY][nextGridX] !== J){
    pacX = nextX;
    pacY = nextY;
  }

  for (let i = pellets.length - 1; i >= 0; i--){
    let distance = dist(pacX, pacY, pellets[i].x, pellets[i].y);
    // eslint-disable-next-line no-extra-parens
    if (distance < pacD/1.5){
      pellets[i].isEaten();
      pellets.splice(i, 1);
      // eating_fruit.play();
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
  fill("yellow");
  ellipse(pacX + 5, pacY + 2.5, pacD);
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

// Checking how much food is left // include power pellets
function foodchecker(){
  if(pellets.length === 0){
    textSize(74)
    fill("white")
    text("you win")
  }
}