/** 
 * 연결 리스트에서 중간 노드 삭제하기 (접근이 단방향인 경우).
 * 
 * 단방향 연결 리스트에서 중간 노드를 삭제하는 문제는 주로 "노드에 대한 접근 권한이 있을 때,
 * 해당 노드를 리스트에서 삭제하기"로 해석된다. 이 문제의 핵심은 삭제하려는 노드의 다음 노드를 현재
 * 노드로 "복사"하는 것이다. 여기서 중요한 점은 삭제할 노드가 리스트의 마지막 노드가 아니어야 하며, 노드에 대한
 * 접근이 가능해야 한다.
*/

function ListNode(val, next) {
    this.val = val;
    this.next = next || null;
}

function deleteNode(node) {
    if (node == null || node.next == null) {
        throw new Error('Invalid node or last node cannot be deleted this way.');
    }

    node.val = node.next.val;
    node.next = node.next.next;
}

// 예시 리스트 생성: 1 -> 2 -> 3 -> 4
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);

// 3번 노드 삭제
deleteNode(head.next.next);

// 리스트 출력
let current = head;
while(current != null) {
    console.log(current.val);
    current = current.next;
}

/**
 * 1. `ListNode` 클래스를 정의하여 연결 리스트의 노드를 생성한다.
 * 2. `deleteNode` 함수는 주어진 노드를 삭제한다. 여기서 "삭제"는 실제로 다음 노드의 값을
 * 현재 노드에 복사하고, 다음 노드로의 링크를 다음 다음 노드로 변경하는 것을 의미한다.
 * 3. 예시 리스트를 생성하고, 특정 노드(여기서는 값이 3인 노드)를 삭제한다.
 * 4. 삭제 작업 후의 리스트를 순회하며 각 노드의 값을 출력한다.
 * 
 * 이 방법은 삭제하려는 노드가 마지막 노드가 아닐 때만 작동한다. 마지막 노드를 이 방법으로
 * 삭제하려 하면 문제가 발생할 수 있다. 또한, 이 방법은 삭제하려는 노드에 직접 접근 할 수 있을 때만 가능하다.
 */