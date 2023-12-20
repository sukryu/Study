/*
문제 : 연속된 부분 배열의 최대 합 구하기.
*/

function maxSubArraySum(arr) {
    let maxSoFar = arr[0];
    let currentMax = arr[0];

    for (let i = 1; i < arr.length; i++) {
        currentMax = Math.max(arr[i], currentMax + arr[i]);
        maxSoFar = Math.max(maxSoFar, currentMax);
    }

    return maxSoFar;
}

let array = [-2, -3, 4, -1, -2, 1, 5, -3];
let maxSum = maxSubArraySum(array);
console.log(maxSum);

/**
 * 1. maxSofar와 currentMax를 배열의 첫 번째 요소로 초기화한다.
 * 2. 배열을 순회하며 각 요소에 대해, `currentMax`는 현재 요소와 이전 `currentMax`에 현재 요소를 더한 값 중 더 큰 값을 선택한다.
 * 3. `maxSoFar`는 지금까지의 `currentMax`와 `maxSoFar`중 더 큰 값을 유지한다.
 * 4. 배열의 모든 요소를 순회한 후, `maxSoFar`에 최대 부분 배열 합이 저장된다.
 */