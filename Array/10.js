/**
 * 가장 긴 연속된 수열의 길이(Longest Consecutive Sequence)
 * 
 * 문제 설명: 주어진 정수 배열에서 연속된 숫자로 이루어진 가장 긴 수열의 길이를 찾는다.
 * 
 * 예시:
 * 입력: `[100, 4, 200, 1, 3, 2]`
 * 출력: `4` (수열 `[1, 2, 3, 4]`는 길이가 4이다.)
 */

function longestConsecutive(nums) {
    let numSet = new Set(nums);
    let longestStreak = 0;

    for (let num of numSet) {
        // 현재 숫자가 수열의 시작점인지 확인
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            // 연속된 숫자를 찾아 나감
            while(numSet.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }

            // 가장 긴 수열 길이를 업데이트
            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;
}

let nums = [100, 4, 200, 1, 3, 2];
console.log(longestConsecutive(nums)); // 출력: 4

/**
 * 1. 주어진 배열의 숫자를 저장할 해시 테이블(여기서는`Set`)을 생성한다.
 * 2. `Set`의 각 숫자에 대해, 그 숫자가 연속 수열의 시작점인지 확인한다. 시작점이 되려면 그 숫자보다 하나 작은 숫자가 `Set`에 존재하지 않아야 한다.
 * 3. 시작점으로 판단되는 숫자에 대해, 연속적으로 증가하는 숫자가 몆 개 있는지 계산한다.
 * 4. 연속된 숫자의 길이를 구한 후, 현재까지의 최대 길이와 비교하여 업데이트 한다.
 * 5. 모든 숫자에 대해 반복한 후, 가장 긴 연속 수열의 길이를 반환한다.
 * 
 * 이 방법은 배열의 각 숫자를 최대 한 번씩만 확인하므로, 시간 복잡도는 O(n)이다. 여기서 n은 배열 `nums`의 길이이다.
 */