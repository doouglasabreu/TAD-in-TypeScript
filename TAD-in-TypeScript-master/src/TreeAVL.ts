/// <reference path="No.ts" />

class TreeAVL{

    private root:No

        constructor(){
            this.root = null
        }

    // infix print
    print(){
        this.printRecursive(this.root)
    }

    private createNo(id:number, value:any):No{
        return new No(id, value)
    }

    private printRecursive(no:No){
        if(no == null){
            return
        }

        this.printRecursive(no.getLeft())
        this.printRecursive(no.getRight())
        console.log(' | ', no.getId())
    }

    insert(id, value){
        this.root = this.insertRecursive(this.root, this.createNo(id, value))
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

    getHeight():number{
        return this.getHeightRecursive(this.root)
    }

    private getHeightRecursive(no:No):number{

        if(no == null){
            return 0
        }

        let heightL = this.getHeightRecursive(no.getLeft()) + 1
        let heightR = this.getHeightRecursive(no.getRight()) + 1

        return heightL > heightR ? heightL : heightR
    }

    get(id:number):No{
        let no = this.root

        while(no != null){

            if(no.getId() > id){
                no = no.getLeft()
                continue
            } else if(no.getId() < id){
                no = no.getRight()
            } else {
                return no
            }
        }

        return null
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
            /// console.log("limpando os height a partir de " + newRoot.getId())
            this.clearHeights(newRoot)
            return newRoot
        } else if(heightL - heightR == -2){     //rotate to left
            if(this.getFactor(father.getRight()) == 1){
                father.setRight(this.rotateRR(father.getRight()))
            }

            var newRoot = this.rotateLL(father)
            /// console.log("limpando os height a partir de " + newRoot.getId())
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
        /// console.log("Rotaiconado para a esquerda em " + no.getId())

        let node = no.getRight()
        no.setRight(node.getLeft())
        node.setLeft(no)

        return node
    }

    private rotateRR(no:No):No{
        /// console.log("Rotacionando para a direita em " + no.getId())

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

        /// console.log("removendo " + id)
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