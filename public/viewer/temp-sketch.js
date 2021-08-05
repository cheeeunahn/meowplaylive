let button;
let msg;
let successCount;
let fishGroup;
let rectWidth;
let rectHeight;
let rectPosX;
let rectPosY;
let fontRegular;

function preload() {
  fontRegular = loadFont('./assets/NanumSquareR.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  button = createButton('click me');
  button.size(100,100);
  button.position(5, 30);
  button.mousePressed(displayToCat);

  input = createInput();
  input.position(5, 140);

  rectWidth = 1366/2;
  rectHeight = 1024/2; // following ipad pro screen ratio 1366px x 1024px
  rectPosX = 30; // the x position of the cat UI screen
  rectPosY = windowHeight/3; // the y posiiton of the cat UI screen
 
  socket = io(); // make connection to socket
  
  socket.on('cat-tap-success', () => {
    successCount++;
    msg = "success!";
    setTimeout(resetText, 3000);
  });

  socket.on('cat-tap-fail', () => {
    msg = "oh no!";
    setTimeout(resetText, 3000);
  });
  
  socket.on('number-exceeded', () => {
    msg = "click slower!";
    setTimeout(resetText, 3000);
  });
  

  // this is for receiving position data from cat UI
  ///////////////////////////////////////////
  socket.on('move-fish-group', (arg) => {
    //console.log(arg);
    for (var i = 0; i < fishGroup.length; i++){
      fishGroup[i].updatePosition(arg.fish_positions[i].posX, arg.fish_positions[i].posY, arg.fish_positions[i].angle, rectWidth, rectHeight);
      fishGroup[i].updateUsername(arg.fish_positions[i].username);
    }
  });
  ///////////////////////////////////////////
  msg = "";
  successCount = 0;

  // a group of cloned fish from cat UI
  fishGroup = [new CloneFish(), new CloneFish(), new CloneFish()];
}

function draw () {
  background(255);
  drawCatUI();
}

// this funciton has the code for drawing the cat UI
//////////////////////////////////////////
function drawCatUI() {
  rectMode(CORNER);
  noStroke();
  fill(100);
  rect(rectPosX, rectPosY, rectWidth, rectHeight); 

  
  for (var i = 0; i < fishGroup.length; i++) {
    fishGroup[i].draw();
  }

  push();
  translate(rectPosX+rectWidth/2, rectPosY+rectHeight/2)

  beginShape();
  vertex(-windowWidth, -windowHeight);
  vertex(-windowWidth, windowHeight);
  vertex(windowWidth, windowHeight);
  vertex(windowWidth, -windowHeight);

  fill(255); // fill with background color of website (white)

  beginContour();
  vertex(-rectWidth/2+10, -rectHeight/2+10);
  vertex(rectWidth/2-10, -rectHeight/2+10);
  vertex(rectWidth/2-10, rectHeight/2-10);
  vertex(-rectWidth/2+10, rectHeight/2-10);
  endContour();
  endShape(CLOSE);

  pop();

  textSize (32);
  textFont(fontRegular);
  fill(0);
  text(msg, 150,30);
}
//////////////////////////////////////////

function resetText() {
  msg = "";
}

function displayToCat() {
    socket.emit('name-sent', input.value());
    socket.emit('button-clicked');
}

class CloneFish {
  constructor() {
    this.fish_gif = loadImage('../cat/assets/fish_blue.gif');
    this.fish_gif.play();

    this.px = -500;
    this.py = -500; // put it somewhere invisible
    this.position = createVector(this.px, this.py);
    this.angle = 0;

    this.username = "";
  }

  updatePosition(px, py, angle, rectWidth, rectHeight) {
    this.px = rectPosX + rectWidth*px;
    this.py = rectPosY + rectHeight*py;
    this.position = createVector(this.px, this.py);
    this.angle = angle;
  }

  updateUsername(username) {
    this.username = username;
  }

  draw() {
    push();
    translate (this.px, this.py);
    rotate(this.angle);
    image(this.fish_gif, 0, 0, 200, 200);
    textSize(rectWidth/25);
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    text(this.username, this.fish_gif.width/9, this.fish_gif.height/9);
    pop();
  }
}