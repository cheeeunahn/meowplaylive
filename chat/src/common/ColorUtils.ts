// Include min, exclude limit.
export function generateRandomInt(min: number, limit: number) {
    min = Math.ceil(min);
    limit = Math.floor(limit);
    return Math.floor(Math.random() * (limit - min)) + min;
}

export function generateRandomColor() {
    return `rgb(${generateRandomInt(50, 250)}, ${generateRandomInt(50, 250)}, ${generateRandomInt(50, 250)})`;
}

export interface SuperChatColor {
    darkColor: string;
    lightColor: string;
}

export function getSuperChatColors(donation: number): SuperChatColor {
    if (donation <= 1000) {
        return {
            darkColor: 'rgb(21, 101, 192)',
            lightColor: 'rgb(51, 131, 222)'
        };
    } else if (donation <= 2000) {
        return {
            darkColor: 'rgb(0, 184, 212)',
            lightColor: 'rgb(0, 229, 255)'
        };
    } else if (donation <= 5000) {
        return {
            darkColor: 'rgb(0, 191, 165)',
            lightColor: 'rgb(29, 233, 182)'
        };
    } else if (donation <= 10000) {
        return {
            darkColor: 'rgb(255, 179, 0)',
            lightColor: 'rgb(255, 202, 40)'
        };
    } else if (donation <= 20000) {
        return {
            darkColor: 'rgb(230, 81, 0)',
            lightColor: 'rgb(245, 124, 0)'
        };
    } else if (donation <= 50000) {
        return {
            darkColor: 'rgb(194, 24, 91)',
            lightColor: 'rgb(233, 30, 99)'
        };
    } else {
        return {
            darkColor: 'rgb(208, 0, 0)',
            lightColor: 'rgb(230, 33, 23)'
        };
    }
}
