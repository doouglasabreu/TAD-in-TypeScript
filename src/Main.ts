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