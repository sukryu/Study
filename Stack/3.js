/**
 * 최소값을 O(1) 시간 복잡도로 반환하는 스택 구현.
 * 
 * 위를 구현하기 위해서는 각 단계에서의 최소값을 추적하는 추가적인 스택을 이용할 수 있다.
 * 기본 스택에는 정상적으로 값을 쌓으면서, 최소 값 스택에서는 각 단계에서의 최소값을 유지한다.
 * 새로운 요소가 추가될 때마다, 그 요소와 최소값 스택의 최상단 요소를 비교하여 더작은 값을 최소값 스택에 쌓는다.
 */

class MinStack {
    constructor() {
        this.stack = [];  // 기본 스택
        this.minStack = [];  // 최소값을 추적하는 스택
    }

    push(x) {
        // 기본 스택에 값을 쌓습니다.
        this.stack.push(x);

        // 최소값 스택에 현재 최소값을 쌓습니다.
        if (this.minStack.length === 0) {
            this.minStack.push(x);
        } else {
            // 새 값과 현재 최소값 중 더 작은 값을 최소값 스택에 쌓습니다.
            this.minStack.push(Math.min(x, this.minStack[this.minStack.length - 1]));
        }
    }

    pop() {
        // 기본 스택과 최소값 스택에서 요소를 제거합니다.
        this.minStack.pop();
        return this.stack.pop();
    }

    top() {
        // 기본 스택의 최상단 요소를 반환합니다.
        return this.stack[this.stack.length - 1];
    }

    getMin() {
        // 최소값 스택의 최상단 요소를 반환합니다.
        // 이는 현재 스택의 최소값입니다.
        return this.minStack[this.minStack.length - 1];
    }
}

// 사용 예시:
const stack = new MinStack();
stack.push(-2);
stack.push(0);
stack.push(-3);
console.log(stack.getMin());  // 출력: -3
stack.pop();
console.log(stack.top());    // 출력: 0
console.log(stack.getMin());  // 출력: -2

/**
 * `push(x)`: 요소를 스택에 쌓으면서 최소값을 업데이트 한다.
 * `pop()`: 요소를 스택에서 제거한다.
 * `top()`: 스택의 최상단 요소를 반환한다.
 * `getMin()`: 스택의 최소값을 반환한다.
 * 
 * 이 구현을 통해 `getMin()` 메소드는 항상 O(1) 시간 복잡도로 최소값을 반환할 수 있다.
 * 이는 최소값을 추적하기 위해 별도의 스택 (`minStack`)을 사용하기 때문에 가능하다.
 * 각 단계에서 최소값 스택의 최상단 요소는 해당 시점에서의 스택 내 최소값을 반영한다.
 * 따라서 복잡한 계산 없이도 현재 최소값을 즉시 알 수 있다.
 */