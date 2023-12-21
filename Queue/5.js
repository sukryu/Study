/**
 * 문제: 병원 응급실 대기 시스템 구현하기
 * 
 * 배경: 병원의 응급실에서는 환자들을 효율적으로 관리해야 합니다.
 * 각 환자는 다양한 증상과 위급 상황을 가지고 있으며, 이에 따라 우선순위가 달라져야 합니다.
 * 
 * 목표: 병원 응급실에서 환자들의 대기열을 관리하는 시스템을 구현하세요.
 * 시스템은 환자의 긴급도에 따라 우선 순위를 지정하고, 적절한 순서로 환자를 의사에게 할당해야 합니다.
 * 
 * 요구사항:
 * 1. 환자 정보: 각 환자는 이름, 나이, 증상, 긴급도(낮음, 중간, 높음), 대기시간등의 정보를 가집니다.

 * 2. 우선순위 큐: 환자들은 긴급도에 따라 우선순위 큐에 들어갑니다. 같은 긴급도를 가진 환자들 사이에서는
 * 먼저 온 순서대로 처리됩니다.
 
 * 3. 긴급도 조정: 대기 중인 환자의 증상이 악화되면 긴급도를 상향 조정할 수 있어야 합니다.

 * 4. 환자 처리: 의사는 항상 가장 높은 우선순위를 가진 환자부터 치료를 시작합니다. 환자가 치료를 받으면 큐에서 제거됩니다.

 * 5. 대기 시간 업데이트: 시스템은 일정 시간마다 모든 환자의 대기 시간을 업데이트하고, 특정 대기 시간을 
 * 초과한 환자의 긴급도를 상향 조정해야 합니다.
 * 
 * 6. 보고서 기능: 어느 주어진 시간에 대기열 상태, 처리된 환자 수, 평균 대기 시간 등의 통계를 보고할 수 있어야 합니다.
 * 
 * 7. 인터페이스: 사용자가 환자를 추가, 제거, 긴급도를 조정하고, 대기열을 보는 등의 작업을 할 수 있는 
 * 간단한 인터페이스를 제공해야 합니다.
 * 
 */

const readline = require('readline');

class PriorityQueue {
    constructor(comparator) {
        this.items = [];
        this.comparator = comparator || ((a, b) => a.urgency - b.urgency);
    }

    enqueue(item) {
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.comparator(item, this.items[i]) > 0) {
                this.items.splice(i, 0, item);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(item);
        }
    }

    dequeue() {
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    updateUrgencies() {
        this.items.forEach(patient => patient.updateUrgency());
        this.items.sort(this.comparator);
    }
}


// 데이터 구조와 클래스정의
class Patient {
    constructor(name, age, symptoms, urgency, registrationTime) {
        this.name = name;
        this.age = age;
        this.symptoms = symptoms;
        this.urgency = urgency;
        this.watingTime = 0;
        this.registrationTime = registrationTime;
    }

    updateUrgency() {
        // 긴급도 상향 조정 로직
        if (this.watingTime > 30) { // 대기 시간을 30분으로 초기화
            this.urgency++;
        }
    }

    updateWaitingTime(currentTime) {
        this.watingTime = currentTime - this.registrationTime;
    }
}

const hospitalQueue = new PriorityQueue();
let currentTime = 0; // 현재 시간 (분)

function registerPatient(name, age, symptoms) {
    const urgency = determineUrgency(symptoms); // 긴급도 결정 로직
    const registrationTime = currentTime;
    const patient = new Patient(name, age, symptoms, urgency, registrationTime);
    hospitalQueue.enqueue(patient);
}

function treatNextPatient() {
    const patient = hospitalQueue.dequeue();
    if (patient) {
        console.log(`${patient.name} is being treated.`);
        // 치료 로직 추가 가능
    } else {
        console.log("No patients are waiting.");
    }
}

function updateAllWaitingTimes() {
    currentTime += 1; // 예: 1분 증가
    hospitalQueue.updateUrgencies();
}

function determineUrgency(symptoms) {
    // 증상에 따른 긴급도 결정 로직
    return symptoms.length; // 예시: 긴급도는 증상의 수로 결정
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let totalPatientsTreated = 0;
let totalWaitingTime = 0;

function treatNextPatient() {
    const patient = hospitalQueue.dequeue();
    if (patient) {
        console.log(`${patient.name} is being treated.`);
        totalPatientsTreated++;
        totalWaitingTime += patient.waitingTime;
    } else {
        console.log("No patients are waiting.");
    }
}

function generateReport() {
    console.log("\nHospital Report:");
    console.log(`Total patients treated: ${totalPatientsTreated}`);
    if (totalPatientsTreated > 0) {
        console.log(`Average waiting time: ${totalWaitingTime / totalPatientsTreated} minutes`);
    }
}

function mainMenu() {
    console.log("\nHospital Emergency Room Management System");
    console.log("1. Register a new patient");
    console.log("2. Treat the next patient");
    console.log("3. Update waiting times and urgencies");
    console.log("4. Exit");

    rl.question("Choose an option: ", function(option) {
        switch (option) {
            case '1':
                rl.question("Enter patient details (name, age, symptoms): ", function(input) {
                    const details = input.split(', ');
                    registerPatient(...details);
                    mainMenu();
                });
                break;
            case '2':
                treatNextPatient();
                mainMenu();
                break;
            case '3':
                updateAllWaitingTimes();
                generateReport();
                mainMenu();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log("Invalid option, please try again.");
                mainMenu();
        }
    });
}

mainMenu();