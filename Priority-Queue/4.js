/**
 * Lempel-Ziv 코딩 알고리즘(LZ77) 구현하기
 */

function LZ77Compress(input) {
    const windowSize = 20; // 슬라이딩 윈도우의 크기
    let cursor = 0;
    const output = [];

    while (cursor < input.length) {
        let bestMatch = [0, 0]; // [매치 길이, 시작점으로부터의 거리]
        let bufIndex = Math.max(0, cursor - windowSize); // 버퍼 시작점

        while (bufIndex < cursor) {
            let matchLength = 0;
            while (input[bufIndex + matchLength] === input[cursor + matchLength] && cursor + matchLength < input.length) {
                matchLength++;
            }

            if (matchLength > bestMatch[0]) {
                bestMatch = [matchLength, cursor - bufIndex];
            }

            bufIndex++;
        }

        if (bestMatch[0] === 0) { // 매치가 없는 경우
            output.push([0, input[cursor]]);
            cursor++;
        } else { // 매치가 있는 경우
            output.push(bestMatch);
            cursor += bestMatch[0];
        }
    }

    return output;
}
