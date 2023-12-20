/*
배열의 원소들을 이용해 주어진 합(sum)을 만들 수 있는 모든 쌍 찾기.
*/

function findPairsWithGivenSum(arr, sum) {
    let pairs = [];
    let hash = new Set();
    let seen = new Map();

    for (let i = 0; i < arr.length; i++) {
        let complement = sum - arr[i];

        if (hash.has(complement) && !seen.has(`${complement},${arr[i]}`) && !seen.has(`${arr[i]},${complement}`)) {
            pairs.push([complement, arr[i]]);
            seen.set(`${complement},${arr[i]}`, true);
        }

        hash.add(arr[i]);
    }

    return pairs;
}

let array = [1, 5, 7, -1, 5];
let sum = 6;
let pairs = findPairsWithGivenSum(array, sum);
console.log(pairs); // 출력 예상: [[1, 5], [7, -1]]


/**
 * 1. 빈 배열 `pairs`를 초기화하여 찾은 쌍을 저장한다.
 * 2. 해시 테이블 역할을 하는 `hash` 세트를 생성한다.
 * 3. `seen` 맵을 생성하여 이미 추가된 쌍을 추적한다.
 * 4. 배열을 순회하면서 각 요소에 대해, 주어진 합에서 현재 요소를 뺀 `complement`를 계산한다.
 * 5. `hash`에 `complement`가 있고, `seen`에 해당 쌍이 없는 경우에만 새 쌍을 `pairs`에 추가하고 `seen`에도 이 쌍을 추가한다.
 * 6. 모든 쌍을 찾은 후 `pairs` 배열을 반환한다.
 * 위 코드에서 `sum`이 6이고 배열이 위와 같다면 합이 6이 되는 쌍은 `[1, 5]`와 `[-1, 7]`이다.
 */