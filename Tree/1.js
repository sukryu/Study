/**
 * 이진 트리에서 특정 깊이의 노드 찾기.
 */

class TreeNode {
    constructor(value = 0, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function findNodesAtDepth(root, targetDepth) {
    if (!root) return [];  // 빈 트리의 경우 빈 배열을 반환합니다.

    const queue = [{ node: root, depth: 0 }];  // 노드와 해당 노드의 깊이를 저장합니다.
    const result = [];

    while (queue.length > 0) {
        const { node, depth } = queue.shift();  // 큐의 첫 번째 요소를 추출합니다.

        // 현재 노드의 깊이가 목표 깊이와 같다면 결과 배열에 추가합니다.
        if (depth === targetDepth) {
            result.push(node.value);
        }

        // 현재 노드의 깊이가 목표 깊이보다 작다면 자식 노드들을 큐에 추가합니다.
        if (depth < targetDepth) {
            if (node.left) queue.push({ node: node.left, depth: depth + 1 });
            if (node.right) queue.push({ node: node.right, depth: depth + 1 });
        }
    }

    return result;
}

// 사용 예시:
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

console.log(findNodesAtDepth(root, 2));  // 출력: [4, 5, 6, 7]

/**
 * 1. 트리노드 정의: `TreeNode` 클래스를 사용하여 이진 트리의 노드를 정의합니다.
 * 2. BFS 구현: BFS를 사용하여 트리를 레벨별로 탐색한다. 각 노드와 해당 노드의 깊이를
 * 함께 큐에 저장한다.
 * 3. 타켓 깊이 노드 찾기: 큐에서 노드를 하나씩 꺼내며, 그 노드의 깊이가 타켓 깊이와 일치하는지 확인한다.
 * 일치한다면 결과 배열에 노드 값을 추가한다.
 * 4. 결과 반환: 탐색을 마친 후, 타켓 깊이에 있는 모든 노드의 값을 담은 배열을 반환한다.
 */