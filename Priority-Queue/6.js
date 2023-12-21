/**
 * 데이터 스트림에서 중간값(median) 계속 추적하기.
 * 
 * 이 문제는 `연속적인 중간값 찾기` 문제로 알려져 있으며, 동적으로 변하는
 * 데이터에 대한 중간값을 효율적으로 찾아야 할 때 발생한다. 이 문제를 해결하는 효율적인
 * 방법 중 하나는 두 개의 힙(최소 힙과 최대 힙)을 사용하는 것이다.
 * 
 * 아이디어는 다음과 같다.
 * 1. 최대 힙은 데이터 스트림의 낮은 절반을 저장하고, 최소 힙은 높은 절반을 저장한다.
 * 2. 두 힙의 크기가 같거나 최대 힙이 하나 더 많은 요소를 가질 수 있도록 유지한다.
 * 3. 중간값은 최대 힙의 루트이거나, 두 힙의 루트 값의 평균이 된다.
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

    peek() {
        return this.heap[0];
    }
}

class MaxHeap {
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

            // 최대 힙에서는 부모가 자식보다 크거나 같아야 하므로,
            // 부모가 더 크면 중단합니다.
            if (parent >= element) break;

            // 부모와 자식을 교환합니다.
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extractMax() {
        const max = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        return max;
    }

    sinkDown(index) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let largest = index;
        const length = this.heap.length;

        if (left < length && this.heap[left] > this.heap[largest]) {
            largest = left;
        }
        if (right < length && this.heap[right] > this.heap[largest]) {
            largest = right;
        }
        if (largest !== index) {
            let temp = this.heap[largest];
            this.heap[largest] = this.heap[index];
            this.heap[index] = temp;
            this.sinkDown(largest);
        }
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }
}

class MedianFinder {
    constructor() {
        this.minHeap = new MinHeap();
        this.maxHeap = new MaxHeap();
    }

    addNum(num) {
        // 새로운 숫자를 최대 힙에 추가합니다.
        this.maxHeap.insert(num);

        // 최대 힙의 최대값을 최소 힙으로 이동합니다.
        this.minHeap.insert(this.maxHeap.extractMax());

        // 최소 힙이 최대 힙보다 더 많은 요소를 가지게 되면, 하나를 최대 힙으로 옮깁니다.
        if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.insert(this.minHeap.extractMin());
        }
    }

    findMedian() {
        if (this.maxHeap.size() > this.minHeap.size()) {
            // 최대 힙에 더 많은 요소가 있는 경우
            return this.maxHeap.peek();
        } else {
            // 두 힙의 크기가 같은 경우
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2.0;
        }
    }
}

// 사용 예시:
const medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
console.log(medianFinder.findMedian()); // 출력: 1.5
medianFinder.addNum(3);
console.log(medianFinder.findMedian()); // 출력: 2