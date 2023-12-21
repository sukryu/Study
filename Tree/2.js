/**
 * 이진 검색 트리(Binary Search Tree)에서 두 노드 간의 최소 공통 조상 찾기.
 * 
 * 이 문제는 트리의 두 노드가 주어졌을 때, 두 노드 모두의 조상이면서 가장 가까운(즉, 가장 낮은)
 * 노드를 찾는 것이다. 이진 검색 트리의 속성을 활용하면 이 문제를 효율적으로 해결할 수 있다.
 * 
 * 이진 검색 트리에서는 모든 노드가 다음과 같은 속성을 가진다. 왼쪽 자식 노드의 값 < 부모 노드의 값 <
 * 오른쪽 자식 노드의 값. 이 속성을 활용하여 두 노드의 최소 공통 조상을 찾을 수 있다.
 */

class TreeNode {
    constructor(value = 0, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function findLowestCommonAncestor(root, node1, node2) {
    if (!root) return null;

    // node1과 node2의 값이 현재 노드의 값보다 작으면 왼쪽 서브트리로 이동합니다.
    if (node1.value < root.value && node2.value < root.value) {
        return findLowestCommonAncestor(root.left, node1, node2);
    }

    // node1과 node2의 값이 현재 노드의 값보다 크면 오른쪽 서브트리로 이동합니다.
    if (node1.value > root.value && node2.value > root.value) {
        return findLowestCommonAncestor(root.right, node1, node2);
    }

    // 그렇지 않다면 현재 노드가 LCA입니다.
    return root;
}

// 사용 예시:
const root = new TreeNode(6);
root.left = new TreeNode(2);
root.right = new TreeNode(8);
root.left.left = new TreeNode(0);
root.left.right = new TreeNode(4);
root.right.left = new TreeNode(7);
root.right.right = new TreeNode(9);

const node1 = root.left; // 노드 2
const node2 = root.left.right; // 노드 4

const lca = findLowestCommonAncestor(root, node1, node2);
console.log(lca.value);  // 출력: 2

/**
 * 1. 트리 노드의 정의: `TreeNode` 클래스를 사용하여 이진 검색 트리의 노드를 정의한다.
 * 2. LCA 찾기: 재귀 함수 `findLowestcommonAncestor`를 사용하여 트리를 탐색하며 LCA를 찾는다.
 *      - 만약 두 노드의 값이 현재 노드보다 작다면, LCA는 왼쪽 서브트리에 있을 것이다.
 *      - 만약 두 노드의 값이 현재 노드보다 크다면, LCA는 오른쪽 서브트리에 있을 것이다.
 *      - 그렇지 않으면, 현재 노드가 두 노드의 LCA이다.
 * 3. 결과 출력: 계산된 LCA의 값을 출력한다.
 * 
 * 이 방법은 이진 검색 트리의 속성을 활용하여 효율적으로 최소 공통 조상을 찾는다.
 * 탐색 과정에서 불필요한 노드를 건너뛰므로, 시간 복잡도는 트리의 높이에 비례하는 O(h)이다.
 * 여기서 h는 트리의 높이이다. 이 알고리즘은 이진 검색 트리가 잘 균형을 이루고 있을 때 효율적이다.
 */