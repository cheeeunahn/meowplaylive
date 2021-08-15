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

export function validateNickname(nickname: string) {
    // Allow: English/Korean characters, numbers, underlines, hyphens and spaces.
    // Nickname shouldn't start with a space.
    return /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9_\-][a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9_\-\s]*$/g.test(nickname);
}
