let mouse_gif;
let position;
let velocity;
let bgSound;
let squeakSound;
let hitSound;
let voiceSound;
let mouseColor;
let hit;
let poly;
let angle;
let displayRipple;
let rippleRadius;

function preload() {
    //load sound and image files
    soundFormats('mp3');
    bgSound = loadSound('./assets/bgsound.mp3');
    squeakSound = loadSound('./assets/squeak.mp3');
    hitSound = loadSound('./assets/squeak2.mp3');
    mouse_gif = loadImage('./assets/mouse.gif');
    voiceSound = loadSound('./uploads/test-recording.m4a');

    angleMode(RADIANS);
}

function setup() {
    createCanvas (windowWidth,windowHeight);
    addScreenPositionFunction();

    //position = createVector(random(0,windowWidth/2), random(0,windowHeight/2));
    //velocity = createVector (12, 12);

    rippleRadius = 1;

    poly = [];
    poly[0] = createVector(0,0);
    poly[1] = createVector(0,0);
    poly[2] = createVector(0,0);
    poly[3] = createVector(0,0);

    bgSound.setVolume(0.1);
    bgSound.loop();

    hit = false;
    displayRipple = false;
    mouse_gif.play();

    // socket connection
    socket = io();
    socket.on('button-clicked', drawMouse);
}

function draw() {
    background(250,235,215);

    /*
    if (frameCount%250 == 0){
        squeakSound.setVolume(0.2);
        squeakSound.play();
    }*/



    /*
    if ((position.x > width + 200) || (position.x < -100)) {
        velocity.x = velocity.x * -1;
    }
    if ((position.y > height + 200) || (position.y < -100)) {
        velocity.y = velocity.y * -1;
    } */

    if (velocity != null) {
    
        position.add(velocity);

        push();
        translate (position.x, position.y);

        if (velocity.y > 0) {
            if (velocity.x < 0)
                angle = atan(velocity.y/velocity.x)-(PI);
            else
                angle = (-3*PI/2)-atan(-velocity.y/velocity.x)-PI/2;    
        }
        else {
            if (velocity.x < 0)
                angle = (-3*PI/2)-atan(-velocity.y/velocity.x)+PI/2;
            else
                angle = (3*PI/2)-atan(-velocity.y/velocity.x)+PI/2;
        }

        rotate(angle);
        image(mouse_gif, 0,0, width/5,width/5);
        textSize(width/50);
        textAlign(CENTER, CENTER);
        fill(0);
        noStroke();
        text('WonderLab', mouse_gif.width/9, mouse_gif.height/9);
        
        let v1 = createVector(0,0);
        let v2 = createVector(mouse_gif.width, 0);
        let v3 = createVector(mouse_gif.width, mouse_gif.height);
        let v4 = createVector(0,mouse_gif.height);

        poly[0] = screenPosition(v1);
        poly[1] = screenPosition(v2);
        poly[2] = screenPosition(v3);
        poly[3] = screenPosition(v4);

        pop();
    }

    if (mouseIsPressed){
        strokeWeight(6);
        stroke(255,255,0);
    }
    else{
        noStroke();
    }
    noFill();
    circle(pmouseX, pmouseY, height/10);

    if (displayRipple) {
        noFill();
        strokeWeight(8);
        stroke(128,96,77);
        circle(pmouseX, pmouseY, rippleRadius);
        rippleRadius +=100;

        if (rippleRadius > width){
            rippleRadius = 1;
            displayRipple = false;
        }
    }
}    

function drawMouse() {
    squeakSound.setVolume(0.1);
    squeakSound.play();
    let px = random(100,windowWidth);
    let py = random(100,windowHeight);
    position = createVector(px, py);
    let vx = random(-15,15);
    let vy = random(-15,15);

    while (vx == vy || abs(vx) < 6) {
        vx = random(-15,15);
        vy = random(-15,15);
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
        hitSound.setVolume(0.5);
        hitSound.play();
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