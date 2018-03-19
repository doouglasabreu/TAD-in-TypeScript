var No = /** @class */ (function () {
    function No(id, value) {
        this.id = id;
        this.value = value;
        this.height = 0;
        this.left = this.right = null;
    }
    // getters and setters methods
    No.prototype.getId = function () {
        return this.id;
    };
    No.prototype.setId = function (id) {
        this.id = id;
    };
    No.prototype.getValue = function () {
        return this.value;
    };
    No.prototype.setValue = function (value) {
        this.value = value;
    };
    No.prototype.getHeight = function () {
        return this.height;
    };
    No.prototype.setHeight = function (height) {
        this.height = height;
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
/// <reference path="No.ts" />
var TreeAVL = /** @class */ (function () {
    function TreeAVL() {
        this.root = null;
    }
    // infix print
    TreeAVL.prototype.print = function () {
        this.printRecursive(this.root);
    };
    TreeAVL.prototype.createNo = function (id, value) {
        return new No(id, value);
    };
    TreeAVL.prototype.printRecursive = function (no) {
        if (no == null) {
            return;
        }
        this.printRecursive(no.getLeft());
        this.printRecursive(no.getRight());
        console.log(' | ', no.getId());
    };
    TreeAVL.prototype.insert = function (id, value) {
        this.root = this.insertRecursive(this.root, this.createNo(id, value));
    };
    TreeAVL.prototype.insertRecursive = function (father, no) {
        if (father == null) {
            return no;
        }
        console.log("Inserindo o no " + no.getId());
        if (no.getId() <= father.getId()) {
            father.setLeft(this.insertRecursive(father.getLeft(), no));
        }
        else {
            father.setRight(this.insertRecursive(father.getRight(), no));
        }
        return this.rotates(father);
    };
    TreeAVL.prototype.getHeight = function () {
        return this.getHeightRecursive(this.root);
    };
    TreeAVL.prototype.getHeightRecursive = function (no) {
        if (no == null) {
            return 0;
        }
        var heightL = this.getHeightRecursive(no.getLeft()) + 1;
        var heightR = this.getHeightRecursive(no.getRight()) + 1;
        return heightL > heightR ? heightL : heightR;
    };
    TreeAVL.prototype.get = function (id) {
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
                return no;
            }
        }
        return null;
    };
    TreeAVL.prototype.rotates = function (father) {
        var heightL = father.getLeft() == null ? 0 : father.getLeft().getHeight() + 1;
        var heightR = father.getRight() == null ? 0 : father.getRight().getHeight() + 1;
        father.setHeight(heightL > heightR ? heightL : heightR);
        // rotate to right
        if (heightL - heightR == 2) {
            if (this.getFactor(father.getLeft()) == -1) {
                father.setLeft(this.rotateLL(father.getLeft()));
            }
            var newRoot = this.rotateRR(father);
            /// console.log("limpando os height a partir de " + newRoot.getId())
            this.clearHeights(newRoot);
            return newRoot;
        }
        else if (heightL - heightR == -2) {
            if (this.getFactor(father.getRight()) == 1) {
                father.setRight(this.rotateRR(father.getRight()));
            }
            var newRoot = this.rotateLL(father);
            /// console.log("limpando os height a partir de " + newRoot.getId())
            this.clearHeights(newRoot);
            return newRoot;
        }
        return father;
    };
    TreeAVL.prototype.getFactor = function (node) {
        var heightL = node.getLeft() == null ? 0 : node.getLeft().getHeight() + 1;
        var heightR = node.getRight() == null ? 0 : node.getRight().getHeight() + 1;
        return heightL - heightR;
    };
    TreeAVL.prototype.rotateLL = function (no) {
        /// console.log("Rotaiconado para a esquerda em " + no.getId())
        var node = no.getRight();
        no.setRight(node.getLeft());
        node.setLeft(no);
        return node;
    };
    TreeAVL.prototype.rotateRR = function (no) {
        /// console.log("Rotacionando para a direita em " + no.getId())
        var node = no.getLeft();
        no.setLeft(node.getRight());
        node.setRight(no);
        return node;
    };
    TreeAVL.prototype.clearHeights = function (father) {
        if (father == null) {
            return 0;
        }
        var heightL = this.clearHeights(father.getLeft());
        var heightR = this.clearHeights(father.getRight());
        father.setHeight(heightL > heightR ? heightL : heightR);
        return father.getHeight() + 1;
    };
    //return false if id not exists in the AVL or true if exists
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
        /// console.log("removendo " + id)
        this.root = this.removeRecursive(this.root, id);
    };
    TreeAVL.prototype.removeRecursive = function (father, id) {
        if (father == null) {
            return null;
        }
        if (father.getId() > id) {
            father.setLeft(this.removeRecursive(father.getLeft(), id));
            return this.rotates(father);
        }
        else if (father.getId() < id) {
            father.setRight(this.removeRecursive(father.getRight(), id));
            return this.rotates(father);
        }
        // have none no. getLeft and getRight is null
        if (father.getLeft() == father.getRight()) {
            return null;
        }
        // have only one no
        if ((father.getLeft() == null && father.getRight() != null) || (father.getLeft() != null && father.getRight() == null)) {
            return father.getLeft() == null ? father.getRight() : father.getLeft();
        }
        // have two no
        var newNode = this.getNextToRemove(father);
        father.setId(newNode.getId());
        father.setValue(newNode.getValue());
        // remove again
        father.setLeft(this.removeRecursive(father.getLeft(), newNode.getId()));
        return father;
    };
    TreeAVL.prototype.getNextToRemove = function (no) {
        var node = no.getLeft();
        while (node.getRight() != null) {
            node = node.getRight();
        }
        return node;
    };
    return TreeAVL;
}());
/// <reference path="No.ts" />
// doubly chained - duplamente encadeada
var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.qtd = 0;
        this.first = null;
        this.last = null;
    }
    ArrayList.prototype.isEmpty = function () {
        return this.qtd == 0;
    };
    ArrayList.prototype.size = function () {
        return this.qtd;
    };
    ArrayList.prototype.createNo = function (id, value) {
        return new No(id, value);
    };
    ArrayList.prototype.add = function (value) {
        this.qtd += 1;
        var element = this.createNo(this.qtd, value);
        if (this.first == null) {
            this.first = element;
            this.last = element;
            return;
        }
        // in the list, the right is the next; the left is the prev
        var lastElement = this.last;
        lastElement.setRight(element); // setNext
        element.setLeft(lastElement); // setPrev
        this.last = element;
    };
    ArrayList.prototype.addIn = function (index, value) {
        this.qtd += 1;
        var element = this.createNo(this.qtd, value);
        if (index == 0) {
            element.setRight(this.first);
            this.first.setLeft(element);
            this.first = element;
            return;
        }
        // if index is invalid or the last, insert in the last position
        if (index >= this.qtd - 1) {
            element.setLeft(this.last);
            this.last.setRight(element);
            this.last = element;
            return;
        }
        var i = 1;
        var no = this.first;
        while (i < index) {
            no = no.getRight(); // no = next
            i += 1;
        }
        element.setRight(no.getRight());
        no.getRight().setLeft(element);
        no.setRight(element);
        element.setLeft(no);
    };
    ArrayList.prototype.contains = function (value) {
        var i = 0;
        var element = this.first;
        while (i < this.qtd) {
            if (element.getValue() == value) {
                return true;
            }
            else {
                element = element.getRight();
            }
        }
        return false;
    };
    ArrayList.prototype.get = function (index) {
        if (index < 0 || index > this.qtd) {
            return -1;
        }
        var i = 0;
        var element = this.first;
        while (i < index) {
            element = element.getRight();
            i += 1;
        }
        return element.getValue();
    };
    ArrayList.prototype.remove = function (value) {
        var element = this.first;
        while (element != null) {
            if (element.getValue() == value) {
                break;
            }
            element = element.getRight();
        }
        if (element == null) {
            return;
        }
        this.qtd -= 1;
        var last = element.getLeft();
        // is the first element
        if (last == null) {
            this.first = element.getRight();
            return;
        }
        // is the last element
        if (element == this.last) {
            last.setRight(null);
            this.last = last;
            return;
        }
        var next = element.getRight();
        last.setRight(next);
        next.setLeft(last);
    };
    ArrayList.prototype.print = function () {
        var element = this.first;
        while (element != null) {
            console.log(element.getValue());
            element = element.getRight();
        }
    };
    ArrayList.prototype.indexOf = function (value) {
        var i = 0;
        var element = this.first;
        while (element != null) {
            if (element.getValue() == value) {
                return i;
            }
            i += 1;
            element = element.getRight();
        }
        return -1;
    };
    ArrayList.prototype.lastIndexOf = function (value) {
        var i = this.qtd - 1;
        var element = this.last;
        while (element != null) {
            if (element.getValue() == value) {
                return i;
            }
            i -= 1;
            element = element.getLeft();
        }
        return -1;
    };
    return ArrayList;
}());
/// <reference path="TreeAVL.ts" />
/// <reference path="ArrayList.ts" />
/*
let tree = new TreeAVL()

tree.insert(7, "Teste")
tree.insert(4, "Teste")
tree.insert(9, "Teste")
tree.insert(2, "Teste")
tree.insert(5, "Teste")
tree.insert(8, "Teste")
tree.insert(10, "Teste")

tree.remove(4)

tree.print()
*/
var array = new ArrayList();
array.add("primeiro");
array.add("segundo");
array.add("terceiro");
array.add("quarto");
array.add("quinto");
array.addIn(14, "terceiro");
array.remove("dellta");
array.addIn(0, "antesdetudo");
array.remove("quinto");
array.remove("antesdetudo");
array.print();
console.log(array.lastIndexOf("terceiro"));
