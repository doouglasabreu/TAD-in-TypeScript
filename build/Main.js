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
var Stack = /** @class */ (function () {
    function Stack() {
        this.top = null;
        this.size = 0;
    }
    Stack.prototype.createElement = function (value) {
        return new No(-1, value);
    };
    Stack.prototype.empty = function () {
        return this.top == null;
    };
    // looks the top object without remove
    Stack.prototype.peek = function () {
        return this.empty() ? null : this.top.getValue();
    };
    // insert
    Stack.prototype.push = function (value) {
        var element = this.createElement(value);
        element.setLeft(this.top);
        this.top = element;
        this.size += 1;
    };
    // remove
    Stack.prototype.pop = function () {
        if (this.empty()) {
            return null;
        }
        var element = this.top;
        this.top = element.getLeft(); // top = down
        this.size -= 1;
        return element.getValue();
    };
    // return index of value or -1 if not exists
    Stack.prototype.search = function (value) {
        var pos = this.size;
        var element = this.top;
        while (element != null) {
            if (element.getValue() == value) {
                return pos;
            }
            pos -= 1;
            element = element.getLeft();
        }
        return -1;
    };
    Stack.prototype.getSize = function () {
        return this.size;
    };
    Stack.prototype.print = function () {
        var element = this.top;
        while (element != null) {
            console.log(element.getValue());
            element = element.getLeft();
        }
    };
    return Stack;
}());
//// <reference path="TreeAVL.ts" />
//// <reference path="ArrayList.ts" />
/// <reference path="Stack.ts" />
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
/*
let array = new ArrayList()
array.add("primeiro")
array.add("segundo")
array.add("terceiro")
array.add("quarto")
array.add("quinto")
array.addIn(14, "terceiro")

array.remove("dellta")
array.addIn(0, "antesdetudo")
array.remove("quinto")
array.remove("antesdetudo")
array.print()
console.log(array.lastIndexOf("terceiro"))
*/
var stack = new Stack();
stack.push("bart");
stack.push("hommer");
stack.push("lisa");
stack.pop();
stack.push("megg");
stack.push("marge");
stack.print();
console.log(stack.getSize());
