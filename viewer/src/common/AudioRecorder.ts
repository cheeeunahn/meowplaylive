let recorder: MediaRecorder | null = null;
let chunks: Blob[] = [];
let stopListeners = new Set<(blob: Blob) => void>();

// Check whether recording is supported on this computer.
if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    alert('Recording is not supported on this computer! Connect a microphone and reload the page.');
}

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    recorder = new MediaRecorder(stream);

    recorder.addEventListener('dataavailable', event => {
        chunks.push(event.data);
    });

    recorder.addEventListener('stop', () => {
        // Create the result.
        const resultBlob = new Blob(chunks, { 'type': 'audio/mp3' });

        // Clear the current data.
        chunks = [];

        stopListeners.forEach(listener => {
            listener(resultBlob);
        });
    });

    console.log('[Recorder] Loaded the recorder!');
});

export function isRecorderLoaded() {
    return recorder !== null;
}

export function addRecorderStopListener(listener: (blob: Blob) => void) {
    stopListeners.add(listener);
}

export function removeRecorderStopListener(listener: (blob: Blob) => void) {
    if (stopListeners.has(listener)) {
        stopListeners.delete(listener);
    }
}

export function startRecording() {
    if (!recorder) {
        alert('[Recorder] Recorder is not loaded yet!');
        return
    }

    recorder.start();
    console.log('[Recorder] Started recording!');
}

export function stopRecording() {
    if (!recorder) {
        alert('[Recorder] Recorder is not loaded yet!');
        return;
    }

    // Avoid the errors when we call stop() twice.
    if (recorder.state !== 'inactive') {
        recorder.stop();
        console.log('[Recorder] Stopped recording!');
    }
}
