/**
 * 큐를 이용한 트리 레벨 순회(level-order traversal).
 */

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function levelOrderTraversal(root) {
    if (root == null) {
        return;
    }

    const queue = [];  // 노드를 저장할 큐
    queue.push(root);  // 루트 노드를 큐에 추가

    // 큐에 노드가 있는 동안 반복
    while (queue.length > 0) {
        const current = queue.shift();  // 큐의 첫 번째 노드를 가져옴

        // 현재 노드 처리 (예: 출력)
        console.log(current.value);

        // 현재 노드의 왼쪽 자식이 있다면 큐에 추가
        if (current.left !== null) {
            queue.push(current.left);
        }

        // 현재 노드의 오른쪽 자식이 있다면 큐에 추가
        if (current.right !== null) {
            queue.push(current.right);
        }
    }
}

// 예제 트리 구성
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

// 레벨 순회 실행
console.log("Level order traversal of binary tree is -");
levelOrderTraversal(root);
