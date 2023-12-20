/**
 * 배열에서 세 수의 합이 0이 되는 모든 고유한 쌍 찾기.
 */

// 굉장히 큰 배열을 임의로 생성한다.
function createLargeArray(size, min, max) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        arr.push(randomNum);
    }
    return arr;
}

// 예시: 크기가 10000이고, 각 요소가 -1000과 1000 사이의 값을 가지는 배열 생성
let largeArray = createLargeArray(50, -10, 10);


function threeSum(nums) {
    let result = [];
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // 중복을 피하기 위해 같은 요소 건너뛰기

        let left = i + 1, right = nums.length - 1;
        while(left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while(nums[left] === nums[left + 1]) left++; // 왼쪽 중복 건너뛰기
                while(nums[right] === nums[right - 1]) right--; // 오른쪽 중복 건너뛰기
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

let nums = largeArray;
let results = threeSum(nums);
console.log(results);


/**
 * 1. 주어진 배열 `nums`를 오름차순으로 정렬한다.
 * 2. 배열을 순회하면서 각 요소에 대해 투 포인터 탐색을 수행한다.
 * 3. 현재 요소가 이전 요소와 같으면 중복을 피하기 위해 건너뛴다.
 * 4. `left` 포인터를 현재 요소의 다음 위치에, `right` 포인터를 배열의 끝에 위치시킨다.
 * 5. `left`와 `right`가 만나지 않는 동안, 세 요소의 합이 0이 되는 조합을 찾는다.
 * 6. 합이 0일 경우 결과 배열에 추가하고, 양쪽 포인터에서 중복을 피하기 위해 이동시킨다.
 * 7. 합이 0보다 작으면 `left` 포인터를 증가시키고, 0보다 크면 `right` 포인터를 감소시킨다.
 * 
 * 이 방법은 효율적인 방법으로 세 수의 합이 0이 되는 모든 고유한 조합을 찾을 수 있다./
 */