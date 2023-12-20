/** 
 * 연결 리스트를 뒤집어서 순서를 반대로 만들기.
*/

function ListNode(val, next) {
    this.val = val;
    this.next = next || null;
}

function reverseList(head) {
    let prev = null;
    let current = head;

    while (current != null) {
        let next = current.next; // 다음 노드 저장
        current.next = prev; // 현재 노드의 링크를 이전 노드로 변경
        prev = current; // 이전 노드를 현재 노드로 업데이트
        current = next; // 다음 노드로 이동
    }

    return prev; // 새로운 헤드 반환
}

// 예시 리스트 생성: 1 -> 2 -> 3 -> 4
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);

// 리스트 뒤집기
head = reverseList(head);

// 뒤집힌 리스트 출력
let current = head;
while (current != null) {
    console.log(current.val);
    current = current.next;
}

/**
 * 1. `ListNode` 클래스를 정의하여 연결 리스트의 노드를 생성한다.
 * 2. `reverselist` 함수는 주어진 연결 리스트의 노드들의 순서를 뒤집는다.
 * 3. 노드를 순회하면서 각 노드의 `next` 링크를 이전 노드로 변경하고, 이전 노드와 현재 노드를 업데이트한다.
 * 4. 최종적으로 `prev` 노드가 새로운 헤드가 된다.
 * 5. 예시 리스트를 생성하고, 이 리스트를 뒤집은 후 새로운 순서로 노드를 출력한다.
 * 
 * 이 알고리즘은 연결 리스트의 모든 노드를 한 번씩만 방문하므로 시간 복잡도는 O(n)이다. 여기서 n은 연결 리스트의 길이이다.
 */
