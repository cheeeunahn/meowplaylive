/**
 * Create an audio recorder and set the event handlers.
 *
 * @example
 * let voiceRecorder;
 * let voiceBlob;
 *
 * createRecorder({
 *     onLoad: recorder => {
 *         voiceRecorder = recorder;
 *     },
 *     onStop: blob => {
 *         voiceBlob = blob;
 *     }
 * });
 */
export function createRecorder({ onLoad, onStop }) {
    // Recorder will append the data on this array.
    let chunks = [];

    // This code is based on the following guide:
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API

    // Check whether getUserMedia() API exists.
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        throw new Error('[Recorder] getUserMedia() is not supported on this browser!');
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const recorder = new MediaRecorder(stream);

        // When the recorder is running...
        recorder.addEventListener('dataavailable', event => {
            chunks.push(event.data);
        });

        // When the recorder is stopped...
        recorder.addEventListener('stop', () => {
            console.log('[Recorder] Stopped recording!');

            // Create a 'blob' from the data.
            const blob = new Blob(chunks, { 'type': 'audio/mp3' });

            // Clear the current data.
            chunks = [];

            onStop(blob);
        });

        console.log('[Recorder] Loaded the recorder!');
        onLoad(recorder);
    });
};

export function startRecording(recorder) {
    recorder.start();
    console.log('[Recorder] Started recording!');
}

export function stopRecording(recorder) {
    recorder.stop();
}

export function playAudioBlob(blob) {
    const voiceURL = URL.createObjectURL(blob);
    const audio = new Audio(voiceURL);
    console.log('[Recorder] Playing the audio...');
    audio.play();
}
