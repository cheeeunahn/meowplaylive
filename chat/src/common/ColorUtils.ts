// Include min, exclude limit.
export function generateRandomInt(min: number, limit: number) {
    min = Math.ceil(min);
    limit = Math.floor(limit);
    return Math.floor(Math.random() * (limit - min)) + min;
}

export function generateRandomColor() {
    return `rgb(${generateRandomInt(50, 250)}, ${generateRandomInt(50, 250)}, ${generateRandomInt(50, 250)})`;
}
