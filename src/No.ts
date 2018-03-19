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