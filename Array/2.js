/*
문제: 배열을 회전시키기(ex) 오른쪽으로 3단계 회전)
*/

/**
 * Javascript에서 배열을 회전시키는 한 가지 방법은 `slice()` 메소드와 `concat()` 매소드를
 * 사용하는 것이다. 배열의 끝 부분을 잘라내어 배열의 시작 부분에 붙이는 방식으로 작동한다.
 */

function rotateArray(arr, steps) {
    let n = arr.length;

    // 회전 단계를 배열 길이로 나눈 나머지로 계산하여 불필요한 회전을 방지
    steps = steps % n;

    // 배열의 뒷부분을 잘라내고 앞부분과 합치기
    return arr.slice(-steps).concat(arr.slice(0, n - steps));
}

let array = [1, 2, 3, 4, 5];
let rotatedArray = rotateArray(array, 3); // 오른쪽으로 3단계 회전
console.log(rotatedArray);

/**
 * 1. 입력 배열 `arr`와 회전단계 `steps`를 받는다.
 * 2. 배열의 길이를 `n`에 저장하고, 회전 단계를 배열의 길이로 나눈 나머지를 계산하여 불필요한 회전을 방지한다.
 * 3. `slice()` 메소드를 사용하여 배열의 마지막 `steps`요소를 잘라낸다.
 * 4. 잘라낸 부분과 나머지 배열을 `concat()` 메소드로 합쳐 새로운 배열을 생성한다.
 */