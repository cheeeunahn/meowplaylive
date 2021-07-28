let button;

function setup() {
  createCanvas(100, 100);
  button = createButton('click me');
  button.size(100,100);
  button.position(5, 30);
  button.mousePressed(displayFishToCat);
  socket = io(); // make connection to socket
}

function displayFishToCat() {
    socket.emit('button-clicked');
}