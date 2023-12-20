/**
 * 수열에서의 최장 증가 부분 수열 찾기(Longest Increasing Subsequence, LIS)
 * 
 * 
 * 
 * 예시
 * 입력: [10, 22, 9, 33, 21, 50, 41, 60, 80]
 * 출력: 6 (가장 긴 증가하는 부분 수열은 [10, 22, 33, 50, 60, 80])
 * 
 * 해결 전략
 * 1. 길이가 입력 배열과 동일한 새 배열 `dp`를 생성하고 모든 요소를 1로 초기화
 * 2. 이중 루프를 사용하여 각 요소에 대해 가능한 모든 이전 요소들과 비교.
 * 3. 현재 요소가 이전 요소보다 큰 경우, `dp[i]`를 db[j] + 1`과 비교하여 최대값 갱신
 * 4. 모든 요소에 대해 최장 길이를 계산한 후, `dp` 배열에서 최대값을 찾는다.
 */

function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;

    let dp = Array(nums.length).fill(1);
    let maxLIS = 1;

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLIS = Math.max(maxLIS, dp[i]);
    }

    return maxLIS;
}

let nums = [10, 22, 9, 33, 21, 50, 41, 60, 80];
console.log(lengthOfLIS(nums)); // 출력: 6

/**
 * 1. 입력 배열 `nums`이 비어 있으면 0을 반환
 * 2. `dp` 배열을 생성하고 모든 요소를 1로 초기화. 각 `dp[i]`는 `i`번째 요소에서 끝나는 최장 증가 부분 수열의 길이를 나타낸다.
 * 3. 배열을 순회하면서 각 요소 `i`에 대해, `0`부터 `i - 1`까지의 모든 요소 `j`를 검사.
 * 4. `nums[i]`가 `nums[j]`보다 크면, `dp[i]`를 `dp[j] + 1`과 비교하여 더 큰 값으로 업데이트.
 * 5. `maxLIS`를 갱신하여 배열 전체에서 가장 긴 증가 부분 수열의 길이를 추적한다.
 * 6. 최종적으로 `maxLIS`를 반환한다.
 * 
 * 이 알고리즘은 배열의 각 요소에 대해 가능한 모든 이전 요소를 검사하므로 시간 복잡도는 O(n^2)이다. 여기서 n은 배열의 길이이다.
 */