/// <reference path="ArrayList.ts" />

enum Color {White, Black, Gray}

class Vertex{

    private id: any
    private adjacents: ArrayList
    private color: Color

    constructor(id:any){
        this.id = id
        this.adjacents = new ArrayList()
    }

    getId():any{
        return this.id
    }

    setId(id:any){
        this.id = id
    }

    getCor():Color{
        return this.color
    }

    setcor(cor:Color){
        return this.color
    }

    isAdjacent(adjacent:Vertex): boolean{
        return this.adjacents.contains(adjacent)
    }

    setAdjacent(adjacent:Vertex){
        if(this.isAdjacent(adjacent)){
            return
        }

        this.adjacents.add(adjacent)
    }

    removeAdjacent(adjacent:Vertex){
        this.adjacents.remove(adjacent)
    }

    printAdjacents(){
        let i = 0
        console.log(this.id + "::")
        while(i < this.adjacents.size()){
            console.log(this.adjacents.get(i).getId())
            i += 1
        }
    }

}