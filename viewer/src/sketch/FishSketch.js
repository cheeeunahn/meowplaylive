/**
 * Modified parts
 * - import io from 'socket.io-client'
 * - function setup() -> export function setup(Container)
 * - function draw() -> export fnction draw()
 * - createCanvas(windowWidth, windowHeight) -> rectPosX = 0, rectPosY = 0, createCanvas(rectWidth, rectHeight)
 * - Run canvas.parent() after running createCanvas()
 */

/**
 * Modified by Chee Eun
 * - Use Nanum Square font to cat UI text
 * - Minor color changes
 * - Added success icon image (need to add on to it after implementing "click me" function on viewer-screen.html)
 */

import { socket } from 'common/Connection'

let msg; // display thank you message
let fishGroup;
let rectWidth;
let rectHeight;
let rectPosX;
let rectPosY;
let nanumFontLight;
let nanumFontRegular;
let nanumFontBold;
let pawprint;
let pawprintLocX;
let pawprintLocY;
let displayRipple;
let rippleRadius;
let drawType;

export function setup(Container) {
    // load font files - Nanum Square
    nanumFontLight = loadFont('./assets/NanumSquareL.ttf');
    nanumFontRegular = loadFont('./assets/NanumSquareR.ttf');
    nanumFontBold = loadFont('./assets/NanumSquareB.ttf');

    rectWidth = 1366 / 2;
    rectHeight = 1024 / 2; // following ipad pro screen ratio 1366px x 1024px
    rectPosX = 0; // the x position of the cat UI screen
    rectPosY = 0; // the y posiiton of the cat UI screen

    pawprint = loadImage('./assets/paw.png');
    pawprintLocX = -1000;
    pawprintLocY = -1000;
    displayRipple = false;
    rippleRadius = 0;

    drawType = 'mouse';
    fishGroup = null;

    const canvas = createCanvas(rectWidth, rectHeight);
    canvas.parent(Container);

    console.log(socket.id);

    socket.on('drawType', (arg) => {
        drawType = arg;
        console.log("I am:" + drawType);
        // a group of cloned fish from cat UI
        fishGroup = [new CloneFish(drawType), new CloneFish(drawType), new CloneFish(drawType), new CloneFish(drawType+"default")];
    })

    // when success event happens
    socket.on('cat-tap-success', () => {
        //successCount++;
        msg = "the cat heard you!";
        // show success icon for 5 seconds and reset
        setTimeout(resetToDefaultScreen, 5000);
    });

    // this is for receiving position data from cat UI
    ///////////////////////////////////////////
    socket.on('move-fish-group', (arg) => {
        //console.log("this is the id: " + this.socket.id);
        //console.log(arg.fish_positions[0].id);
        if (fishGroup !== null) {
            for (var i = 0; i < fishGroup.length; i++) {
                fishGroup[i].updatePosition(arg.fish_positions[i].posX, arg.fish_positions[i].posY, arg.fish_positions[i].angle, rectWidth, rectHeight);
                fishGroup[i].updateUsername(arg.fish_positions[i].username);
                fishGroup[i].updateColor(arg.fish_positions[i].r, arg.fish_positions[i].g, arg.fish_positions[i].b);
                if(arg.fish_positions[i].id.localeCompare(socket.id) == 0) {
                    fishGroup[i].highlightState();
                }
                else {
                    fishGroup[i].normalState();
                }
            }
        }

        pawprintLocX = rectPosX + rectWidth * (arg.touch_positions.posX);
        pawprintLocY = rectPosY + rectHeight * (arg.touch_positions.posY);
    });
    ///////////////////////////////////////////
    msg = "";

    
}

export function draw() {
    background(255);
    drawCatUI();

    textFont(nanumFontRegular);
    textSize(height/30);
    textAlign(CENTER, RIGHT);
    fill(0);
    noStroke();
    text("[Cat Screen Viewer]", width/7, height/20);

    textFont(nanumFontBold);
    textSize(width/40);
    textAlign(CENTER, CENTER);
    fill(0);
    noStroke();
    text(msg, width/2, height/5);

    imageMode(CENTER);
    image(pawprint, pawprintLocX, pawprintLocY, width/10, width/10);

    if (pawprintLocX > 0 && pawprintLocY > 0)
        displayRipple = true;
    else {
        displayRipple = false;
        rippleRadius = 0;
    }

    if (displayRipple) {
        noFill();
        strokeWeight(2);
        stroke(244,143,177);
        circle(pawprintLocX, pawprintLocY, rippleRadius);
        rippleRadius +=10;

        if (rippleRadius > width/2){
            rippleRadius = 0;
            displayRipple = false;
        }
    }
}

// this funciton has the code for drawing the cat UI
function drawCatUI() {
    rectMode(CORNER);
    noStroke();
    fill(222,243,246); // background color of canvas
    rect(rectPosX, rectPosY, rectWidth, rectHeight);

    if (fishGroup !== null){
        for (var i = 0; i < fishGroup.length; i++) {
            fishGroup[i].draw();
        }
    }

    push();
    translate(rectPosX + rectWidth / 2, rectPosY + rectHeight / 2)

    beginShape();
    vertex(-windowWidth, -windowHeight);
    vertex(-windowWidth, windowHeight);
    vertex(windowWidth, windowHeight);
    vertex(windowWidth, -windowHeight);

    fill(255); // fill with background color of website (white)

    beginContour();
    vertex(-rectWidth / 2 + 5, -rectHeight / 2 + 5);
    vertex(rectWidth / 2 - 5, -rectHeight / 2 + 5);
    vertex(rectWidth / 2 - 5, rectHeight / 2 - 5);
    vertex(-rectWidth / 2 + 5, rectHeight / 2 - 5);
    endContour();
    endShape(CLOSE);

    pop();

}

function resetToDefaultScreen() {
    msg = "";
}

class CloneFish {
    constructor(arg) {
        this.fishSize = 0;
        this.fishType = arg;
        if (arg.localeCompare("fishdefault")==0){ // default fish swimming around
            this.fishSize = 100;
            this.fish_gif = loadImage('../cat/assets/fish_blue.gif');
        }
        else if (arg.localeCompare("mousedefault")==0){ // default fish swimming around
            this.fishSize = 100;
            this.fish_gif = loadImage('../cat/assets/mouse.gif');
        }
        else if (arg.localeCompare("fish")==0){
            this.fishSize = 180;
            this.fish_gif = loadImage('../cat/assets/realfish.gif');
        }
        else if (arg.localeCompare("mouse")==0){
            this.fishSize = 180;
            this.fish_gif = loadImage('../cat/assets/mouse.gif');
        }
        
        this.fish_gif.play();

        this.px = -500;
        this.py = -500; // put it somewhere invisible
        this.position = createVector(this.px, this.py);
        this.angle = 0;

        this.username = "";

        this.fishColor = color(255,255,255);

        this.textColor = color(0);
        this.fontStyle = loadFont('./assets/NanumSquareL.ttf');
    }

    updatePosition(px, py, angle, rectWidth, rectHeight) {
        this.px = rectPosX + rectWidth * px;
        this.py = rectPosY + rectHeight * py;
        this.position = createVector(this.px, this.py);
        this.angle = angle;
    }

    updateUsername(username) {
        this.username = username;
    }

    updateColor(r,g,b) {
        this.fishColor = color(r,g,b);
    }

    highlightState() {
        this.textColor = color(0,0,255);
        this.fontStyle = nanumFontBold;
    }

    normalState() {
        this.textColor = color(0);
        this.fontStyle = nanumFontLight;
    }

    draw() {
        push();
        
        translate(this.px, this.py);
        if (this.fishType.localeCompare("mouse")==0||this.fishType.localeCompare("mousedefault")==0)
            rotate(this.angle+PI);
        else
            rotate(this.angle);

        if (this.username != "")
        {
            blendMode(BURN);
            tint(this.fishColor, 255);
        }

        imageMode(CENTER);
        image(this.fish_gif, 0, 0, this.fishSize, this.fishSize);

        textFont(this.fontStyle);
        textSize(rectWidth/32);
        textAlign(CENTER, CENTER);
        fill(this.textColor);
        noStroke();
        text(this.username, this.fish_gif.width/9, this.fish_gif.height/10);
        
        pop();
    }
}
