let isP5Setup = false; // true if P5 started and global setup() (= window.setup()) is called.
let currentSketch: any = null; // ex. FishSketch.
let isCurrentSketchSetup = false; // true if the current sketch's setup() (ex. setupFishSketch()) is called.
let CurrentSketchContainer: Element | undefined = undefined; // Parent element of the canvas.

function defineGlobalVariable<T>(name: string, value: T) {
    (window as any)[name] = value;
}

defineGlobalVariable('setup', () => {
    console.log('[p5] Called setup()!');
    isP5Setup = true;
});

defineGlobalVariable('draw', () => {
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
});

export function createSketch<T>(Container: Element, sketch: T) {
    // Clear the current sketch.
    currentSketch = null;
    isCurrentSketchSetup = false;

    // Clear the element.
    Container.innerHTML = '';

    // Set the current sketch.
    CurrentSketchContainer = Container;
    currentSketch = sketch;
}
