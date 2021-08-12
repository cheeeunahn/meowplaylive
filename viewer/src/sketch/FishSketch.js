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

import { socket } from 'common/Connection';

let msg; // to delete later
let successImg;
let displaySuccessImg; // boolean for displaying success icon
//let successCount;
let fishGroup;
let rectWidth;
let rectHeight;
let rectPosX;
let rectPosY;
let nanumFontRegular;
let nanumFontBold;

export function setup(Container) {
    // load font files - Nanum Square
    nanumFontRegular = loadFont('./assets/NanumSquareR.ttf');
    nanumFontBold = loadFont('./assets/NanumSquareEB.ttf');
    //load success image
    successImg = loadImage('./assets/success-image.png');
    displaySuccessImg = false;

    rectWidth = 1366 / 2;
    rectHeight = 1024 / 2; // following ipad pro screen ratio 1366px x 1024px
    rectPosX = 0; // the x position of the cat UI screen
    rectPosY = 0; // the y posiiton of the cat UI screen

    const canvas = createCanvas(rectWidth, rectHeight);
    canvas.parent(Container);

    // when success event happens
    socket.on('cat-tap-success', () => {
        //successCount++;
        msg = "success!";
        displaySuccessImg = true;
        // show success icon for 5 seconds and reset
        setTimeout(resetToDefaultScreen, 5000);
    });

    // preventing user from clicking too fast
    socket.on('number-exceeded', () => {
        msg = "click slower!";
        setTimeout(resetText, 3000);
    });

    // this is for receiving position data from cat UI
    ///////////////////////////////////////////
    socket.on('move-fish-group', (arg) => {
        //console.log(arg);
        for (var i = 0; i < fishGroup.length; i++) {
            fishGroup[i].updatePosition(arg.fish_positions[i].posX, arg.fish_positions[i].posY, arg.fish_positions[i].angle, rectWidth, rectHeight);
            fishGroup[i].updateUsername(arg.fish_positions[i].username);
            fishGroup[i].updateColor(arg.fish_positions[i].color);
        }
    });
    ///////////////////////////////////////////
    msg = "";
    //successCount = 0;

    // a group of cloned fish from cat UI
    fishGroup = [new CloneFish(), new CloneFish(), new CloneFish()];
}

export function draw() {
    background(255);
    drawCatUI();
}

// this funciton has the code for drawing the cat UI
function drawCatUI() {
    rectMode(CORNER);
    noStroke();
    fill(222,243,246); // background color of canvas
    rect(rectPosX, rectPosY, rectWidth, rectHeight);

    for (var i = 0; i < fishGroup.length; i++) {
        fishGroup[i].draw();
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
    displaySuccessImg = false;
}

class CloneFish {
    constructor() {
        this.fish_gif = loadImage('../cat/assets/fish_white.gif');
        this.fish_gif.play();

        this.px = -500;
        this.py = -500; // put it somewhere invisible
        this.position = createVector(this.px, this.py);
        this.angle = 0;

        this.username = "";

        this.fishColor = color(255,255,255);
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

    updateColor(color) {
        this.fishColor = color;
    }

    draw() {
        push();
        
        translate(this.px, this.py);
        rotate(this.angle);
        tint(this.fishColor, 255);
        image(this.fish_gif, 0, 0, 180, 180);

        textFont(nanumFontBold);
        textSize(rectWidth/32);
        textAlign(CENTER, CENTER);
        fill(10);
        noStroke();
        text(this.username, this.fish_gif.width/9, this.fish_gif.height/12);
        
        pop();
    }
}
