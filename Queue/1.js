/**
 * 큐를 사용하여 데이터의 시리즈 처리하기.
 */

// 큐 클래스 정의
class Queue {
    constructor() {
        this.items = []; // 큐의 요소를 저장할 배열
    }

    // 큐에 요소 추가
    enqueue(item) {
        this.items.push(item);
    }

    //큐에서 요소 제거 및 반환
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }

    // 큐가 비어있는지 확인
    isEmpty() {
        return this.items.length === 0;
    }

    // 큐의 맨 앞 요소 확인
    peek() {
        if (this.isEmpty) {
            return null;
        }

        return this.items[0];
    }

    // 큐의 모든 요소 출력
    print() {
        console.log(this.items.toString())
    }
}

// 데이터 시리즈 처리 함수
function processData(queue, processFunction) {
    while(!queue.isEmpty()) {
        const item = queue.dequeue();
        processFunction(item); // 데이터 항목에 대한 처리 함수
    }
}

// 데이터 처리를 위한 예제 함수
function exampleProcessFunction(data) {
    console.log(`Processing data: ${data}`)
}

// 큐 생성 및 데이터 추가
const queue = new Queue();
queue.enqueue('Data 1')
queue.enqueue('Data 2')
queue.enqueue('Data 3')

// 큐 출력
console.log('Initial queue: ');
queue.print();

// 데이터 시리즈 처리
console.log('Processing data: ');
processData(queue, exampleProcessFunction);

// 처리 후 큐 출력
console.log('Queue after processing: ');
queue.print();