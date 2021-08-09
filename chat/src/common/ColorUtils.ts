export function generateRandomColor() {
    return '#' + Math.round(Math.random() * 0xffffff).toString(16);
}
