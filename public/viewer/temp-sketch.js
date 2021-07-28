let button;
let msg;
let successCount;

function setup() {
  createCanvas(500, 500);
  button = createButton('click me');
  button.size(100,100);
  button.position(5, 30);
  button.mousePressed(displayToCat);
  socket = io(); // make connection to socket
  socket.on('cat-tap-success', displaySuccessText);
  msg = "";
  successCount = 0;
}

function draw () {
  background(255);
  if (!msg=="" && frameCount%300 == 0) {
    msg = "";
  }
  textSize (32);
  fill(0);
  text(msg, 150,30);
}

function displayToCat() {
    socket.emit('button-clicked');
}

function displaySuccessText () {
  successCount++;
  msg = "success: " + successCount;
}