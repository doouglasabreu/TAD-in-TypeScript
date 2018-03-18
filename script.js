var No = /** @class */ (function () {
    function No(id, value) {
        this.id = id;
        this.value = value;
        this.left = this.right = null;
    }
    // getters and setters methods
    No.prototype.getId = function () {
        return this.id;
    };
    No.prototype.getValue = function () {
        return this.value;
    };
    No.prototype.setValue = function (value) {
        this.value = value;
    };
    No.prototype.getRight = function () {
        return this.right;
    };
    No.prototype.setRight = function (right) {
        this.right = right;
    };
    No.prototype.getLeft = function () {
        return this.left;
    };
    No.prototype.setLeft = function (left) {
        this.left = left;
    };
    return No;
}());
var TreeAVL = /** @class */ (function () {
    function TreeAVL() {
        this.root = null;
    }
    // infix print
    TreeAVL.prototype.print = function () {
        this.printRecursive(this.root);
    };
    TreeAVL.prototype.printRecursive = function (no) {
        if (no == null) {
            return;
        }
        this.printRecursive(no.getLeft());
        this.printRecursive(no.getRight());
        console.log(' | ', no.getId());
    };
    TreeAVL.prototype.insert = function (no) {
        if (this.root == null) {
            this.root = no;
            return;
        }
        var node = this.root;
        var prev = null;
        while (node != null) {
            prev = node;
            if (no.getId() <= node.getId()) {
                node = node.getLeft();
            }
            else {
                node = node.getRight();
            }
        }
        if (no.getId() <= prev.getId()) {
            prev.setLeft(no);
        }
        else {
            prev.setRight(no);
        }
    };
    //return false if id not exists in the AVL or No corresponding
    TreeAVL.prototype.contains = function (id) {
        var no = this.root;
        while (no != null) {
            if (no.getId() > id) {
                no = no.getLeft();
                continue;
            }
            else if (no.getId() < id) {
                no = no.getRight();
            }
            else {
                return true;
            }
        }
        return false;
    };
    TreeAVL.prototype.remove = function (id) {
        if (!this.contains(id)) {
            return false;
        }
        // searching the node father
        var father = this.root;
        var no;
        while (true) {
            if ((father.getLeft() != null && father.getLeft().getId() == id) || (father.getRight() != null && father.getRight().getId() == id)) {
                no = (father.getLeft() != null && father.getLeft().getId() == id) ? father.getLeft() : father.getRight();
                break;
            }
            if (father.getId() >= id) {
                father = father.getLeft();
            }
            else {
                father = father.getRight();
            }
        }
        console.log("Removendo de ", father.getId(), " o no ", no.getId());
        this.removeNodes(father, no);
    };
    TreeAVL.prototype.removeNodes = function (father, no) {
        // if the no not have two children
        if (no.getLeft() == null || no.getRight() == null) {
            var noAux = no.getLeft() == null ? no.getRight() : no.getLeft();
            if (father.getLeft() == no) {
                father.setLeft(noAux);
                return;
            }
            else {
                father.setRight(noAux);
                return;
            }
        }
    };
    return TreeAVL;
}());
var tree = new TreeAVL();
tree.insert(new No(4, "Teste"));
tree.insert(new No(2, "Teste"));
tree.insert(new No(1, "Teste"));
tree.insert(new No(3, "Teste"));
tree.insert(new No(6, "Teste"));
tree.insert(new No(5, "Teste"));
tree.insert(new No(7, "Teste"));
tree.insert(new No(5.5, "teste"));
tree.insert(new No(0, "Teste"));
tree.remove(1);
tree.print();
