class No{

    private id: number
    private value: any
    private height: number
    private left: No
    private right: No

        constructor(id:number, value:any){
            this.id = id
            this.value = value
            this.height = 0
            this.left = this.right = null
        }

    // getters and setters methods
    getId():number{
        return this.id
    }

    setId(id:number){
        this.id = id
    }

    getValue():any{
        return this.value
    }

    setValue(value:any){
        this.value = value
    }

    getHeight():number{
        return this.height
    }

    setHeight(height:number){
        this.height = height
    }

    getRight():No{
        return this.right
    }

    setRight(right:No){
        this.right = right
    }

    getLeft():No{
        return this.left
    }

    setLeft(left:No){
        this.left = left
    }
}

class TreeAVL{

    private root:No

        constructor(){
            this.root = null
        }

    // infix print
    print(){
        this.printRecursive(this.root)
    }

    private printRecursive(no:No){
        if(no == null){
            return
        }

        this.printRecursive(no.getLeft())
        this.printRecursive(no.getRight())
        console.log(' | ', no.getId())
    }

    insert(no:No){
        this.root = this.insertRecursive(this.root, no)
    }

    private insertRecursive(father, no):No{
        if(father == null){
            return no
        }

        console.log("Inserindo o no " + no.getId())
        if(no.getId() <= father.getId()){
            father.setLeft( this.insertRecursive(father.getLeft(), no) )
        } else {
            father.setRight( this.insertRecursive(father.getRight(), no) )
        }

        return this.rotates(father)
    }

    private rotates(father){

        let heightL = father.getLeft() == null ? 0 : father.getLeft().getHeight() + 1
        let heightR = father.getRight() == null ? 0 : father.getRight().getHeight() + 1
        father.setHeight(heightL > heightR ? heightL : heightR)

        // rotate to right
        if(heightL - heightR == 2){
            if(this.getFactor(father.getLeft()) == -1){
                father.setLeft(this.rotateLL(father.getLeft()))
            }

            var newRoot =  this.rotateRR(father)
            console.log("limpando os height a partir de " + newRoot.getId())
            this.clearHeights(newRoot)
            return newRoot
        } else if(heightL - heightR == -2){     //rotate to left
            if(this.getFactor(father.getRight()) == 1){
                father.setRight(this.rotateRR(father.getRight()))
            }

            var newRoot = this.rotateLL(father)
            console.log("limpando os height a partir de " + newRoot.getId())
            this.clearHeights(newRoot)
            return newRoot
        }

        return father
    }

    private getFactor(node:No){
        let heightL = node.getLeft() == null ? 0 : node.getLeft().getHeight() + 1
        let heightR = node.getRight() == null ? 0 : node.getRight().getHeight() + 1

        return heightL - heightR
    }

    private rotateLL(no:No):No{
        console.log("Rotaiconado para a esquerda em " + no.getId())
        let node = no.getRight()
        no.setRight(node.getLeft())
        node.setLeft(no)

        return node
    }

    private rotateRR(no:No):No{
        console.log("Rotacionando para a direita em " + no.getId())
        let node = no.getLeft()
        no.setLeft(node.getRight())
        node.setRight(no)

        return node
    }

    private clearHeights(father:No){
        if(father == null){
            return 0
        }

        let heightL = this.clearHeights(father.getLeft())
        let heightR = this.clearHeights(father.getRight())

        father.setHeight(heightL > heightR ? heightL : heightR)
        return father.getHeight() + 1
    }

    //return false if id not exists in the AVL or true if exists
    contains(id:number):any{

        let no = this.root

        while(no != null){

            if(no.getId() > id){
                no = no.getLeft()
                continue
            } else if(no.getId() < id){
                no = no.getRight()
            } else {
                return true
            }
        }

        return false
    }

    remove(id:number):boolean{

        if(!this.contains(id)){
            return false
        }

        console.log("removendo " + id)
        this.root = this.removeRecursive(this.root, id)
    }

    private removeRecursive(father:No, id:number):No{

        if(father == null){
            return null
        }

        if(father.getId() > id){
            father.setLeft( this.removeRecursive(father.getLeft(), id) )
            return this.rotates(father)
        } else if(father.getId() < id){
            father.setRight( this.removeRecursive(father.getRight(), id) )
            return this.rotates(father)
        }

        // have none no. getLeft and getRight is null
        if(father.getLeft() == father.getRight()){
            return null
        }

        // have only one no
        if( (father.getLeft() == null && father.getRight() != null) || (father.getLeft() != null && father.getRight() == null) ){
            return father.getLeft() == null ? father.getRight() : father.getLeft()
        }

        // have two no
        let newNode = this.getNextToRemove(father)
        father.setId(newNode.getId())
        father.setValue(newNode.getValue())

        // remove again
        father.setLeft(this.removeRecursive(father.getLeft(), newNode.getId()))
        return father
    }

    private getNextToRemove(no:No){

        let node = no.getLeft()
        while(node.getRight() != null){
            node = node.getRight()
        }

        return node
    }

}

let tree = new TreeAVL()
/*
tree.insert(new No(4, "Teste"))
tree.insert(new No(9, "Teste"))
tree.insert(new No(1, "Teste"))
tree.insert(new No(3, "Teste")) 
tree.insert(new No(2, "Teste"))
tree.insert(new No(2.5, "Teste"))
/*
tree.insert(new No(3.6, "Teste"))
tree.insert(new No(1.5, "Teste"))
tree.insert(new No(1, "Teste"))
tree.insert(new No(4, "Teste"))
tree.insert(new No(3, "Teste"))
tree.insert(new No(6, "Teste"))
tree.insert(new No(5, "Teste"))
tree.insert(new No(7, "Teste"))
tree.insert(new No(5.5, "teste"))
*//*
tree.remove(2)
tree.insert(new No(10, "Teste"))
tree.remove(1)
tree.remove(10)
tree.remove(2.5)
*/
tree.insert(new No(7, "Teste"))
tree.insert(new No(4, "Teste"))
tree.insert(new No(9, "Teste"))
tree.insert(new No(2, "Teste"))
tree.insert(new No(5, "Teste"))
tree.insert(new No(8, "Teste"))
tree.insert(new No(10, "Teste"))

tree.remove(4)

tree.print()