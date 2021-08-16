/**
 * Sketch for drawing fish on cat UI
 * Using p5.gif.js from https://github.com/ridmitri/p5gif
 * p5.js screen X screen Y functions from https://github.com/bohnacker/p5js-screenPosition
 */


let waterSound;
let bubbleSound;
let touchSound;
let splashSound;

let bgColor; // the background color of this sketch

let fishGroup;
let tempFish; // for making the cat feel as if it caught the fish
let tempFishPosX;
let tempFishPosY;
let tempFishAngle;
let defaultFish; // default fish just swimming around
let defaultCaught; // boolean for determining whether cat got the default fish

let displayRipple;
let rippleRadius;
let username;

let titleNickname; // for displaying winner nickname

let touchPosX;
let touchPosY;

function preload() {
    // load the necessary sound files
    soundFormats('mp3');
    waterSound = loadSound('./assets/waterstream.mp3');
    // a test voice recording
    //let voiceSound = loadSound('./uploads/test-recording.m4a');
    touchSound = loadSound('./assets/splash.mp3');
    bubbleSound = loadSound('./assets/bubble.mp3');
    splashSound = loadSound('./assets/touchsplash.mp3');

    //set angle mode
    angleMode(RADIANS);
}

function setup() {
    // this was just for testing purposes
    // simulating iOS mobile environment
    //getAudioContext().suspend();

    bgColor = color(222,243,246);

    tempFish = loadGif('./assets/realfish.gif');
    tempFish.pause();
    tempFishPosX = -1000;
    tempFishPosY = -1000;

    touchPosX = -1000;
    touchPosY = -1000;
    
    defaultFish = new Fish("default");
    defaultFish.setToNewPosition();
    defaultCaught = false;

    // load font files - Nanum Square
    nanumFontRegular = loadFont('./assets/NanumSquareR.ttf');
    nanumFontBold = loadFont('./assets/NanumSquareEB.ttf');

    // create canvas
    createCanvas (windowWidth,windowHeight);
    // add screen pointer
    addScreenPositionFunction();

    //play background sound
    waterSound.setVolume(0.3);
    waterSound.loop();

    rippleRadius = 1;
    displayRipple = false;

    // a group of fish, the maximum allowed size is 3
    fishGroup = [new Fish(), new Fish(), new Fish()];

    titleNickname = "";

    // socket connection
    socket = io();
    socket.on('connect', () => {
        socket.emit('drawType', "fish");
     });
    // when viewer button is clicked, draw the fish
    socket.on('name-sent', (name) => {
        username = name;
        console.log(name);
      });
    socket.on('button-clicked', drawFish);
}

function draw() {
    //background(222,243,246);
    // background color of canvas
    background(bgColor);
    let showDefaultFish = false;

    textFont(nanumFontBold);
    textSize(windowWidth/12.5);
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    text(titleNickname, width/2, height/10);

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

    for (var i = 0; i < fishGroup.length; i++){
        if(fishGroup[i].isShowing()){
            showDefaultFish = false;
            break;
        }
        else
            showDefaultFish = true;
    }

    if (showDefaultFish && !defaultCaught) {
        defaultFish.show();
        if(!defaultFish.isShowing()) {
            defaultFish.setToNewPosition();
            bubbleSound.setVolume(0.1);
            if (bubbleSound.isPlaying())
                bubbleSound.stop();
            bubbleSound.play();
        }
    }
    else{
        defaultFish.hide();
    }

    if (tempFish != null && tempFishPosX >= 0) {
        push();
        translate(mouseX, mouseY)
        tempFishPosX = mouseX;
        tempFishPosY = mouseY;
        rotate(tempFishAngle);
        imageMode(CENTER);
        image(tempFish, 0, 0, windowWidth/2.5, windowWidth/2.5);
        pop();
    }

    // tell viewer UI where the fish is positioned at what angle
    // also send fish nickname information
    let data = { fish_positions: [
        {posX: fishGroup[0].getPositionX()/windowWidth, posY: fishGroup[0].getPositionY()/windowHeight, angle: fishGroup[0].getAngle(), username: fishGroup[0].getUsername(), r: fishGroup[0].getRedColor(), g: fishGroup[0].getGreenColor(), b: fishGroup[0].getBlueColor(), id: fishGroup[0].getId(), size: fishGroup[0].getFishSize()/windowWidth},
        {posX: fishGroup[1].getPositionX()/windowWidth, posY: fishGroup[1].getPositionY()/windowHeight, angle: fishGroup[1].getAngle(), username: fishGroup[1].getUsername(), r: fishGroup[1].getRedColor(), g: fishGroup[1].getGreenColor(), b: fishGroup[1].getBlueColor(), id: fishGroup[1].getId(), size: fishGroup[1].getFishSize()/windowWidth},
        {posX: fishGroup[2].getPositionX()/windowWidth, posY: fishGroup[2].getPositionY()/windowHeight, angle: fishGroup[2].getAngle(), username: fishGroup[2].getUsername(), r: fishGroup[2].getRedColor(), g: fishGroup[2].getGreenColor(), b: fishGroup[2].getBlueColor(), id: fishGroup[2].getId(), size: fishGroup[2].getFishSize()/windowWidth},
        {posX: defaultFish.getPositionX()/windowWidth, posY: defaultFish.getPositionY()/windowHeight, angle: defaultFish.getAngle(), username: defaultFish.getUsername(), r: defaultFish.getRedColor(), g: defaultFish.getGreenColor(), b: defaultFish.getBlueColor(), id: defaultFish.getId(), size: defaultFish.getFishSize()/windowWidth}],
        touch_positions:{posX: touchPosX/windowWidth, posY: touchPosY/windowHeight}, drawType: {type: 'fish', bg_r: red(bgColor), bg_g: green(bgColor), bg_b: blue(bgColor)}, temp_positions: {posX: tempFishPosX/windowWidth, posY: tempFishPosY/windowHeight, angle: tempFishAngle}};
    socket.emit('move-fish-group', data);

    if (mouseIsPressed) {
        strokeWeight(6);
        stroke(255);
    }
    else {
        noStroke();
    }
    noFill()
    circle(pmouseX, pmouseY, height/10);


    if (displayRipple) {
        noFill();
        strokeWeight(10);
        stroke(255);
        circle(pmouseX, pmouseY, rippleRadius);
        rippleRadius +=100;

        if (rippleRadius > width){
            rippleRadius = 0;
            displayRipple = false;
        }
    }
}

function drawFish (data) {
    for (var i = 0; i < fishGroup.length; i++){
        if ((fishGroup[i].getPositionX() > windowWidth || fishGroup[i].getPositionX() < 0)||
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

function touchEnded () {
    touchPosX = mouseX;
    touchPosY = mouseY;

    setTimeout(() => {
        touchPosX = -1000;
        touchPosY = -1000;
    }, 300);

    if(defaultFish.checkHit()){
        defaultCaught = true;
        tempFishPosX = mouseX;
        tempFishPosY = mouseY;
        tempFishAngle = defaultFish.getAngle();

        setTimeout(() => {
            defaultCaught = false;
            tempFishPosX = -1000;
            tempFishPosY = -1000;
        }, 1000);
    }

    for (var i = 0; i < fishGroup.length; i++){
        if (fishGroup[i].checkHit()) {
            splashSound.setVolume(1);
            if (splashSound.isPlaying())
                splashSound.stop();
            splashSound.play();
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
        else {
            touchSound.setVolume(0.35);
            if (splashSound.isPlaying()||touchSound.isPlaying())
                touchSound.stop();
            if (!splashSound.isPlaying())
                touchSound.play();
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
    constructor(arg) {
        if (arg != null ) {
            this.fish_gif = loadGif('./assets/realfish.gif');
        }
        else {
            this.fish_gif = loadGif('./assets/realfish.gif')
        }
        //this.fish_gif = loadImage('./assets/fish_blue.gif');
        /*if(this.fish_gif.loaded())
            this.fish_gif.play();*/

        // fish colors
        this.colorPalette = [color(81, 252, 215), color(81, 243, 252), color(64, 204, 255),
            color(71, 149, 252), color(64, 134, 255), color(64, 74, 255), color(102, 64, 255)];

        this.px = -1000;
        this.py = -1000; // put it somewhere invisible
        this.position = createVector(this.px, this.py);
        this.velocity = createVector(0,0);

        this.fishSize = windowWidth/4.8;

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
        
        this.fishColor = color(255);

        // voice file name recorded by user.
        this.voiceFileName = null;
        this.voiceSound = null;

        this.fishMoveRandom = random(-1.5,1.5);
    }

    setToNewPosition() {
        this.fishMoveRandom = random(-1.5,1.5);

        if (this.donation >= 10000) {
            this.locX_index = Math.floor(Math.random() * 2);
            this.locY_index = Math.floor(Math.random() * 2);
            this.location_x = [10, windowWidth-10];
            this.location_y = [10, windowHeight-10];
            this.px = this.location_x[this.locX_index];
            this.py = this.location_y[this.locY_index];
        }

        else {
            this.px = random(10,windowWidth-10);
            this.py = random(10, windowHeight-10);
        }

        this.position = createVector(this.px, this.py);


        if (this.donation >= 10000){
            this.vx = random(7,10);
            this.vy = random(7,10);
        }
        else if (this.donation > 0) {
            do{
                this.vx = random (-10, 10);
                this.vy = random(-10, 10);
            }while (abs(this.vx) < 5);
        }
        else {
            do{
                this.vx = random (-8, 8);
                this.vy = random(-8, 8);
            }while (abs(this.vx) < 4);
        }

        if ((this.vx > 0 && this.px > windowWidth/2)||(this.vx < 0 && this.px < windowWidth/2)){
            this.vx = -this.vx;
        }
        
        if ((this.vy > 0 && this.py > windowHeight/2)||(this.vy < 0 && this.py < windowHeight/2))
            this.vy = -this.vy;
    
        this.velocity = createVector (this.vx, this.vy);
    }

    hide() {
        this.px = -5000;
        this.py = -5000; // put it somewhere invisible
        this.velocity = createVector(0,0);
        this.position = createVector(this.px, this.py);
    }

    show() {
        if (this.velocity != null) {

            // if it is a default fish
            if (this.donation < 0){
                if (this.position.x > windowWidth/2){
                    this.velocity.add(createVector(this.fishMoveRandom,this.fishMoveRandom));
                }
                else if (this.position.x > windowWidth/3){
                    this.velocity.add(createVector(this.fishMoveRandom,this.fishMoveRandom));
                }
            }

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

            //blendMode(MULTIPLY);
            switch (this.donation){
                case 1000:
                    this.fishColor = this.colorPalette[0];
                    this.fishSize = width/5;
                    //tint(0,100);
                    break;
                case 2000:
                    this.fishColor = this.colorPalette[1];
                    this.fishSize = width/4.5;
                    //tint(0,120);
                    break;
                case 5000:
                    this.fishColor = this.colorPalette[2];
                    this.fishSize = width/4;
                    //tint(0,130);
                    break;
                case 10000:
                    this.fishColor = this.colorPalette[3];
                    this.fishSize = width/3.5;
                    //tint(0,140);
                    break;
                case 20000:
                    this.fishColor = this.colorPalette[4];
                    this.fishSize = width/3;
                    //tint(0,150);
                    break;
                case 50000:
                    this.fishColor = this.colorPalette[5];
                    this.fishSize = width/2.5;
                    //tint(0,160);
                    break;
                case 100000:
                    this.fishColor = this.colorPalette[6];
                    this.fishSize = width/2;
                    //tint(0,170);
                    break;
                case 200000:
                    this.fishColor = this.colorPalette[6];
                    this.fishSize = width/2;
                    //tint(0,180);
                    break;
                case 300000:
                    this.fishColor = this.colorPalette[6];
                    this.fishSize = width/2;
                    //tint(0,190);
                    break;
                case 400000:
                    this.fishColor = this.colorPalette[6];
                    this.fishSize = width/2;
                   // tint(0,200);
                    break;
                case 500000:
                    this.fishColor = this.colorPalette[6];
                    this.fishSize = width/2;
                    //tint(0,255);
                    break;
                default:
                    break;
                    //console.log("error retrieving donation amount from viewer");
            }

            if (this.donation > 0){
                blendMode(BURN);
            }
            else {
                blendMode(MULTIPLY);
            }

            if (this.fishSize != null){
                tint(this.fishColor,120);
                imageMode(CENTER);
                image(this.fish_gif, 0, 0, this.fishSize,this.fishSize);
                
                textSize(width/25);
                textAlign(CENTER, CENTER);
                fill(0);
                noStroke();
                text(this.username, this.fish_gif.width/9, this.fish_gif.height/9);
            }

            
            // setting collider boundaries
            this.v1 = createVector(-this.fish_gif.width/2,-this.fish_gif.height/2);
            this.v2 = createVector(this.fish_gif.width/2, -this.fish_gif.height/2);
            this.v3 = createVector(this.fish_gif.width/2, this.fish_gif.height/2);
            this.v4 = createVector(-this.fish_gif.width/2,this.fish_gif.height/2);
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
            if (this.donation > 0)
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

    getFishSize () {
        return this.fishSize;
    }

    isShowing() {
        // return true when showing in screen
        return !((this.position.x < 0 || this.position.x > windowWidth)||(this.position.y < 0 || this.position.y > windowHeight));
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

        if ((this.voiceSound !== null) && this.voiceSound.isPlaying()) {
            this.voiceSound.stop();
        }

        this.voiceSound = loadSound(`./uploads/${this.voiceFileName}`, () => {
            this.voiceSound.setVolume(1.5);
            if (this.voiceSound.isLoaded()) {
                this.voiceSound.play();
            }
        });
    }
}