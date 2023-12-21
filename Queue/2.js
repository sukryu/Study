/**
 * 라운드 로빈 스케줄링 알고리즘 구현하기.
 */

class Process {
    constructor(name, burstTime) {
        this.name = name;           // 프로세스의 이름
        this.burstTime = burstTime; // 프로세스의 실행에 필요한 총 시간
        this.remainingTime = burstTime; // 남은 실행 시간
    }
}

function roundRobinScheduling(processes, timeQuantum) {
    let time = 0; // 총 경과 시간
    let queue = processes.slice(); // 모든 프로세스를 큐에 복사

    // 큐에 프로세스가 남아있는 동안 반복
    while (queue.length > 0) {
        let currentProcess = queue.shift(); // 큐의 첫 번째 프로세스를 가져옴

        // 실행될 시간을 계산 (타임 퀀텀과 남은 시간 중 작은 값 사용)
        let timeToRun = Math.min(currentProcess.remainingTime, timeQuantum);
        
        // 시간 업데이트
        time += timeToRun;
        currentProcess.remainingTime -= timeToRun;

        console.log(`${currentProcess.name} is running for ${timeToRun}ms. Total time: ${time}ms`);

        // 프로세스가 아직 끝나지 않았다면 큐의 끝에 다시 추가
        if (currentProcess.remainingTime > 0) {
            queue.push(currentProcess);
        }
    }

    console.log(`All processes completed in ${time}ms`);
}

// 예제 프로세스 생성
let processes = [
    new Process("P1", 10),
    new Process("P2", 5),
    new Process("P3", 8)
];

// 타임 퀀텀 설정 (예: 4ms)
let timeQuantum = 4;

// 라운드 로빈 스케줄링 실행
roundRobinScheduling(processes, timeQuantum);
