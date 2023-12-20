/**
 * 슬라이딩 윈도우 최대값 (Sliding Window Maximum)
 * 
 * 문제 설명: 주어진 배열과 크기 `k`의 윈도우가 있을 때, 윈도우를 배열 전체에 걸쳐
 * 슬라이딩 하면서 각 위치에서의 윈도우 내 최대값을 찾는다.
 * 
 * 예시:
 * 입력: `nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3`
 * 출력: `[3, 3, 5, 5, 6, 7]`
 */

function maxSlidingWindow(nums, k) {
    if (nums.length === 0 || k === 0) return [];

    let result = [];
    let deque = []; // 이 배열은 덱처럼 사용된다.

    for (let i = 0; i < nums.length; i++) {
        // 덱의 앞부분에서 범위 밖의 요소 제거
        if (deque.length > 0 && deque[0] === i - k) {
            deque.shift();
        }

        // 덱의 뒷부분에서 현재 요소보다 작은 요소들을 제거
        while(deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        // 현재 인덱스를 덱에 추가
        deque.push(i);

        // 윈도우의 시작 인덱스부터 최대값을 결과에 추가
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}


let nums = [1, 3, -1, -3, 5, 3, 6, 7];
let k = 3;
console.log(maxSlidingWindow(nums, k)); // 출력: [3, 3, 5, 5, 6, 7]

/**
 * 1. nums 배열이 비어 있거나 k가 0이면 빈 배열을 반환합니다.
 * 2. 결과를 저장할 result 배열과 덱의 역할을 하는 deque 배열을 초기화합니다.
 * 3. nums 배열을 순회하면서 각 요소에 대해 처리합니다.
 * 4. 덱의 앞부분에서 현재 윈도우 범위 밖의 요소를 제거합니다.
 * 5. 덱의 뒷부분에서 현재 요소보다 작은 요소들을 제거하여 항상 덱의 첫 번째 요소가 최대값이 되도록 합니다.
 * 6. 현재 인덱스를 덱에 추가합니다.
 * 7. 윈도우가 완전히 형성되었을 때 (인덱스가 k - 1 이상일 때), 덱의 첫 번째 요소(최대값)를 결과 배열에 추가합니다.
 * 
 * 이 알고리즘은 각 요소를 한 번씩만 처리하므로 시간 복잡도는 O(n) n은 입력 배열 nums의 길이입니다.
 */