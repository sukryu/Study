/**
 * 스택을 이용한 탑(heights array)에서의 신호 수신 범위 찾기.
 * 
 * 문제 정의:
 * 입력: 탑의 높이가 나열된 배열 `heights`가 주어집니다. 예를 들어, `[3, 6, 2, 4, 5]`와 
 * 같은 배열이 주어질 수 있습니다.
 * 출력: 각 탑이 수신할 수 있는 다른 탑의 인덱스를 배열로 반환합니다. 탑은 자신보다 왼쪽에 있는
 * 탑 중에서만 신호를 수신할 수 있으며, 더 높은 탑에 의해 가로막힙니다. 탑이 신호를 수신할 수 없다면
 * , 해당 위치의 출력은 `-1`이 됩니다.
 * 
 * 문제 예시:
 * 입력: `[3, 6, 2, 4, 5]`
 * 출력: `[-1, -1, 1, 1, 3]`
 */

function findSignalRanges(heights) {
    let stack = []; // 인덱스를 저장할 스택
    let result = new Array(heights.length).fill(-1); // 결과 배열 초기화

    for (let i = 0; i < heights.length; i++) {
        // 현재 탑보다 낮은 탑은 신호를 받을 수 없으므로 스택에서 제거합니다.
        while (stack.length > 0 && heights[i] > heights[stack[stack.length - 1]]) {
            stack.pop();
        }

        // 스택이 비어있지 않다면, 스택의 최상단에 있는 탑이 현재 탑이 수신할 수 있는 가장 가까운 탑입니다.
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }

        // 현재 탑의 인덱스를 스택에 푸시합니다.
        stack.push(i);
    }

    return result;
}

// 사용 예시:
const heights = [3, 6, 2, 4, 5];
console.log(findSignalRanges(heights));  // 출력: [-1, -1, 1, 1, 3]
