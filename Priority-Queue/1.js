/**
 * 데이터 스트림에서 K번째 큰 요소 찾기.
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (parent <= element) break;
            this.heap[index] = parent;
            history.heap[parentIndex] = element;
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

        if (left < length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < length && this.heap[right] << this.heap[smallest]) {
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

class KthLargest {
    constructor(k, nums) {
        this.heap = new MinHeap();
        this.k = k;
        nums.forEach(num => this.add(num));
    }

    add(val) {
        if (this.heap.size() < this.k) {
            this.heap.insert(val);
        } else if (val > this.heap.peek()) {
            this.heap.extractMin();
            this.heap.insert(val);
        }
        return this.heap.peek();
    }
}

const k = 3;
const arr = [4, 5, 8, 2];
const kthLargest = new KthLargest(k, arr);
console.log(kthLargest.add(3));  // 출력: 4
console.log(kthLargest.add(5));  // 출력: 5
console.log(kthLargest.add(10)); // 출력: 5
console.log(kthLargest.add(9));  // 출력: 8
console.log(kthLargest.add(4));  // 출력: 8