var array = new Array(13, 14, 1, 2, 25, 5, 7, 56, 3);

function Tree() {
    this.root = null;
}

function TreeNode(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

Tree.prototype.add = function (value) {
    if (!this.root) {
        this.root = new TreeNode(value);
    }

    this._recursiveAdd(value, this.root);
}

Tree.prototype._recursiveAdd = function (value, node) {   

    if (value > node.value) {
        if (node.right) {
            this._recursiveAdd(value, node.right);
        } else {
            node.right = new TreeNode(value);
        }
    }

    if (value < node.value) {
        if (node.left) {
            this._recursiveAdd(value, node.left);
        } else {
            node.left = new TreeNode(value);
        }
    }
}

var tree = new Tree();

for (var i = 0; i < array.length; i++) {
    tree.add(array[i]);
}

