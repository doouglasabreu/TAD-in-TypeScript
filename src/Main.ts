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

let graph = new Graph(true)
graph.insertEdge(3, 4)
graph.insertEdge(4, 2)
graph.insertEdge(1, 3)
graph.insertEdge(4, 5)
graph.insertEdge(5, 2)
graph.insertEdge(1, 2)

graph.removeEdge(3, 4)
graph.print()