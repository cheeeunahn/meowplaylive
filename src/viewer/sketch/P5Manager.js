let isP5Setup = false; // true if P5 started and global setup() (= window.setup()) is called.
let currentSketch = null; // ex. FishSketch.
let isCurrentSketchSetup = false; // true if the current sketch's setup() (ex. setupFishSketch()) is called.
let CurrentSketchContainer = undefined; // Parent element of the canvas.

window.setup = () => {
    console.log('[p5] Called setup()!');
    isP5Setup = true;
};

window.draw = () => {
    if (currentSketch === null) {
        return;
    }

    if (!isCurrentSketchSetup) {
        console.log('[p5] Starting the current sketch...');
        currentSketch.setup(CurrentSketchContainer);
        isCurrentSketchSetup = true;
    } else {
        currentSketch.draw();
    }
};

export function createSketch(Container, sketch) {
    // Clear the current sketch.
    currentSketch = null;
    isCurrentSketchSetup = false;

    // Clear the element.
    Container.innerHTML = '';

    // Set the current sketch.
    CurrentSketchContainer = Container;
    currentSketch = sketch;
}
