/**
 * 허프만 코딩 알고리즘 구현하기.
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

            if (parent[1] <= element[1]) break;
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

        if (left < length && this.heap[left][1] < this.heap[smallest][1]) {
            smallest = left;
        }
        if (right < length && this.heap[right][1] < this.heap[smallest][1]) {
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

function buildHuffmanTree(data) {
    const frequencyMap = new Map();
    for (const char of data) {
        frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }

    const priorityQueue = new MinHeap();
    frequencyMap.forEach((value, key) => {
        priorityQueue.insert([key, value]);
    });

    while (priorityQueue.size() > 1) {
        const left = priorityQueue.extractMin();
        const right = priorityQueue.extractMin();
        const newNode = [left[0] + right[0], left[1] + right[1], left, right];
        priorityQueue.insert(newNode);
    }

    return priorityQueue.extractMin();
}

function generateHuffmanCodes(node, prefix = '', codeMap = new Map()) {
    if (!node[2]) {
        codeMap.set(node[0], prefix);
        return codeMap;
    }
    generateHuffmanCodes(node[2], prefix + '0', codeMap);
    generateHuffmanCodes(node[3], prefix + '1', codeMap);
    return codeMap;
}

// 사용 예시
const data = "this is an example for huffman encoding";
const tree = buildHuffmanTree(data);
const huffmanCodes = generateHuffmanCodes(tree);

console.log("Huffman Codes for each character:");
huffmanCodes.forEach((code, char) => {
    console.log(`${char}: ${code}`);
});

/**
 * 1. 빈도 맵 생성: 문자열의 각 문자에 대한 빈도수를 계산한다.
 * 2. 우선순위 큐 (최소 힙)로 트리 구성: 가장 낮은 빈도를 가진 두 노드를 반복적으로 결합하여 허프만 트리를 만든다.
 * 3. 허프만 코드 생성: 트리를 탐색하여 각 문자에 대한 허프만 코드를 생성한다.
 * 
 * 이 알고리즘은 데이터 스트림의 각 문자에 대한 최적의 압축 코드를 제공한다.
 * 위의 예시는 data 문자열에 대한 허프만 코드를 생성하고 출력한다.
 * 실제 애플리케이션에서는 이 코드를 사용하여 데이터를 압축하고 필요할 때 다시 압축을 풀 수 있다.
 */