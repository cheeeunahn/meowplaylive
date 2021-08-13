/**
 * Sketch for drawing fish on cat UI
 * Using p5.gif.js from https://github.com/ridmitri/p5gif
 * p5.js screen X screen Y functions from https://github.com/bohnacker/p5js-screenPosition
 */


let waterSound;
let bubbleSound;
//let voiceSound;

let fishGroup;
let tempFish; // for making the cat feel as if it caught the fish
let tempFishPosX;
let tempFishPosY;
let tempFishAngle;

let displayRipple;
let rippleRadius;
let username;

let titleNickname;


function preload() {
    // load the necessary sound files
    soundFormats('mp3');
    waterSound = loadSound('./assets/waterstream.mp3');
    //voiceSound = loadSound('./uploads/test-recording.m4a');
    splashSound = loadSound('./assets/splash.mp3');
    bubbleSound = loadSound('./assets/bubble.mp3');

    //set angle mode
    angleMode(RADIANS);
}

function setup() {
    // this was just for testing purposes
    // simulating iOS mobile environment
    //getAudioContext().suspend();

    tempFish = loadGif('./assets/fish_white.gif');
    tempFishPosX = -1000;
    tempFishPosY = -1000;

    // load font files - Nanum Square
    nanumFontRegular = loadFont('./assets/NanumSquareR.ttf');
    nanumFontBold = loadFont('./assets/NanumSquareEB.ttf');

    // create canvas
    createCanvas (windowWidth,windowHeight);
    // add screen pointer
    addScreenPositionFunction();

    //play background sound
    waterSound.setVolume(0.2);
    waterSound.loop();

    rippleRadius = 1;
    displayRipple = false;

    // a group of fish, the maximum allowed size is 3
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

    textFont(nanumFontBold);
    textSize(width/12);
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    text(titleNickname, width/2, 120);

    if (fishGroup !== null || fishGroup.length != 0) {
        for (var i = 0; i < fishGroup.length; i++){
            fishGroup[i].show();
            if (!fishGroup[i].isShowing()){
                //if isShowing() value change occurs from true to false, trigger emit event
                //fish x position is set to -1000 when it is hit
                if (fishGroup[i].getPrevState()==true && fishGroup[i].getPositionX()!=-5000)
                    socket.emit('cat-tap-fail', fishGroup[i].getId());
            }
            fishGroup[i].setPrevState(fishGroup[i].isShowing()); // save previous isShowing() value
        }
    }

    if (tempFish != null && tempFishPosX >= 0) {
        push();
        translate(mouseX, mouseY)
        rotate(tempFishAngle);
        imageMode(CENTER);
        tint(0);
        image(tempFish, 0, 0, windowWidth/2.5, windowWidth/2.5);
        pop();
    }

    // tell viewer UI where the fish is positioned at what angle
    // also send fish nickname information
    let data = { fish_positions: [
        {posX: fishGroup[0].getPositionX()/windowWidth, posY: fishGroup[0].getPositionY()/windowHeight, angle: fishGroup[0].getAngle(), username: fishGroup[0].getUsername(), r: fishGroup[0].getRedColor(), g: fishGroup[0].getGreenColor(), b: fishGroup[0].getBlueColor()},
        {posX: fishGroup[1].getPositionX()/windowWidth, posY: fishGroup[1].getPositionY()/windowHeight, angle: fishGroup[1].getAngle(), username: fishGroup[1].getUsername(), r: fishGroup[1].getRedColor(), g: fishGroup[1].getGreenColor(), b: fishGroup[1].getBlueColor()},
        {posX: fishGroup[2].getPositionX()/windowWidth, posY: fishGroup[2].getPositionY()/windowHeight, angle: fishGroup[2].getAngle(), username: fishGroup[2].getUsername(), r: fishGroup[2].getRedColor(), g: fishGroup[2].getGreenColor(), b: fishGroup[2].getBlueColor()} ]};
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
        if ((fishGroup[i].getPositionX() > windowWidth || fishGroup[i].getPositionX() < 0)&&
            (fishGroup[i].getPositionY() > windowHeight || fishGroup[i].getPositionY() < 0)) {
            fishGroup[i].setUsername(username);
            fishGroup[i].setId(data.socketid); // the socket id of the fish
            fishGroup[i].setVoiceFileName(data.audioFileName); // audio recorded by the user
            fishGroup[i].setDonation(data.donation);
            fishGroup[i].setToNewPosition();
            if (data.donation > 10000) {
                bubbleSound.setVolume(1);
            }
            else {
                bubbleSound.setVolume(0.4);
            }
            if (bubbleSound.isPlaying())
                bubbleSound.stop();
            bubbleSound.play();
            return;
        }
    }
    socket.emit('number-exceeded', data);
    console.log(data);
}

function touchStarted () {
    for (var i = 0; i < fishGroup.length; i++){
        if (fishGroup[i].checkHit()) {
            this.splashSound.setVolume(1);
            if (this.splashSound.isPlaying())
                this.splashSound.stop();
            this.splashSound.play();
            //this.voiceSound.setVolume(2.0);
            //if (this.voiceSound.isPlaying())
            //    this.voiceSound.stop();    
            //this.voiceSound.play();
            fishGroup[i].playVoice(); // Play the voice recorded by the user.
            titleNickname = "Thank you," + fishGroup[i].username;
            
            tempFishPosX = mouseX;
            tempFishPosY = mouseY;
            tempFishAngle = fishGroup[i].getAngle();

            setTimeout(() => {
                tempFishPosX = -1000;
                tempFishPosY = -1000;
            }, 1500);

            setTimeout(() => {
                titleNickname = "";
            }, 5000);
        }
    }
}

/**
 * mousePressed() is a must for iOS and Android
 * optional for Desktop Chrome, but do not delete
 */
function mousePressed() {
    userStartAudio();
}

// A class for drawing fish
class Fish {
    constructor() {
        this.fish_gif = loadGif('./assets/fish_white.gif')
        //this.fish_gif = loadImage('./assets/fish_blue.gif');
        if(this.fish_gif.loaded())
            this.fish_gif.play();

        // fish colors
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
        this.fishColor = color(255,0,0);

        // voice file name recorded by user.
        this.voiceFileName = null;
    }

    setToNewPosition() {

        this.locX_index = Math.floor(Math.random() * 2);
        this.locY_index = Math.floor(Math.random() * 2);
        this.location_x = [10, windowWidth-10];
        this.location_y = [10, windowHeight-10];

        this.px = this.location_x[this.locX_index];
        this.py = this.location_y[this.locY_index];

        /*if (this.px > 50 && this.px <= windowWidth/2) {
            this.px = 50;
        }
        else if (this.px < windowWidth-50) {
            this.px = windowWidth-50;
        }*/

        this.position = createVector(this.px, this.py);

        do {
            this.vx = random(-12,12);
            this.vy = random(-12,12);
        }while(abs(this.vx)<5 || abs(this.vy)<5);
    
        /*
        if (this.py >= windowHeight/2-50 && this.py <= windowHeight/2+50) {
            while (abs(this.vx)>10 && abs(this.vy)>7) {
                this.vx = random(-12,12);
                this.vy = random(-12,12);
            }
        }

        if (this.px >= windowWidth/2-50 && this.px <= windowWidth/2+50) {
            while (abs(this.vx)>5 && abs(this.vy)<10) {
                this.vx = random(-12,12);
                this.vy = random(-12,12);
            }
        }*/

        if ((this.vx > 0 && this.px > windowWidth/2)||(this.vx < 0 && this.px < windowWidth/2)){
            this.vx = -this.vx;
        }
        
        if ((this.vy > 0 && this.py > windowHeight/2)||(this.vy < 0 && this.py < windowHeight/2))
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

            blendMode(MULTIPLY);
            switch (this.donation){
                case 1000:
                    this.fishColor = this.colorPalette[0];
                    this.fishSize = width/5;
                    tint(0,100);
                    break;
                case 2000:
                    this.fishColor = this.colorPalette[1];
                    this.fishSize = width/4.5;
                    tint(0,120);
                    break;
                case 5000:
                    this.fishColor = this.colorPalette[2];
                    this.fishSize = width/4.5;
                    tint(0,130);
                    break;
                case 10000:
                    this.fishColor = this.colorPalette[3];
                    this.fishSize = width/4;
                    tint(0,140);
                    break;
                case 20000:
                    this.fishColor = this.colorPalette[4];
                    this.fishSize = width/4;
                    tint(0,150);
                    break;
                case 50000:
                    this.fishColor = this.colorPalette[5];
                    this.fishSize = width/3.5;
                    tint(0,160);
                    break;
                case 100000:
                    this.fishColor = this.colorPalette[6];
                    this.fishSize = width/3;
                    tint(0,170);
                    break;
                case 200000:
                    this.fishColor = this.colorPalette[7];
                    this.fishSize = width/3;
                    tint(0,180);
                    break;
                case 300000:
                    this.fishColor = this.colorPalette[8];
                    this.fishSize = width/3;
                    tint(0,190);
                    break;
                case 400000:
                    this.fishColor = this.colorPalette[9];
                    this.fishSize = width/3;
                    tint(0,200);
                    break;
                case 500000:
                    this.fishColor = this.colorPalette[10];
                    this.fishSize = width/2.5;
                    tint(0,255);
                    break;
                default:
                    break;
                    //console.log("error retrieving donation amount from viewer");
            }

            if (this.fishSize != null){
                tint(this.fishColor,255);
                imageMode(CENTER);
                image(this.fish_gif, 0, 0, this.fishSize,this.fishSize);
                
                textSize(width/25);
                textAlign(CENTER, CENTER);
                fill(0);
                noStroke();
                text(this.username, this.fish_gif.width/9, this.fish_gif.height/9);
            }

            
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
            displayRipple = true;
            socket.emit('cat-tap-success', this.id); // send the socket id of this fish object
            this.px = -5000;
            this.py = -5000; // put it somewhere invisible
            this.velocity = createVector(0,0);
            this.position = createVector(this.px, this.py);
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

    getRedColor () {
        return red(this.fishColor);
    }

    getGreenColor () {
        return green(this.fishColor);
    }

    getBlueColor () {
        return blue(this.fishColor);
    }

    isShowing() {
        // return true when showing in screen
        return !((this.position.x < 0 || this.position.x > windowWidth)&&(this.position.y < 0 || this.position.y > windowHeight));
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

    setVoiceFileName(audioFileName) {
        this.voiceFileName = audioFileName;
    }

    playVoice() {
        console.log(`Playing ${this.voiceFileName}...`);

        const voiceSound = loadSound(`./uploads/${this.voiceFileName}`, () => {
            voiceSound.play();
        });
    }
}