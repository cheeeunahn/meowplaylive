let waterSound;
let bubbleSound;

let fishGroup;

let displayRipple;
let rippleRadius;
let username;

let tempMsg;

function preload() {
    // load the necessary sound files
    soundFormats('mp3');
    waterSound = loadSound('./assets/waterstream.mp3');
    voiceSound = loadSound('./uploads/test-recording.m4a');
    splashSound = loadSound('./assets/splash.mp3');
    bubbleSound = loadSound('./assets/bubble.mp3');

    angleMode(RADIANS);
}

function setup() {
    // create canvas
    createCanvas (windowWidth,windowHeight);
    // add screen pointer
    addScreenPositionFunction();

    //play background sound
    waterSound.setVolume(0.2);
    waterSound.loop();

    rippleRadius = 1;
    displayRipple = false;

    // a group of fish, max size is 3
    fishGroup = [new Fish(), new Fish(), new Fish()];

    // temporary variable for displaying username
    // chosen by the cat
    tempMsg = "";

    // socket connection
    socket = io();
    // when viewer button is clicked, draw the fish
    socket.on('name-sent', (name) => {
        username = name;
        console.log(name);
      });
    socket.on('button-clicked', drawFish);
}

function draw() {
    background(226,237,238);
    textSize(width/10);
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    text(tempMsg, width/2, 100);

    for (var i = 0; i < fishGroup.length; i++){
        fishGroup[i].show();
    }

    if (mouseIsPressed) {
        strokeWeight(6);
        stroke(255,255,0);
    }
    else {
        noStroke();
    }
    noFill();
    circle(pmouseX, pmouseY, height/10);


    if (displayRipple) {
        noFill();
        strokeWeight(6);
        stroke(255);
        circle(pmouseX, pmouseY, rippleRadius);
        rippleRadius +=100;

        if (rippleRadius > width){
            rippleRadius = 1;
            displayRipple = false;
        }
    }
}

function drawFish (data) {
    for (var i = 0; i < fishGroup.length; i++){
        if (fishGroup[i].getPositionX() > windowWidth || fishGroup[i].getPositionX() < 0) {
            fishGroup[i].setUsername(username);
            fishGroup[i].setId(data.id);
            fishGroup[i].setNewPosition();
            bubbleSound.setVolume(0.4);
            bubbleSound.play();
            return;
        }
    }
    socket.emit('number-exceeded', data);
    console.log(data);
}

function touchEnded () {
    for (var i = 0; i < fishGroup.length; i++){
        if (fishGroup[i].checkHit()) {
            this.splashSound.setVolume(0.7);
            this.splashSound.play();
            this.voiceSound.setVolume(2.0);
            if (this.voiceSound.isPlaying())
                this.voiceSound.stop();    
            this.voiceSound.play();
            tempMsg = fishGroup[i].username;
        }
    }


}

// delete later ///////////
function mousePressed() {
    userStartAudio();
  }
///////////////////////////


// A class for drawing fish
class Fish {
    constructor() {
        this.fish_gif = loadImage('./assets/fish_blue.gif');
        this.fish_gif.play();

        this.px = -500;
        this.py = -500; // put it somewhere invisible
        this.position = createVector(this.px, this.py);
        this.velocity = createVector(0,0);

        this.angle = 0;

        this.hit = false;

        this.poly = [];
        this.poly[0] = createVector(0,0);
        this.poly[1] = createVector(0,0);
        this.poly[2] = createVector(0,0);
        this.poly[3] = createVector(0,0);

        this.username="";
        this.id="";
    }

    setNewPosition() {
        this.px = random(10,windowWidth+10);
        this.py = random(10,windowHeight-100);
        this.position = createVector(this.px, this.py);

        this.vx = random(-12,12);
        this.vy = random(-12,12);
    
        while (this.vx == this.vy || abs(this.vx) < 6) {
            this.vx = random(-12,12);
            this.vy = random(-12,12);
        }
    
        if (this.vx > 0 && this.px > windowWidth/2)
            this.vx = -this.vx;
        if (this.vy > 0 && this.py > windowHeight/2)
            this.vy = -this.vy;
    
        this.velocity = createVector (this.vx, this.vy);

    }

    show() {
        if (this.velocity != null) {
            
            this.position.add(this.velocity);
            
            push();

            translate (this.position.x, this.position.y);

            if (this.velocity.y > 0) {
                if (this.velocity.x > 0)
                    this.angle = atan(this.velocity.y/this.velocity.x)-(PI);
                else
                    this.angle = (-3*PI/2)-atan(-this.velocity.y/this.velocity.x)-PI/2;    
            }
            else {
                if (this.velocity.x > 0)
                    this.angle = (-3*PI/2)-atan(-this.velocity.y/this.velocity.x)+PI/2;
                else
                    this.angle = (3*PI/2)-atan(-this.velocity.y/this.velocity.x)+PI/2;
            }
            rotate(this.angle);

            image(this.fish_gif, 0,0, width/4,width/4);
            textSize(width/20);
            textAlign(CENTER, CENTER);
            fill(0);
            noStroke();
            text(this.username, this.fish_gif.width/10, this.fish_gif.height/10);
            
            // setting collider boundaries
            this.v1 = createVector(0,0);
            this.v2 = createVector(this.fish_gif.width, 0);
            this.v3 = createVector(this.fish_gif.width, this.fish_gif.height);
            this.v4 = createVector(0,this.fish_gif.height);
            this.poly[0] = screenPosition(this.v1);
            this.poly[1] = screenPosition(this.v2);
            this.poly[2] = screenPosition(this.v3);
            this.poly[3] = screenPosition(this.v4);

            pop();
        }
    }

    checkHit() {
        this.hit = collidePointPoly(pmouseX, pmouseY, this.poly);
        //console.log(poly[0]);
        //console.log(hit);
        if (this.hit) {
            this.px = -500;
            this.py = -500; // put it somewhere invisible
            this.position = createVector(this.px, this.py);
            this.velocity = createVector(0,0);
            displayRipple = true;
            socket.emit('cat-tap-success', this.id); // send the socket id of this fish object
        } 
        return this.hit;
    }

    setUsername(username) {
        this.username = username;
    }

    setId(id) {
        this.id = id;
    }

    getPositionX() {
        return this.position.x;
    }
}