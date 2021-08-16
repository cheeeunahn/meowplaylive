export const player = new Audio();
player.autoplay = true;

export function startPlaying(blob: Blob) {
    const blobURL = URL.createObjectURL(blob);
    player.src = blobURL;
    console.log('[Player] Started playing!');
}

export function stopPlaying() {
    player.src = '';
    console.log('[Player] Stopped playing!');
}

export function addPlayerStopListener(listener: () => void) {
    player.addEventListener('ended', listener);
}

export function removePlayerStopListener(listener: () => void) {
    player.removeEventListener('ended', listener);
}
