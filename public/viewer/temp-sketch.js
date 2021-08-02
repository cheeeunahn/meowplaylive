let button;
let msg;
let successCount;

function setup() {
  createCanvas(500, 500);
  button = createButton('click me');
  button.size(100,100);
  button.position(5, 30);
  button.mousePressed(displayToCat);

  input = createInput();
  input.position(5, 140);

  socket = io(); // make connection to socket
  socket.on('cat-tap-success', displaySuccessText);
  socket.on('number-exceeded', displayExceedText);
  msg = "";
  successCount = 0;
}

function draw () {
  background(255);
  if (!msg=="" && frameCount%200 == 0) {
    msg = "";
  }
  textSize (32);
  fill(0);
  text(msg, 150,30);
}

function displayToCat() {
    socket.emit('name-sent', input.value());
    socket.emit('button-clicked');
}

function displaySuccessText () {
  successCount++;
  msg = "success!";
}

function displayExceedText() {
  msg = "click slower!";
}