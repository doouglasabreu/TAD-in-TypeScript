class No{

    private id: number
    private value: any
    private left: No
    private right: No

        constructor(id:number, value:any){
            this.id = id
            this.value = value
            this.left = this.right = null
        }

    // getters and setters methods
    getId():number{
        return this.id
    }

    getValue():any{
        return this.value
    }

    setValue(value:any){
        this.value = value
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
        if(this.root == null){
            this.root = no
            return
        }

        let node = this.root
        let prev = null

        while(node != null){
            prev = node

            if(no.getId() <= node.getId()){
                node = node.getLeft()
            } else {
                node = node.getRight()
            }
        }

        if(no.getId() <= prev.getId()){
            prev.setLeft(no)
        } else {
            prev.setRight(no)
        }
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

        // searching the node father
        let father = this.root
        let no
        while(true){

            // is the father?
            if((father.getLeft() != null && father.getLeft().getId() == id) || (father.getRight() != null && father.getRight().getId() == id)){
                no = (father.getLeft() != null && father.getLeft().getId() == id) ? father.getLeft() : father.getRight()
                break
            }

            // no is the father. Then continue
            if(father.getId() >= id){
                father = father.getLeft()
            } else {
                father = father.getRight()
            }
        }

        this.removeNodes(father, no)
    }

    private removeNodes(father:No, no:No){

        // if the no not have two children
        if(no.getLeft() == null || no.getRight() == null){

            // get the only node in no or null
            let noAux = no.getLeft() == null ? no.getRight() : no.getLeft()

            // set the only node in no or null. Does not matter
            if(father.getLeft() == no){
                father.setLeft(noAux)
                return
            } else {
                father.setRight(noAux)
                return
            }
        }

    }
}

let tree = new TreeAVL()
tree.insert(new No(4, "Teste"))
tree.insert(new No(2, "Teste"))
tree.insert(new No(1, "Teste"))
tree.insert(new No(3, "Teste"))
tree.insert(new No(6, "Teste"))
tree.insert(new No(5, "Teste"))
tree.insert(new No(7, "Teste"))
tree.insert(new No(5.5, "teste"))
tree.insert(new No(0, "Teste"))
tree.remove(1)
tree.print()