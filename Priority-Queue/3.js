/**
 * Lempel-Ziv 코딩 알고리즘(LZ78) 구현하기
 */

function LZ78Compress(input) {
    const dictionary = new Map();
    let current = '';
    const output = [];
    let dictSize = 1;

    for (let i = 0; i < input.length; i++) {
        const character = input[i];
        const combined = current + character;

        if (dictionary.has(combined)) {
            current = combined;
        } else {
            if (current !== '') {
                output.push([dictionary.get(current), character]);
            } else {
                output.push([0, character]);
            }
            dictionary.set(combined, dictSize++);
            current = '';
        }
    }

    // 처리되지 않은 마지막 시퀀스 처리
    if (current !== '') {
        output.push([dictionary.get(current), '']);
    }

    return output;
}
