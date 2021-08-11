import { Recorder } from 'vmsg';
const vmsgWASM = require('vmsg/vmsg.wasm');

const recorder = new Recorder({ wasmURL: vmsgWASM });

export async function startRecording(onStart: () => void) {
    await recorder.initAudio();
    await recorder.initWorker();
    recorder.startRecording();
    console.log('[Recorder] Started recording!');
    onStart();
}

export async function stopRecording(onStop: (blob: Blob) => void) {
    const blob = await recorder.stopRecording();
    console.log('[Recorder] Stopped recording!');
    onStop(blob);
}
