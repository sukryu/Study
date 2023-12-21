/**
 * 원형 큐 구현 및 기본 연산 수행하기.
 */

class CircularQueue {
    constructor(size) {
        this.queue = new Array(size);
        this.maxSize = size;
        this.front = -1;
        this.rear = -1;
    }

    // 큐에 요소를 추가합니다.
    enqueue(value) {
        if (this.isFull()) {
            console.log('Queue is full');
            return false;
        }
        if (this.isEmpty()) {
            this.front = 0;
        }
        this.rear = (this.rear + 1) % this.maxSize;
        this.queue[this.rear] = value;
        return true;
    }

    // 큐에서 요소를 제거하고 반환합니다.
    dequeue() {
        if (this.isEmpty()) {
            console.log('Queue is empty');
            return null;
        }
        const value = this.queue[this.front];
        if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.maxSize;
        }
        return value;
    }

    // 큐가 비어 있는지 확인합니다.
    isEmpty() {
        return this.front === -1;
    }

    // 큐가 가득 찼는지 확인합니다.
    isFull() {
        return (this.rear + 1) % this.maxSize === this.front;
    }

    // 큐의 앞쪽 요소를 반환합니다.
    peek() {
        if (this.isEmpty()) {
            console.log('Queue is empty');
            return null;
        }
        return this.queue[this.front];
    }
}

// 사용 예시:
const queue = new CircularQueue(5);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.peek());  // 출력: 1
console.log(queue.dequeue());  // 출력: 1
console.log(queue.peek());  // 출력: 2

/**
 * 원형 큐의 포인터는 모듈로 연산(`%`)을 사용하여 갱신되어, 배열의 끝에 도달하면 다시 처음으로
 * 돌아간다. 이러한 방식으로 원형 큐는 배열의 공간을 효율적으로 재사용한다.
 */
