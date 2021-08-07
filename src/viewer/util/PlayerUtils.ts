export const player = new Audio();
player.autoplay = true;

export function startPlaying(blob: Blob) {
    const blobURL = URL.createObjectURL(blob);
    player.src = blobURL;
    console.log('[Recorder] Started playing!');
}

export function stopPlaying() {
    player.src = '';
    console.log('[Recorder] Stopped playing!');
}
