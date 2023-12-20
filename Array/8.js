/**
 * 최소 창문 크기의 서브배열 합(Minimum Size Subarray Sum)
 * 
 * 문제 설명: 주어진 `s`값 이상의 합을 가지는 가장 작은 크기의 연속된 부분 배열(subarray)의
 * 크기를 찾는다.
 * 
 * 예시:
 * 입력: `s = 7`, `nums = [2, 3, 1, 2, 4, 3]`
 * 출력: `2` (부분 배열 `[4, 3]`의 합이 7 이상이며 크기가 가장 작습니다.)
 * 
 * 
 * 
 * 이 문제는 투 포인터 또는 슬라이딩 윈도우 기법을 사용하여 효율적으로 해결할 수 있다.
 * 이 접근 방식에서는 두 포인터(시작점과 끝점)를 이동시켜 가며 부분 배열의 합이 주어진 값 `s`이상이
 * 되는 최소 길이의 부분 배열을 찾는다.
 */

function minSubArrayLen(s, nums) {
    let start = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let end = 0; end < nums.length; end++) {
        sum += nums[end];

        // 부분 배열의 합이 s 이상이 될 때까지 반복
        while (sum >= s) {
            minLength = Math.min(minLength, end - start + 1);
            sum -= nums[start];
            start++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}

let s = 7;
let nums = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen(s, nums)); // 출력: 2

/**
 * 1. 시작 포인터 start와 누적 합 sum을 초기화합니다. 최소 길이 minLength는 무한대로 초기화합니다.
 * 끝 포인터 end를 이동시키며 배열을 순회합니다. 
 * 2. 각 단계에서 end 포인터가 가리키는 값을 sum에 더합니다.
 * 3. sum이 s 이상이 되면, 현재 부분 배열의 길이(end - start + 1)가 현재까지의 최소 길이보다 작은지 확인하고, 필요한 경우 minLength를 업데이트합니다.
 * 4. sum에서 start 포인터가 가리키는 값을 뺀 후, start 포인터를 오른쪽으로 이동시킵니다.
 * 5. 최종적으로 minLength가 무한대이면, 조건을 만족하는 부분 배열이 없는 것이므로 0을 반환합니다. 그렇지 않으면 minLength를 반환합니다.
 * 
 * 이 알고리즘은 배열을 한 번만 순회하므로 시간 복잡도는  O(n)입니다. 여기서 n은 배열 nums의 길이입니다.
 */