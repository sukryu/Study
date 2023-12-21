/**
 * 두 연결 리스트의 교차점(intersection) 찾기.
 */

// ListNode 클래스: 연결 리스트의 노드를 나타냅니다.
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// getIntersectionNode 함수: 두 연결 리스트의 교차점을 찾아 반환합니다.
function getIntersectionNode(headA, headB) {
    if (headA == null || headB == null) return null;

    // 두 포인터를 각각 리스트의 시작 부분에 위치시킵니다.
    let a = headA;
    let b = headB;

    // 두 리스트를 동시에 순회합니다.
    while (a !== b) {
        // a가 리스트의 끝에 도달하면, b 리스트의 시작으로 이동합니다.
        a = a == null ? headB : a.next;
        // b가 리스트의 끝에 도달하면, a 리스트의 시작으로 이동합니다.
        b = b == null ? headA : b.next;
    }

    // 두 포인터가 만나는 지점이 교차점입니다. 만나지 않는다면 null을 반환합니다.
    return a;
}

// 사용 예시
// 리스트 생성: 1 -> 2 -> 3 -> 4 -> 5
let listA = new ListNode(1);
listA.next = new ListNode(2);
listA.next.next = new ListNode(3);
listA.next.next.next = new ListNode(4);
listA.next.next.next.next = new ListNode(5);

// 다른 리스트 생성: 9 -> 8 -> 2 -> 3 -> 4 -> 5 (2에서 교차)
let listB = new ListNode(9);
listB.next = new ListNode(8);
listB.next.next = listA.next.next; // 2에서 교차

// 교차점 찾기
let intersection = getIntersectionNode(listA, listB);
if (intersection) {
    console.log(`교차점의 값: ${intersection.val}`); // 출력: 교차점의 값: 3
} else {
    console.log("교차점이 없습니다.");
}


/**
 * 이 코드는 두 연결 리스트의 시작 부분에서 시작하여 각각 다른 리스트의 끝에 도달할 때까지
 * 순회한다. 두 포인터가 같은 노드를 가리키게 되면, 그 노드가 교차점이다. 만약 두 리스트가 교차하지 않는다면
 * , 두 포인터는 모두 `null`을 가리키게 되며, 이 경우 함수는 `null`을 반환한다. 이 알고리즘은
 * 각 리스트를 최대 두 번 순회하므로 시간 복잡도는 O(n + m)이다 여기서 n과 m은 각각 두 리스트의 길이이다.
 */