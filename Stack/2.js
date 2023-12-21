/**
 * 후위 표기법(postfix notation)을 사용하여 수식 계산하기.
 * 
 * 후위 표기법은 연산자가 피연산자들 뒤에 오는 표기법으로, 괄호 없이도 연산의
 * 순서를 명확히 할 수 있어 계산기와 컴퓨터 프로그래밍에서 널리 사용된다.
 * 후위 표기법에서 수식을 계산할 때는 스택을 사용하는 것이 일반적이다.
 */

function calculatePostfix(expression) {
    const stack = [];
    const tokens = expression.split(" ");

    tokens.forEach(token => {
        if (isNumeric(token)) {
            // 숫자인 경우 스택에 넣습니다.
            stack.push(parseInt(token, 10));
        } else {
            // 연산자인 경우, 스택에서 두 개의 숫자를 꺼내 연산을 수행합니다.
            const rightOperand = stack.pop();
            const leftOperand = stack.pop();

            switch(token) {
                case '+':
                    stack.push(leftOperand + rightOperand);
                    break;
                case '-':
                    stack.push(leftOperand - rightOperand);
                    break;
                case '*':
                    stack.push(leftOperand * rightOperand);
                    break;
                case '/':
                    stack.push(leftOperand / rightOperand);
                    break;
                default:
                    throw new Error("Unknown operator");
            }
        }
    });

    // 스택의 마지막 요소가 계산 결과입니다.
    return stack.pop();
}

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// 사용 예시:
const expression = "3 4 + 2 * 7 /";  // 이것은 (3 + 4) * 2 / 7와 같습니다.
console.log(calculatePostfix(expression));  // 출력: 2


/**
 * 1. 스택 초기화: 빈 스택을 생성한다.
 * 2. 토큰 순회:
 *      숫자일 경우: 스택에 푸시한다.
 *      연산자일 경우: 스택에서 두 개의 숫자를 팝하여 해당 연산을 수행하고, 다시 스택에 푸시한다.
 * 3. 결과 반환: 모든 토큰을 처리한 후, 스택에 남아있는 마지막 요소가 계산 결과이다.
 * 
 * 후위 표기법은 연산자의 우선 순위나 괄호를 고려할 필요 없이 간단하고 일관된 방법으로 수식을
 * 계산할 수 있게 해준다. 따라서 컴파일러나 계산기와 같은 시스템에서 널리 사용된다. 위 코드는 기본적인
 * 사칙연산을 지원하지만, 필요에 따라 다른 연산자나 기능을 추가하여 확장할 수 있다.
 */