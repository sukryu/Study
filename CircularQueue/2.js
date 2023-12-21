/**
 * 원형 큐를 사용하여 CPU 스케줄링 시뮬레이션 구현하기.
 * 
 * 원형 큐를 사용하여 CPU 스케줄링 시뮬레이션을 구현하는 것은 멀티태스킹 운영 시스템에서
 * 프로세스(또는 작업)을 관리하는 방법을 모델링한다. 특히, 라운드 로빈(Round Robin)스케줄링 알고리즘
 * 이 이러한 유형의 문제에 자주 사용된다. 라운드 로빈 스케줄링은 각 프로세스에 동일한 시간 할당량(time quantum)을 부여하고,
 * 준비 큐에서 순환적으로 프로세스를 실행한다.
 * 
 * 개요:
 * 1. 프로세스 모델링: 프로세스(또는 작업)에 대한 정보를 포함하는 클래스 또는 구조체를 정의한다.
 * 일반적으로 프로세스ID, 도착 시간, 실행 시간 등의 정보를 포함한다.
 * 2. 원형 큐 구현: 이전에 정의한 원형큐를 사용하여 준비 큐(ready queue)를 구현한다. 이 큐는 실행을 
 * 대기하고 있는 프로세스를 저장한다.
 * 3. CPU 스케줄링 시뮬레이션: 시뮬레이션을 위한 메인 함수를 구현한다. 시간을 단위로 증가시키며, 각 단위
 * 시간마다 프로세스를 스케줄링하고 실행한다.
 */

// 프로세스 클래스 정의
class Process {
    constructor(id, arrivalTime, burstTime) {
        this.id = id;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
    }
}

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

function cpuScheduling(processes, timeQuantum) {
    const queue = new CircularQueue(processes.length);
    let currentTime = 0;
    let processIndex = 0;

    while (processIndex < processes.length || !queue.isEmpty()) {
        // 새로운 프로세스를 준비 큐에 추가합니다.
        while (processIndex < processes.length && processes[processIndex].arrivalTime <= currentTime) {
            queue.enqueue(processes[processIndex]);
            processIndex++;
        }

        // 프로세스를 실행합니다.
        if (!queue.isEmpty()) {
            const currentProcess = queue.dequeue();
            const executeTime = Math.min(currentProcess.burstTime, timeQuantum);
            currentTime += executeTime;
            currentProcess.burstTime -= executeTime;

            console.log(`Process ${currentProcess.id} is executed from time ${currentTime - executeTime} to ${currentTime}`);

            // 프로세스가 끝나지 않았다면 다시 큐에 추가합니다.
            if (currentProcess.burstTime > 0) {
                queue.enqueue(currentProcess);
            }
        } else {
            // 큐가 비어있다면 시간을 증가시킵니다.
            currentTime++;
        }
    }
}

// 사용 예시:
const processes = [
    new Process(1, 0, 5),
    new Process(2, 2, 3),
    new Process(3, 4, 2),
    new Process(4, 6, 4)
];
const timeQuantum = 2;
cpuScheduling(processes, timeQuantum);

/**
 * 이 코드는 프로세스를 시뮬레이션하여 라운드 로빈 스케줄링 알고리즘을 기반으로 CPU 시간을 할당한다.
 * 각 프로세스는 정해진 시간 할당량(timeQuantum)동안 실행되며, 그 시간이 지나면 다음 프로세스로 전환한다.
 * 프로세스의 실행이 완료되지 않은 경우, 그 프로세스는 다시 큐의 끝에 추가되어 나중에 계속 실행된다.
 */