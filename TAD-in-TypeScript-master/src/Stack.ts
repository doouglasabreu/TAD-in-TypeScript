/// <reference path="No.ts" />

class Stack{

    private top: No
    private size: number

    constructor(){
        this.top = null
        this.size = 0
    }

    private createElement(value:any){
        return new No(-1, value)
    }

    empty():boolean{
        return this.top == null
    }

    // looks the top object without remove
    peek():any{
        return this.empty() ? null : this.top.getValue()
    }

    // insert
    push(value:any){
        let element = this.createElement(value)
        element.setLeft(this.top)
        this.top = element
        this.size += 1
    }

    // remove
    pop():No{
        if(this.empty()){
            return null
        }

        let element = this.top
        this.top = element.getLeft()    // top = down
        this.size -= 1
        return element.getValue()
    }

    // return index of value or -1 if not exists
    search(value:any):number{
        let pos = this.size
        let element = this.top
        while(element != null){
            if(element.getValue() == value){
                return pos
            }

            pos -= 1
            element = element.getLeft()
        }

        return -1
    }

    getSize():number{
        return this.size
    }

    print(){
        let element = this.top
        while(element != null){
            console.log(element.getValue())
            element = element.getLeft()
        }
    }
}