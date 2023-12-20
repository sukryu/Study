/**
 * 연결 리스트에서 사이클(cycle) 검출하기.
 * 
 * 연결 리스트에서 사이클을 검출하는 문제는 일반적으로 "플로이드의 사이클 찾기"알고리즘
 * (또는 "토끼와 거북이"알고리즘)을 사용하여 해결할 수 있습니다. 이 방법은 두 포인터(하나는 빠르게 이동하고
 * 나머지는 느리게 이동)를 사용하여 리스트를 순회하며, 두 포인터가 어느 시점에 같은 노드를 가리키면 사이클이 존재한다고 판단한다.
 */

function ListNode(val, next) {
    this.val = val;
    this.next = next || null;
}

function hasCycle(head) {
    let slow = head;
    let fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;          // 느린 포인터는 한 번에 한 노드씩 이동
        fast = fast.next.next;     // 빠른 포인터는 한 번에 두 노드씩 이동

        if (slow === fast) {
            return true;           // 사이클이 존재함
        }
    }

    return false;                  // 사이클이 존재하지 않음
}

// 예시 리스트 생성 (사이클 없음): 1 -> 2 -> 3 -> 4
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);

console.log(hasCycle(head)); // 출력: false

// 사이클 생성 (4 -> 2)
head.next.next.next.next = head.next;

console.log(hasCycle(head)); // 출력: true

/**
 * 
 * 1. ListNode 클래스를 정의하여 연결 리스트의 노드를 생성한다.
 * 2. `hasCylce` 함수는 두 포인터(`slow`와 `fast`)를 사용하여 리스트를 순회한다.
 * 3. `slow` 포인터는 한 번에 한 노드씩, `fast` 포인터는 한번에 두 노드씩 이동한다.
 * 4. 만약 `fast` 포인터가 `null` 또는 `fast.next`가 `null`에 도달하면, 사이클이 없는 것으로 판단.
 * 5. 언젠가 `slow`와 `fast`가 같은 노드를 가리키면, 사이클이 있는 것으로 판단.
 * 
 * 이 알고리즘은 사이클이 있을 경우 O(n), 없을 경우 최악의 상황에서도 O(n)의 시간 복잡도를 가진다.
 * 여기서 n은 연결 리스트의 노드 수이다.
 */