/**
 * 동물 보호소에서 개와 고양이를 입양하는 시스템 구현(최소 대기 시간으로).
 */

class AnimalShelter {
    constructor() {
        this.dogs = [];   // 개를 위한 큐
        this.cats = [];   // 고양이를 위한 큐
        this.order = 0;   // 전체 동물의 대기 순서를 추적
    }

    // 동물을 큐에 추가하는 일반적인 메소드
    enqueue(animal, type) {
        animal.order = this.order++;
        if (type === 'dog') {
            this.dogs.push(animal);
        } else if (type === 'cat') {
            this.cats.push(animal);
        }
    }

    // 개를 입양(제거)
    dequeueDog() {
        return this.dogs.shift();
    }

    // 고양이를 입양(제거)
    dequeueCat() {
        return this.cats.shift();
    }

    // 가장 오래된(최소 대기 시간) 동물을 입양(제거)
    dequeueAny() {
        // 개나 고양이 큐 중 하나가 비어있다면, 다른 하나에서 제거
        if (this.dogs.length === 0) {
            return this.dequeueCat();
        } else if (this.cats.length === 0) {
            return this.dequeueDog();
        }

        // 두 큐 모두 동물이 있다면, 대기 시간이 더 오래된 동물을 제거
        const dog = this.dogs[0];
        const cat = this.cats[0];
        if (dog.order < cat.order) {
            return this.dequeueDog();
        } else {
            return this.dequeueCat();
        }
    }
}

class Animal {
    constructor(name) {
        this.name = name;
        this.order = null; // 입양 대기 순서
    }
}

// 사용 예시
const shelter = new AnimalShelter();
shelter.enqueue(new Animal("Buddy"), 'dog');
shelter.enqueue(new Animal("Molly"), 'dog');
shelter.enqueue(new Animal("Daisy"), 'cat');

console.log(shelter.dequeueAny()); // 가장 먼저 추가된 Buddy (개) 입양
console.log(shelter.dequeueDog()); // 다음으로 먼저 추가된 Molly (개) 입양
console.log(shelter.dequeueCat()); // Daisy (고양이) 입양
