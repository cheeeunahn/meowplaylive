export async function createRecorder() {
    // Check whether recording is supported on this computer.
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        alert('Recording is not supported on this computer! Do you have a microphone?');
        return null;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    console.log('[Recorder] Loaded the recorder!');

    return recorder;
}

export function startRecording(recorder: MediaRecorder) {
    recorder.start();
    console.log('[Recorder] Started recording!');
}

export function stopRecording(recorder: MediaRecorder) {
    // Avoid the errors when we call stop() twice.
    if (recorder.state !== 'inactive') {
        recorder.stop();
        console.log('[Recorder] Stopped recording!');
    }
}

export function playAudioBlob(blob: Blob) {
    const voiceURL = URL.createObjectURL(blob);
    const audio = new Audio(voiceURL);
    console.log('[Recorder] Playing the audio...');
    audio.play();
}
