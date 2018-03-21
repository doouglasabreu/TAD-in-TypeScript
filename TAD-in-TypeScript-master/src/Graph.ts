/// <reference path="Vertex.ts" />

class Graph{

    private vertexList: ArrayList
    private isGraph: boolean    //true, is graph; false is digraph
    private qtd: number

    constructor(isGraph:boolean){
        this.isGraph = isGraph
        this.vertexList = new ArrayList()
        this.qtd = 0
    }

    private createVertex(vertex:any){
        this.qtd += 1
        return new Vertex(vertex)
    }

    private vertexById(vertex):Vertex{
        let v = this.vertexList.get(0)
        let i = 0
        while(v != null){
            if(v.getId() == vertex){     // list.getVertex.getId
                return v
            }

            i += 1
            v = this.vertexList.get(i)
        }

        return null
    }

    insertEdge(vertex1:any, vertex2:any){
        //console.log("Procurando pelos vertices: " + vertex1 + " " + vertex2)
        let vertex11 = this.vertexById(vertex1)
        let vertex22 = this.vertexById(vertex2)

        if(vertex11 == null){
            //console.log("Criando o vertice " + vertex1)
            vertex11 = this.vertexList.add(this.createVertex(vertex1))
        }

        if(vertex22 == null){
            //console.log("Criando o vertice " + vertex2)
            vertex22 = this.vertexList.add(this.createVertex(vertex2))
        }

        vertex11.setAdjacent(vertex22)
        if(this.isGraph){   // if is digraph, this operation is not nedded
            vertex22.setAdjacent(vertex11)
        }
    }

    removeEdge(vertex1, vertex2){
        let vertex11 = this.vertexById(vertex1)
        let vertex22 = this.vertexById(vertex2)

        if(vertex11 == null || vertex22 == null){
            return
        }

        vertex11.removeAdjacent(vertex22)
        if(this.isGraph){
            vertex22.removeAdjacent(vertex11)
        }
    }

    print(){

        let i = 0
        while(i < this.qtd){
            let vertex = this.vertexList.get(i)
            vertex.printAdjacents()

            i += 1
        }
    }

}