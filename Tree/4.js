/**
 * AVL 트리 또는 레드-블랙 트리 구현하기.
 */

class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;  // 높이를 추적합니다.
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // 높이를 가져옵니다.
    getHeight(node) {
        if (!node) return 0;
        return node.height;
    }

    // 균형 인자를 계산합니다.
    getBalanceFactor(node) {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // 오른쪽으로 회전합니다.
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;

        // 높이 업데이트
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    // 왼쪽으로 회전합니다.
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;

        // 높이 업데이트
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    // AVL 트리에 노드를 삽입합니다.
    insertNode(node, value) {
        // 1. 일반 이진 탐색 트리 삽입 로직
        if (!node) return new AVLNode(value);
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        } else {
            return node; // 중복된 값을 허용하지 않습니다.
        }

        // 2. 높이 업데이트
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

        // 3. 균형 상태 확인
        const balanceFactor = this.getBalanceFactor(node);

        // 4. 균형이 깨진 경우, 4가지 유형의 회전 중 하나를 수행합니다.
        // LL Case
        if (balanceFactor > 1 && value < node.left.value) {
            return this.rotateRight(node);
        }

        // RR Case
        if (balanceFactor < -1 && value > node.right.value) {
            return this.rotateLeft(node);
        }

        // LR Case
        if (balanceFactor > 1 && value > node.left.value) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // RL Case
        if (balanceFactor < -1 && value < node.right.value) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node; // 균형이 유지된 경우 변경되지 않은 노드를 반환합니다.
    }

    // 트리에 새 값을 삽입합니다.
    insert(value) {
        this.root = this.insertNode(this.root, value);
    }
}

// 사용 예시
const avlTree = new AVLTree();
avlTree.insert(10);
avlTree.insert(20);
avlTree.insert(30);
avlTree.insert(40);
avlTree.insert(50);
avlTree.insert(25);
// 이제 avlTree는 균형이 잡힌 이진 검색 트리입니다.