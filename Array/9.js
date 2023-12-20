/**
 * 배열 순열(Permutations of an Array)
 * 
 * 문제 설명: 주어진 배열의 모든 순열을 찾는다.
 * 
 * 예시:
 * 입력: `[1, 2, 3]`
 * 출력: `[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
 * 
 * 
 * 위 문제는 재귀와 백트레킹을 사용하여 해결할 수 있다. 이 방법은 각 단계에서 한 요소를 고정하고
 * 나머지 요소에 대해 순열을 찾은 다음, 고정된 요소를 다른 요소와 교환하는 방식으로 작동한다.
 */


function permute(nums) {
    let result = [];
    generatePermutations(nums, 0, result);
    return result;
}

function generatePermutations(nums, start, result) {
    if (start === nums.length - 1) {
        result.push([...nums]);
        return;
    }

    for (let i = start; i < nums.length; i++) {
        // 현재 요소를 고정
        [nums[start], nums[i]] = [nums[i], nums[start]];
        // 재귀적으로 나머지 요소에 대한 순열 생성
        generatePermutations(nums, start + 1, result);
        // 요소 위치를 원래대로 복원
        [nums[start], nums[i]] = [nums[i], nums[start]];
    }
}

let nums = [1, 2, 3];
console.log(permute(nums)); // 출력: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

/**
 * 1. `permute` 함수는 순열을 생성할 배열과 결과를 저장할 배열을 초기화 한다.
 * 2. `generatePermutations` 함수는 재귀적으로 순열을 생성한다.
 * 3. `start` 인덱스가 배열의 마지막 인덱스에 도달하면, 현재 배열을 결과에 추가한다.
 * 4. 각 단계에서 `start` 인덱스의 요소를 고정하고, 나머지 요소에 대해 순열을 생성한다.
 * 5. 배열의 요소를 교환하여 다양한 조합을 만든다.
 * 6. 순열 생성 후 요소의 위치를 원래대로 되돌린다.
 * 
 * 이 방법은 배열의 모든 요소에 대해 순열을 생성하므로, 시간 복잡도는 O(n!)이다. 여기서
 * n은 배열의 길이이다.
 */