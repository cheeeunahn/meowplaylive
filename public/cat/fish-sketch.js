let fish_gif;
let position;
let velocity;
let waterSound;
let splashSound;
let voiceSound;
let bubbleSound;
let mouseColor;
let hit;
let poly;
let angle;
let displayRipple;
let rippleRadius;

function preload() {
    // load sound and image files
    soundFormats('mp3');
    waterSound = loadSound('./assets/waterstream.mp3');
    voiceSound = loadSound('./uploads/test-recording.m4a');
    splashSound = loadSound('./assets/splash.mp3');
    bubbleSound = loadSound('./assets/bubble.mp3');
    fish_gif = loadImage('./assets/fish_blue.gif');

    angleMode(RADIANS);
}

function setup() {
    createCanvas (windowWidth,windowHeight);
    addScreenPositionFunction();

    /*
    let px = random(0,windowWidth);
    let py = random(0,windowHeight);
    position = createVector(px, py);
    velocity = createVector (9, 9);
    */

    rippleRadius = 1;

    poly = [];
    poly[0] = createVector(0,0);
    poly[1] = createVector(0,0);
    poly[2] = createVector(0,0);
    poly[3] = createVector(0,0);

    waterSound.setVolume(0.2);
    waterSound.loop();

    hit = false;
    displayRipple = false;

    fish_gif.play();

    // socket connection
    socket = io();
    socket.on('button-clicked', drawFish);
}

function draw() {
    background(226,237,238);

    if (velocity != null) {
        
        position.add(velocity);
        
        push();
        translate (position.x, position.y);

        if (velocity.y > 0) {
            if (velocity.x > 0)
                angle = atan(velocity.y/velocity.x)-(PI);
            else
                angle = (-3*PI/2)-atan(-velocity.y/velocity.x)-PI/2;    
        }
        else {
            if (velocity.x > 0)
                angle = (-3*PI/2)-atan(-velocity.y/velocity.x)+PI/2;
            else
                angle = (3*PI/2)-atan(-velocity.y/velocity.x)+PI/2;
        }
        rotate(angle);

        image(fish_gif, 0,0, width/4,width/4);
        textSize(width/50);
        textAlign(CENTER, CENTER);
        fill(0);
        noStroke();
        text('WonderLab', fish_gif.width/9, fish_gif.height/9);
        
        let v1 = createVector(0,0);
        let v2 = createVector(fish_gif.width, 0);
        let v3 = createVector(fish_gif.width, fish_gif.height);
        let v4 = createVector(0,fish_gif.height);

        poly[0] = screenPosition(v1);
        poly[1] = screenPosition(v2);
        poly[2] = screenPosition(v3);
        poly[3] = screenPosition(v4);

        pop();
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

function drawFish () {
    bubbleSound.setVolume(0.4);
    bubbleSound.play();
    let px = random(10,windowWidth+10);
    let py = random(10,windowHeight-100);
    position = createVector(px, py);
    let vx = random(-12,12);
    let vy = random(-12,12);

    while (vx == vy || abs(vx) < 6) {
        vx = random(-12,12);
        vy = random(-12,12);
    }

    if (vx > 0 && px > windowWidth/2)
        vx = -vx;
    if (vy > 0 && py > windowHeight/2)
        vy = -vy;

    velocity = createVector (vx, vy);
}

function touchEnded () {
    //console.log(poly[0]);
    hit = collidePointPoly(pmouseX, pmouseY, poly);
    //console.log(hit);
    if (hit)
    {
        let px = -500;
        let py = -500; // put it somewhere invisible
        position = createVector(px, py);
        velocity = createVector(0,0);
        splashSound.setVolume(0.7);
        splashSound.play();
        voiceSound.setVolume(2.0);
        if (voiceSound.isPlaying())
            voiceSound.stop();    
        voiceSound.play();
        displayRipple = true;
    } 
}

function mousePressed() {
    userStartAudio();
  }