export class Gamestate {
    private id: number;
    private wichTurn: string;
    private board: number[][]=[];

    
    
    constructor (pBoard:number [][],pWichTurn:string,pID:number){
        this.board = pBoard;
        this.wichTurn = pWichTurn;
        this.id = pID;
       

    }
    getID(){
        return this.id;
    }
    getBoard(){
        return this.board;
    }
    setBoard(pBoard:number[][]){
        this.board = pBoard;

    }
    getWichTurn(){
        return this.wichTurn
    }
    setWichTurn(pWichTurn:string){
        this.wichTurn = pWichTurn;

    }
}
