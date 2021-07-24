//let fish_gif;
let position;
let velocity;
let bgSound;
let laserSound;
let mouseColor;
let hit;
let poly;
let angle;
let displayRipple;
let rippleRadius;

function preload() {
    soundFormats('mp3');
    bgSound = loadSound('/assets/laser_sfx.mp3');
    laserSound = loadSound('/assets/lasersound.mp3');
    //fish_gif = loadImage('/assets/fish_blue.gif');
    angleMode(RADIANS);
}

function setup() {
    createCanvas (windowWidth,windowHeight);
    addScreenPositionFunction();

    position = createVector(random(0,windowWidth/2), random(0,windowHeight/2));
    velocity = createVector (10, 10);

    rippleRadius = 1;

    /*
    poly = [];
    poly[0] = createVector(0,0);
    poly[1] = createVector(0,0);
    poly[2] = createVector(0,0);
    poly[3] = createVector(0,0);
    */

    bgSound.setVolume(0.2);
    bgSound.loop();

    hit = false;
    displayRipple = false;
    //fish_gif.play();
}

function draw() {
    background(0);

    position.add(velocity);

    if ((position.x > width + 200) || (position.x < -100)) {
        velocity.x = velocity.x * -1;
    }
    if ((position.y > height + 200) || (position.y < -100)) {
        velocity.y = velocity.y * -1;
    }

    let c = color(0,255,0);
    c.setAlpha(150);
    fill(c);
    noStroke();
    circle(position.x-3, position.y-3, width/15, width/15);

    fill(0,255,0);
    noStroke();
    circle(position.x, position.y, width/15, width/15);

    /*
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
    
    let v1 = createVector(0,0);
    let v2 = createVector(fish_gif.width, 0);
    let v3 = createVector(fish_gif.width, fish_gif.height);
    let v4 = createVector(0,fish_gif.height);

    poly[0] = screenPosition(v1);
    poly[1] = screenPosition(v2);
    poly[2] = screenPosition(v3);
    poly[3] = screenPosition(v4);

    pop();
    */



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
        strokeWeight(7);
        stroke(0,255,0);
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
    hit = collidePointCircle(pmouseX, pmouseY, position.x, position.y, width/15);
    //hit = collidePointPoly(pmouseX, pmouseY, poly);
    //console.log(hit);
    if (hit)
    {
        position = createVector(random(0,windowWidth/2), random(-30,0));
        laserSound.setVolume(0.5);
        laserSound.play();
        displayRipple = true;
    } 
}

function mousePressed() {
    userStartAudio();
  }