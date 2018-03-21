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
    ArrayList.prototype.createElement = function (id, value) {
        return new No(id, value);
    };
    ArrayList.prototype.add = function (value) {
        this.qtd += 1;
        var element = this.createElement(this.qtd, value);
        if (this.first == null) {
            this.first = element;
            this.last = element;
            return this.first.getValue();
        }
        // in the list, the right is the next; the left is the prev
        var lastElement = this.last;
        lastElement.setRight(element); // setNext
        element.setLeft(lastElement); // setPrev
        this.last = element;
        return element.getValue();
    };
    ArrayList.prototype.addIn = function (index, value) {
        this.qtd += 1;
        var element = this.createElement(this.qtd, value);
        if (index == 0) {
            element.setRight(this.first);
            this.first.setLeft(element);
            this.first = element;
            return this.first.getValue();
        }
        // if index is invalid or the last, insert in the last position
        if (index >= this.qtd - 1) {
            element.setLeft(this.last);
            this.last.setRight(element);
            this.last = element;
            return element.getValue();
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
        return element.getValue();
    };
    ArrayList.prototype.contains = function (value) {
        var i = 0;
        var element = this.first;
        while (element != null) {
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
        if (index < 0 || index >= this.qtd) {
            return null;
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
/// <reference path="ArrayList.ts" />
var Color;
(function (Color) {
    Color[Color["White"] = 0] = "White";
    Color[Color["Black"] = 1] = "Black";
    Color[Color["Gray"] = 2] = "Gray";
})(Color || (Color = {}));
var Vertex = /** @class */ (function () {
    function Vertex(id) {
        this.id = id;
        this.adjacents = new ArrayList();
    }
    Vertex.prototype.getId = function () {
        return this.id;
    };
    Vertex.prototype.setId = function (id) {
        this.id = id;
    };
    Vertex.prototype.getCor = function () {
        return this.color;
    };
    Vertex.prototype.setcor = function (cor) {
        return this.color;
    };
    Vertex.prototype.isAdjacent = function (adjacent) {
        return this.adjacents.contains(adjacent);
    };
    Vertex.prototype.setAdjacent = function (adjacent) {
        if (this.isAdjacent(adjacent)) {
            return;
        }
        this.adjacents.add(adjacent);
    };
    Vertex.prototype.removeAdjacent = function (adjacent) {
        this.adjacents.remove(adjacent);
    };
    Vertex.prototype.printAdjacents = function () {
        var i = 0;
        console.log(this.id + "::");
        while (i < this.adjacents.size()) {
            console.log(this.adjacents.get(i).getId());
            i += 1;
        }
    };
    return Vertex;
}());
/// <reference path="Vertex.ts" />
var Graph = /** @class */ (function () {
    function Graph(isGraph) {
        this.isGraph = isGraph;
        this.vertexList = new ArrayList();
        this.qtd = 0;
    }
    Graph.prototype.createVertex = function (vertex) {
        this.qtd += 1;
        return new Vertex(vertex);
    };
    Graph.prototype.vertexById = function (vertex) {
        var v = this.vertexList.get(0);
        var i = 0;
        while (v != null) {
            if (v.getId() == vertex) {
                return v;
            }
            i += 1;
            v = this.vertexList.get(i);
        }
        return null;
    };
    Graph.prototype.insertEdge = function (vertex1, vertex2) {
        console.log("Procurando pelos vertices: " + vertex1 + " " + vertex2);
        var vertex11 = this.vertexById(vertex1);
        var vertex22 = this.vertexById(vertex2);
        if (vertex11 == null) {
            console.log("Criando o vertice " + vertex1);
            vertex11 = this.vertexList.add(this.createVertex(vertex1));
        }
        if (vertex22 == null) {
            console.log("Criando o vertice " + vertex2);
            vertex22 = this.vertexList.add(this.createVertex(vertex2));
        }
        vertex11.setAdjacent(vertex22);
        if (this.isGraph) {
            vertex22.setAdjacent(vertex11);
        }
    };
    Graph.prototype.removeEdge = function (vertex1, vertex2) {
        var vertex11 = this.vertexById(vertex1);
        var vertex22 = this.vertexById(vertex2);
        if (vertex11 == null || vertex22 == null) {
            return;
        }
        vertex11.removeAdjacent(vertex22);
        if (this.isGraph) {
            vertex22.removeAdjacent(vertex11);
        }
    };
    Graph.prototype.print = function () {
        var i = 0;
        while (i < this.qtd) {
            var vertex = this.vertexList.get(i);
            vertex.printAdjacents();
            i += 1;
        }
    };
    return Graph;
}());
//// <reference path="TreeAVL.ts" />
//// <reference path="ArrayList.ts" />
//// <reference path="Stack.ts" />
/// <reference path="Graph.ts" />
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
/*
let stack = new Stack()
stack.push("bart")
stack.push("hommer")
stack.push("lisa")
stack.pop()
stack.push("megg")
stack.push("marge")
stack.print()
console.log(stack.getSize())
*/
var graph = new Graph(true);
graph.insertEdge(3, 4);
graph.insertEdge(4, 2);
graph.insertEdge(1, 3);
graph.insertEdge(4, 5);
graph.insertEdge(5, 2);
graph.insertEdge(1, 2);
graph.removeEdge(3, 4);
graph.print();
