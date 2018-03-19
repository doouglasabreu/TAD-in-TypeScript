Para o projeto de Linguagens de Programação, não podemos usar nenhuma estrutura pronta: Lista, Pilha, Hash, Arvore e etc.
Então estou implementando estas para assim usar as que eu implementei.

==========================AVL==========================\n
tree = new TreeAVL()\n
tree.insert(id, "value is any")\n
tree.contains(id)\n
tree.getHeight()\n
tree.remove(id)\n
tree.print()\n
tree.get(id)\n

A AVL está com todas as operações de inserir e remove realizando as devidas rotações.

==========================ArrayList==========================\n
let array = new ArrayList()\n
array.add("value is any")\n
array.addIn(index, "value is any")\n
array.lastIndexOf("value is any")\n
array.contains("value is any")\n
array.indexOf("value is any")\n
array.remove("value is any")\n
array.get(index)\n
array.isEmpty()\n
array.print()\n
array.size()

Por baixo dos panos, a arvore usa 'nós' ao invez de elementos. Ela é uma duplamente encadeada. O ponteiro 'left' representa o 'prev' e o ponteiro 'right' representa o 'next'. Respectivamente as funções getters e setters.

A pasta src contem os arquivos TypeScrip e a pasta build contem os arquivos JavaScript compilados pelo TypeScript. O arquivo index.html é onde inserimos o Main.js no html para rodar no navegador.

Para compilar os arquivos: tsc ./src/ArqOrigem.ts --out ./build/ArqDestino.js
