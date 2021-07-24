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
    soundFormats('mp3');
    waterSound = loadSound('/assets/waterstream.mp3');
    voiceSound = loadSound('/assets/test-recording.m4a');
    splashSound = loadSound('/assets/splash.mp3');
    bubbleSound = loadSound('/assets/bubble.mp3');
    fish_gif = loadImage('/assets/fish_blue.gif');
    angleMode(RADIANS);
}

function setup() {
    createCanvas (windowWidth,windowHeight);
    addScreenPositionFunction();

    let px = random(0,windowWidth);
    let py = random(0,windowHeight);
    position = createVector(px, py);
    velocity = createVector (9, 9);

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
}

function draw() {
    background(226,237,238);

    if (frameCount%20 ==0) {
        let v = abs(sin(frameCount/50)*18+1);
        if (velocity.x < 0) {
            if (velocity.y < 0)
                velocity = createVector(-v,-v);
            else if (velocity.y >= 0)
                velocity = createVector(-v,v);
        }
        else if (velocity.x >= 0){
            if (velocity.y < 0)
                velocity = createVector(v,-v);
            else if (velocity.y >= 0)
                velocity = createVector(v,v);
        }
    }
    
        position.add(velocity);

    if ((position.x > width + 250) || (position.x < -200)) {
        //velocity.x = random(2,20);
        velocity.x = velocity.x * -1;
        bubbleSound.setVolume(0.1);
        bubbleSound.play();
    }
    if ((position.y > height + 250) || (position.y < -200)) {
        //velocity.y=random(2,20);
        velocity.y = velocity.y * -1;
        bubbleSound.setVolume(0.1);
        bubbleSound.play();
    }

    
    push();
    translate (position.x, position.y);

    if (velocity.y > 0)
        angle = (3*PI/2)-atan(velocity.y/velocity.x);
    //rotate((3*PI/2)-atan(velocity.y/velocity.x));
    else
        angle = (-3*PI/2)-atan(velocity.y/velocity.x);
        //rotate((-3*PI/2)-atan(velocity.y/velocity.x));

    rotate(angle);
    image(fish_gif, 0,0, width/4,width/4);
    
    textSize(width/50);
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    text('nickname', fish_gif.width/9, fish_gif.height/9);
    
    let v1 = createVector(0,0);
    let v2 = createVector(fish_gif.width, 0);
    let v3 = createVector(fish_gif.width, fish_gif.height);
    let v4 = createVector(0,fish_gif.height);

    poly[0] = screenPosition(v1);
    poly[1] = screenPosition(v2);
    poly[2] = screenPosition(v3);
    poly[3] = screenPosition(v4);

    pop();



    //mouseColor = color(255,255,0);
    //mouseColor.setAlpha(100);
    //fill(mouseColor);
    //noStroke();
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

function touchEnded () {
    //console.log(poly[0]);
    hit = collidePointPoly(pmouseX, pmouseY, poly);
    //console.log(hit);
    if (hit)
    {
        let px = random(0,windowWidth);
        let py = random(0,windowHeight);
        position = createVector(px, py);
        splashSound.setVolume(0.2);
        splashSound.play();
        voiceSound.setVolume(1.5);
        voiceSound.play();
        displayRipple = true;
    } 
}

function mousePressed() {
    userStartAudio();
  }