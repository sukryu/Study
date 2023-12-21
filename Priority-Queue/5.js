/**
 * K개의 정렬된 배열을 하나의 정렬된 배열로 병합하기.
 * 
 * 이 문제는 일반적으로 'K-way merge' 문제라고 불린다. 이 문제를 해결하는
 * 효율적인 방법 중 하나는 최소 힙(min heap)을 사용하는 것이다. 최소 힙을 사용하면
 * 각 배열의 가장 작은 요소들만을 고려하여 전체 항목을 순서대로 추출할 수 있다.
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (parent[0] <= element[0]) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extractMin() {
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        return min;
    }

    sinkDown(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;
        const length = this.heap.length;

        if (left < length && this.heap[left][0] < this.heap[smallest][0]) {
            smallest = left;
        }
        if (right < length && this.heap[right][0] < this.heap[smallest][0]) {
            smallest = right;
        }
        if (smallest !== index) {
            let temp = this.heap[smallest];
            this.heap[smallest] = this.heap[index];
            this.heap[index] = temp;
            this.sinkDown(smallest);
        }
    }

    size() {
        return this.heap.length;
    }
}

function mergeKSortedArrays(arrays) {
    const minHeap = new MinHeap();
    const result = [];
    const arrayIndices = new Array(arrays.length).fill(0);

    // 각 배열의 첫 번째 요소를 힙에 삽입합니다.
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length > 0) {
            minHeap.insert([arrays[i][0], i]);
        }
    }

    // 힙이 빌 때까지 요소들을 추출하고 결과 배열에 추가합니다.
    while (minHeap.size() > 0) {
        const [value, arrayIndex] = minHeap.extractMin();
        result.push(value);
        arrayIndices[arrayIndex]++;

        // 다음 요소가 있다면 힙에 삽입합니다.
        if (arrayIndices[arrayIndex] < arrays[arrayIndex].length) {
            const nextValue = arrays[arrayIndex][arrayIndices[arrayIndex]];
            minHeap.insert([nextValue, arrayIndex]);
        }
    }

    return result;
}

// 사용 예:
const arrays = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];

console.log(mergeKSortedArrays(arrays));  // 출력: [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * 1. 최소 힙 초기화: 모든 배열의 첫 번째 요소를 포함하는 최소 힙을 만든다. 힙의 각 요소는
 * `[값, 배열 인덱스]`형태로, 해당 값과 그 값이 속한 배열의 인덱스를 포함한다.
 * 2. 병합 과정: 힙에서 가장 작은 요소를 추출하고 결과 배열에 추가한다. 그런 다음 추출된 요소가
 * 속한 배열에서 다음 요소가 있다면 힙에 삽입한다. 이 과정을 힙이 빌 때까지 반복한다.
 * 3. 결과 반환: 모든 배열이 병합되면 최종적으로 정렬된 배열을 반환한다.
 * 
 * 이 알고리즘은 각 단계에서 최소 값을 빠르게 찾을 수 있으며, K개의 배열 각각에 대해 N/K개의
 * 요소를 처리하므로 전체 시간 복잡도는 O(NlogK)이다. 여기서 n은 모든 배열에 있는 총 요소 수 이고,
 * K는 배열의 수 이다. 이는 큰 데이터 세트와 많은 수의 배열에 대해 매우 효율적인 방법이다.
 */