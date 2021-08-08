let waterSound;
let bubbleSound;

let fishGroup;

let displayRipple;
let rippleRadius;
let username;

let titleNickname;

function preload() {
    // load the necessary sound files
    soundFormats('mp3');
    waterSound = loadSound('./assets/waterstream.mp3');
    voiceSound = loadSound('./uploads/test-recording.m4a');
    splashSound = loadSound('./assets/splash.mp3');
    bubbleSound = loadSound('./assets/bubble.mp3');

    // load font file

    //set angle mode
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
    titleNickname = "";

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
    background(222,243,246); // background color of canvas
    textSize(width/10);
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    text(titleNickname, width/2, 100);

    for (var i = 0; i < fishGroup.length; i++){
        fishGroup[i].show();
        if (!fishGroup[i].isShowing()){
            //if isShowing() value change occurs from true to false, trigger emit event
            if (fishGroup[i].getPrevState()==true)
                socket.emit('cat-tap-fail', fishGroup[i].getId());
        }
        fishGroup[i].setPrevState(fishGroup[i].isShowing()); // save previous isShowing() value
    }

    // tell viewer UI where the fish is positioned at what angle
    // also send fish nickname information
    let data = { fish_positions: [
        {posX: fishGroup[0].getPositionX()/windowWidth, posY: fishGroup[0].getPositionY()/windowHeight, angle: fishGroup[0].getAngle(), username: fishGroup[0].getUsername()},
        {posX: fishGroup[1].getPositionX()/windowWidth, posY: fishGroup[1].getPositionY()/windowHeight, angle: fishGroup[1].getAngle(), username: fishGroup[1].getUsername()},
        {posX: fishGroup[2].getPositionX()/windowWidth, posY: fishGroup[2].getPositionY()/windowHeight, angle: fishGroup[2].getAngle(), username: fishGroup[2].getUsername()} ]};
    socket.emit('move-fish-group', data);

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
        strokeWeight(8);
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
            fishGroup[i].setId(data.socketid); // the socket id of the fish
            fishGroup[i].setVoiceBlob(new Blob([data.audio], { type: 'audio/mp3' })); // audio recorded by the user
            fishGroup[i].setDonation(data.donation);
            fishGroup[i].setToNewPosition();
            bubbleSound.setVolume(0.4);
            if (bubbleSound.isPlaying())
                bubbleSound.stop();
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
            if (this.splashSound.isPlaying())
                this.splashSound.stop();
            this.splashSound.play();
            //this.voiceSound.setVolume(2.0);
            //if (this.voiceSound.isPlaying())
            //    this.voiceSound.stop();    
            //this.voiceSound.play();
            fishGroup[i].playVoice(); // Play the voice recorded by the user.
            titleNickname = fishGroup[i].username;
            setTimeout(resetTitleText, 5000);
        }
    }
}

function resetTitleText () {
    titleNickname = "";
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

        this.colorPalette = [color(31, 135, 74), color(16, 99, 71), color(10, 99, 84),
            color(1, 96, 102), color(27, 79, 95), color(22, 77, 119), color(19, 59, 107), color(17, 55, 98),
            color(12, 43, 85), color(17, 31, 84), color(23, 6, 65)];

        this.px = -1000;
        this.py = -1000; // put it somewhere invisible
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

        this.showPrevState = false;

        // default donation amount from user
        this.donation = -1;

        // Audio blob object. (Recorded by the user.)
        this.voiceBlob = null;
    }

    setToNewPosition() {
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

            switch (this.donation){
                case 1000:
                    this.fishColor = this.colorPalette[0];
                    this.fishSize = width/5;
                    break;
                case 2000:
                    this.fishColor = this.colorPalette[1];
                    this.fishSize = width/5;
                    break;
                case 5000:
                    this.fishColor = this.colorPalette[2];
                    this.fishSize = width/5;
                    break;
                case 10000:
                    this.fishColor = this.colorPalette[3];
                    this.fishSize = width/4;
                    break;
                case 20000:
                    this.fishColor = this.colorPalette[4];
                    this.fishSize = width/4;
                    break;
                case 50000:
                    this.fishColor = this.colorPalette[5];
                    this.fishSize = width/4;
                    break;
                case 100000:
                    this.fishColor = this.colorPalette[6];
                    this.fishSize = width/3.5;
                    break;
                case 200000:
                    this.fishColor = this.colorPalette[7];
                    this.fishSize = width/3.5;
                    break;
                case 300000:
                    this.fishColor = this.colorPalette[8];
                    this.fishSize = width/3.5;
                    break;
                case 400000:
                    this.fishColor = this.colorPalette[9];
                    this.fishSize = width/3.5;
                    break;
                case 500000:
                    this.fishColor = this.colorPalette[10];
                    this.fishSize = width/3.5;
                    break;
                default:
                    console.log("error retrieving donation amount from viewer");
            }

            if (this.fishColor != null)
                tint(this.fishColor);
            else
                tint(0); // if some error occurs when receiving donation, just make the fish black

            if (this.fishSize != null){
                image(this.fish_gif, 0, 0, this.fishSize,this.fishSize);
                textSize(width/25);
                textAlign(CENTER, CENTER);
                fill(0);
                noStroke();
                text(this.username, this.fish_gif.width/9, this.fish_gif.height/9);
            }
            else
               console.log("error retrieving donation amount from viewer");

            
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
        console.log(this.hit);
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

    setDonation(donation) {
        this.donation = donation;
    }

    setPrevState (showPrevState) {
        this.showPrevState = showPrevState;
    }

    getPrevState () {
        return this.showPrevState;
    }

    isShowing() {
        // return true when showing in screen or was successfully tapped by the cat
        return !(this.position.x < -100 || this.position.x > windowWidth +100||this.position.y < -100 || this.position.y > windowHeight+100)||this.hit;
    }

    getPositionX() {
        return this.position.x;
    }

    getPositionY() {
        return this.position.y;
    }

    getAngle() {
        return this.angle;
    }

    getUsername() {
        return this.username;
    }

    getId() {
        return this.id;
    }

    setVoiceBlob(blob) {
        this.voiceBlob = blob;
    }

    playVoice() {
        if (this.voiceBlob === null) {
            return;
        }

        const blobURL = URL.createObjectURL(this.voiceBlob);
        const audio = new Audio(blobURL);
        audio.play();
    }
}