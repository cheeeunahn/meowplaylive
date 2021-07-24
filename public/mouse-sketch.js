let mouse_gif;
let position;
let velocity;
let bgSound;
let squeakSound;
let hitSound;
let mouseColor;
let hit;
let poly;
let angle;
let displayRipple;
let rippleRadius;

function preload() {
    soundFormats('mp3');
    bgSound = loadSound('/assets/bgsound.mp3');
    squeakSound = loadSound('/assets/squeak.mp3');
    hitSound = loadSound('/assets/squeak2.mp3');
    mouse_gif = loadImage('/assets/mouse.gif');
    angleMode(RADIANS);
}

function setup() {
    createCanvas (windowWidth,windowHeight);
    addScreenPositionFunction();

    position = createVector(random(0,windowWidth/2), random(0,windowHeight/2));
    velocity = createVector (12, 12);

    rippleRadius = 1;

    poly = [];
    poly[0] = createVector(0,0);
    poly[1] = createVector(0,0);
    poly[2] = createVector(0,0);
    poly[3] = createVector(0,0);

    bgSound.setVolume(0.05);
    bgSound.loop();

    hit = false;
    displayRipple = false;
    mouse_gif.play();
}

function draw() {
    background(250,235,215);

    if (frameCount%250 == 0){
        squeakSound.setVolume(0.2);
        squeakSound.play();
    }


    position.add(velocity);

    if ((position.x > width + 200) || (position.x < -100)) {
        velocity.x = velocity.x * -1;
    }
    if ((position.y > height + 200) || (position.y < -100)) {
        velocity.y = velocity.y * -1;
    }

    
    push();
    translate (position.x, position.y);

    if (velocity.y > 0)
        angle = (3*PI/2)-atan(velocity.y/velocity.x)+PI;
    //rotate((3*PI/2)-atan(velocity.y/velocity.x));
    else
        angle = (-3*PI/2)-atan(velocity.y/velocity.x)+PI;
        //rotate((-3*PI/2)-atan(velocity.y/velocity.x));

    rotate(angle);
    image(mouse_gif, 0,0, width/5,width/5);
    
    let v1 = createVector(0,0);
    let v2 = createVector(mouse_gif.width, 0);
    let v3 = createVector(mouse_gif.width, mouse_gif.height);
    let v4 = createVector(0,mouse_gif.height);

    poly[0] = screenPosition(v1);
    poly[1] = screenPosition(v2);
    poly[2] = screenPosition(v3);
    poly[3] = screenPosition(v4);

    pop();



    mouseColor = color(255,255,0);
    mouseColor.setAlpha(100);
    fill(mouseColor);
    noStroke();
    if (mouseIsPressed){
        strokeWeight(5);
        stroke(50);
    }
    circle(pmouseX, pmouseY, height/15);



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

function touchEnded () {
    //console.log(poly[0]);
    hit = collidePointPoly(pmouseX, pmouseY, poly);
    //console.log(hit);
    if (hit)
    {
        position = createVector(random(0,windowWidth/2), random(-30,0));
        hitSound.setVolume(0.5);
        hitSound.play();
        displayRipple = true;
    } 
}

function mousePressed() {
    userStartAudio();
  }