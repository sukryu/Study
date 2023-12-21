/**
 * 이진 트리에서 모든 경로의 합이 특정 값과 일치하는 경우 찾기.
 * 
 * 이 문제는 깊이 우선 탐색(DFS) 알고리즘을 사용하여 해결할 수 있다. 이 문제에서는 트리의
 * 루트부터 시작하여 각 노드를 순회하면서, 현재 경로의 합을 계산하고, 그 합이 목표 값과
 * 일치하는지 확인한다. 목표 값과 일치하는 모든 경로를 찾아야 하므로, 리프 노드에 도달했을 때만
 * 경로의 합을 검증하고, 모든 가능한 경로를 탐색한다.
 */

class TreeNode {
    constructor(value = 0, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function pathSum(root, targetSum) {
    const paths = [];
    findPaths(root, targetSum, [], paths);
    return paths;
}

function findPaths(node, targetSum, currentPath, paths) {
    if (node === null) {
        return;  // 빈 노드인 경우 종료
    }

    // 현재 경로에 노드를 추가합니다.
    currentPath.push(node.value);

    // 리프 노드에 도달하고, 경로의 합이 목표값과 일치하는지 확인합니다.
    if (node.left === null && node.right === null && targetSum === node.value) {
        paths.push([...currentPath]);
    } else {
        // 왼쪽 및 오른쪽 자식으로 재귀적으로 탐색을 계속합니다.
        findPaths(node.left, targetSum - node.value, currentPath, paths);
        findPaths(node.right, targetSum - node.value, currentPath, paths);
    }

    // 다른 경로를 위해 마지막 노드를 제거합니다.
    currentPath.pop();
}

// 사용 예시:
const root = new TreeNode(5);
root.left = new TreeNode(4);
root.right = new TreeNode(8);
root.left.left = new TreeNode(11);
root.right.left = new TreeNode(13);
root.right.right = new TreeNode(4);
root.left.left.left = new TreeNode(7);
root.left.left.right = new TreeNode(2);
root.right.right.right = new TreeNode(1);

const targetSum = 22;
const result = pathSum(root, targetSum);
console.log(result);  // 출력: [[5, 4, 11, 2], [5, 8, 4, 5]]

/**
 * 1. 트리노드 정의: `TreeNode` 클래스를 사용하여 이진 트리의 노드를 정의한다.
 * 2. 경로 찾기 함수: `findPaths` 함수는 주어진 노드부터 시작하여 목표 합에 도달하는 모든 경로를 찾는다.
 * 3. 경로의 합 계산: 현재 노드의 값을 경로에 추가하고, 목표 합에서 뺸다. 리프 노드에 도달헀을 때 
 * 경로의 합이 0이면, 이 경로는 목표 합에 해당하는 경로이다.]
 * 4. 모든 경로 탐색: 모든 자식 노드에 대해 재귀적으로 경로 찾기 함수를 호출하여, 트리의 모든 경로를
 * 탐색한다.
 * 5. 결과 반환: 탐색을 마친 후, 목표 합에 해당하는 모든 경로를 포함하는 배열을 반환한다.
 * 
 * 이 알고리즘은 트리의 모든 경로를 탐색하므로, 시간 복잡도는 O(n)이다, 여기서 n은 트리의 노드수이다.
 * 이 방법은 이진 트리의 구조에 관계없이 일관되게 작동하며, 모든 가능한 경로를 효과적으로 찾아낸다.
 */