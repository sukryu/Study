/**
 * 원형 큐를 이용한 게임(예: 'Hot Potato') 구현.
 * 
 * "Hot Potato" 게임은 원형 큐를 사용하여 쉽게 구현할 수 있는 게임입니다.
 * 이 게임에서 참가자들은 원을 이루어 앉고, "뜨거운 감자"를 서로에게 전달합니다.
 * 음악이 멈추면, 감자를 들고 있는 참가자는 게임에서 탈락하고, 마지막 남은 참가자가 승리합니다.
 * 이 게임을 원형 큐를 사용하여 구현할 때, 큐는 참가자들의 순서를 유지하는 데 사용됩니다.
 * 감자가 전달될 때마다 큐의 프론트 요소(감자를 가진 참가자)를 제거하고 큐의 뒤로 다시 넣습니다.
 * 음악이 멈추면, 프론트 요소를 완전히 제거하여 그 참가자를 게임에서 탈락시킵니다.
 */


class CircularQueue {
    constructor(capacity) {
        this.queue = new Array(capacity);
        this.front = 0;
        this.size = 0;
        this.capacity = capacity;
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    enqueue(item) {
        if (this.isFull()) {
            return false;
        }
        let rear = (this.front + this.size) % this.capacity;
        this.queue[rear] = item;
        this.size++;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        let item = this.queue[this.front];
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return item;
    }

    frontItem() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue[this.front];
    }
}

function hotPotato(names, num) {
    let queue = new CircularQueue(names.length);

    // 모든 참가자를 큐에 추가합니다.
    for (let name of names) {
        queue.enqueue(name);
    }

    while (queue.size > 1) {
        // 감자를 num번 전달합니다.
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }

        // 음악이 멈추고 감자를 가진 참가자를 제거합니다.
        console.log(`${queue.dequeue()} has been eliminated from the game.`);
    }

    // 마지막 남은 참가자를 반환합니다.
    return queue.frontItem();
}

// 사용 예시:
const names = ['John', 'Mary', 'Jane', 'Peter', 'Paul', 'Jack'];
const winner = hotPotato(names, 7);
console.log(`The winner is: ${winner}`);
