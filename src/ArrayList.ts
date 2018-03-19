/// <reference path="No.ts" />
// doubly chained - duplamente encadeada
class ArrayList{

    qtd: number
    first: No
    last: No

    constructor(){
        this.qtd = 0
        this.first = null
        this.last = null
    }

    isEmpty():boolean{
        return this.qtd == 0
    }

    size():number{
        return this.qtd
    }

    private createElement(id:number, value:any):No{
        return new No(id, value)
    }

    add(value:any){
        this.qtd += 1
        let element = this.createElement(this.qtd, value)

        if(this.first == null){
            this.first = element
            this.last = element
            return
        }

        // in the list, the right is the next; the left is the prev
        let lastElement = this.last
        lastElement.setRight(element)   // setNext
        element.setLeft(lastElement)    // setPrev
        this.last = element
    }

    addIn(index:number, value:any){
        this.qtd += 1
        let element = this.createElement(this.qtd, value)

        if(index == 0){     // first position
            element.setRight(this.first)
            this.first.setLeft(element)
            this.first = element
            return
        }

        // if index is invalid or the last, insert in the last position
        if(index >= this.qtd-1){    // one element, but it pos is 0. Then this.qtd - 1
            element.setLeft(this.last)
            this.last.setRight(element)
            this.last = element
            return
        }

        let i = 1
        let no = this.first
        while(i < index){
            no = no.getRight()  // no = next
            i += 1
        }

        element.setRight(no.getRight())
        no.getRight().setLeft(element)
        no.setRight(element)
        element.setLeft(no)
    }

    contains(value:any):boolean{
        let i = 0
        let element = this.first
        while(i < this.qtd){
            if(element.getValue() == value){
                return true
            } else {
                element = element.getRight()
            }
        }

        return false
    }

    get(index:number):number{
        if(index < 0 || index > this.qtd){
            return -1
        }

        let i = 0
        let element = this.first
        while(i < index){
            element = element.getRight()
            i += 1
        }

        return element.getValue()
    }

    remove(value:any){
        let element = this.first

        while(element != null){
            if(element.getValue() == value){
                break
            }

            element = element.getRight()
        }

        if(element == null){
            return
        }

        this.qtd -= 1
        let last = element.getLeft()
        // is the first element
        if(last == null){
            this.first = element.getRight()
            return
        }
        // is the last element
        if(element == this.last){
            last.setRight(null)
            this.last = last
            return
        }
        
        let next = element.getRight()
        last.setRight(next)
        next.setLeft(last)
    }

    print(){
        let element = this.first
        while(element != null){
            console.log(element.getValue())
            element = element.getRight()
        }
    }

    indexOf(value:any){
        let i = 0
        let element = this.first
        while(element != null){
            if(element.getValue() == value){
                return i
            }

            i += 1
            element = element.getRight()
        }

        return -1
    }

    lastIndexOf(value:any){
        let i = this.qtd - 1
        let element = this.last
        while(element != null){
            if(element.getValue() == value){
                return i
            }

            i -= 1
            element = element.getLeft()
        }

        return -1
    }

}