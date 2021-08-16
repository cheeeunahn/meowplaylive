/**
 * ex. 100000 -> '100,000'
 */
export function numberToFormattedString(value: number) {
    return value.toLocaleString('en', { useGrouping: true });
}

export function formatNumber(value: number, length: number) {
    let result = `${value}`;

    for (let i = 0; i < length - result.length; i++) {
        result = '0' + result;
    }

    return result;
}

export function timestampToString(value: number) {
    const date = new Date(value);
    const year = formatNumber(date.getFullYear(), 4);
    const month = formatNumber(date.getMonth() + 1, 2);
    const day = formatNumber(date.getDate(), 2);
    const hour = formatNumber(date.getHours(), 2);
    const minutes = formatNumber(date.getMonth(), 2);
    const seconds = formatNumber(date.getSeconds(), 2);

    return `${year}.${month}.${day}-${hour}.${minutes}.${seconds}`;
}

function isHangulChar(ch: string) {
    const c = ch.charCodeAt(0);

    if (0x1100 <= c && c <= 0x11FF) {
        return true;
    }

    if (0x3130 <= c && c <= 0x318F) {
        return true;
    }

    if (0xAC00 <= c && c <= 0xD7A3) {
        return true;
    }

    return false;
}

export function validateNickname(nickname: string) {
    // Nickname shouldn't be too long.
    let length = 0;

    for (let i = 0; i < nickname.length; i++) {
        if (isHangulChar(nickname[i])) {
            length += 2;
        } else {
            length += 1;
        }
    }

    if (length > 13) {
        return false;
    }

    // Allow: English/Korean characters, numbers, underlines, hyphens and spaces.
    // Nickname shouldn't start with a space.
    return /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9_\-][a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9_\-\s]*$/g.test(nickname);
}
