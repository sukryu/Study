/**
 * 여러 대의 트럭이 원형 트랙을 돌며 연료를 소모하는 시뮬레이션 구현.
 * 
 * 개념적 접근:
 * 1. 트럭과 트랙 모델링: 트럭이 가진 연료의 양과 각 트랙 섹션을 통과하는 데 필요한 연료량을 나타내는 배열을 정의.
 * 2. 원형 큐 사용: 각 트럭의 현재 위치와 연료 상태를 추적하는 데 원형 큐를 사용한다.
 * 3. 시작 지점 찾기: 가능한 모든 시작 지점에 대해 시뮬레이션을 실행하며, 트럭이 트랙 전체를 돌고 출발 지점으로 돌아올 수 있는 확인.
 */

class CircularQueue {
    constructor(capacity) {
        this.queue = new Array(capacity).fill(null);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
        this.capacity = capacity;
    }

    isEmpty() {
        return this.size === 0;
    }

    enqueue(item) {
        if (this.size === this.capacity) return false;
        this.rear = (this.rear + 1) % this.capacity;
        this.queue[this.rear] = item;
        this.size++;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) return null;
        const item = this.queue[this.front];
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return item;
    }

    frontItem() {
        if (this.isEmpty()) return null;
        return this.queue[this.front];
    }
}

function canCompleteCircuit(trucks, fuel, cost) {
    const n = trucks.length;
    let totalFuel = 0;
    let totalCost = 0;
    let start = 0;

    for (let i = 0; i < n; i++) {
        totalFuel += fuel[i];
        totalCost += cost[i];
        if (totalFuel < totalCost) {
            start = i + 1;
            totalFuel = 0;
            totalCost = 0;
        }
    }

    if (start >= n || totalFuel < totalCost) return -1; // 트랙 전체를 돌 수 없는 경우

    const queue = new CircularQueue(n);
    let currentFuel = 0;

    for (let i = 0; i < n; i++) {
        currentFuel += fuel[(start + i) % n] - cost[(start + i) % n];
        queue.enqueue(currentFuel);
        while (currentFuel < 0 && !queue.isEmpty()) {
            currentFuel -= queue.dequeue();
            start = (start + 1) % n;
        }
    }

    return start;
}

// 사용 예시:
const trucks = [1, 2, 3, 4, 5];  // 트럭의 개수와 무관, 순서를 나타냅니다.
const fuel = [1, 2, 3, 4, 5];  // 각 트랙 섹션에서 트럭이 얻을 수 있는 연료의 양
const cost = [3, 4, 5, 1, 2];  // 각 트랙 섹션을 통과하는 데 필요한 연료의 양

const startingPoint = canCompleteCircuit(trucks, fuel, cost);
console.log(`The starting point is: ${startingPoint}`);  // 출력: The starting point is: 3

/**
 * 이 코드는 트럭이 트랙 전체를 완주할 수 있는 시작 지점을 찾는다. 각 트랙 섹션에서 트럭이 얻을 수 있는
 * 연료의 양(`fuel`)과 각 섹션을 통과하는 데 필요한 연료의 양(`cost`)을 고려하여, 트럭이 출발 지점으로
 * 돌아올 수 있는지를 결정한다. 가능한 모든 시작 지점을 시도하고, 충분한 연료로 트랙 전체를 돌 수 있는
 * 첫 번째 지점을 반환한다. 만약 트랙 전체를 돌 수 있는 시작 지점이 없다면 `-1`을 반환한다.
 * 
 * 이 시뮬레이션은 트럭의 연료 관리와 원형 트랙의 특성을 모델링하는 데 원형 큐를 활용한 예시로,
 * 원형 큐의 순환적 특성을 효과적으로 사용한다.
 */
