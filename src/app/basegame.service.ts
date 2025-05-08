import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BasegameService {

  constructor(private router: Router) {} 
  spielerID : number = 0;
  player1owned:number[]= [];
  player2owned:number[]= [];
  boardStatus:boolean = true;
  Brett:number[][] =[];
  btnState:string
  text: string = "";
  showWinScreen: boolean = false;
  allPlayerowned:number[][] =[this.player1owned,this.player2owned]
  mousePos : number [] = [1,1]
  dropMode : boolean= true;



  createBoard():number[][]{ //oben links 00 unten rechts 77
    let array:number[][] = [];
    for(let i= 0;i<8;i++){
      array[i] =new Array<number>();;
      for(let j= 0;j<8;j++){
        ((array[i])).push(0);
      }  
      
    }
    return(array)
  }
  Board :number [][] =this.createBoard(); 
  gravityCheck(){
    for(let x = 0;x<8;x++){
      for(let y = 0;y<8;y++){
        if(this.Board[x][y] != 0){
          if(this.Board[x][y+1] == 0){
            
            this.Board[x][y+1] = this.Board[x][y]
            this.Board[x][y] = 0;
            this.removeBlock(x,y);
            this.gravityCheck();
  
          }
        }
      }
    }
    if((this.checkForWin(this.allPlayerowned,this.Board))==true){
      
      this.showWinScreen = true;
    } 
    
  }
   
  setNewBlock(spielerID:number,xKoord:number):void{
    
    for(let i:number = 0;i<8;i++){ 
      if (this.Board[xKoord][i] !=0){ //check for lowest claimed Block
        let yKoord :number = i -1;
        this.Board[xKoord][yKoord]= spielerID+1;
        
        this.allPlayerowned[spielerID].push(xKoord,yKoord);
        break;
      }
      if (i==7 && this.Board[xKoord][i]==0){ //wenn kein Block in row 
        let yKoord:number = i
        this.Board[xKoord][yKoord] = spielerID+1
        this.allPlayerowned[spielerID].push(xKoord,yKoord)
        break;
      }
    }
  }
  removeBlock(x,y){
    
      for(let z = 0;z<2;z++){
        
      
        for(let i= 0;i<this.allPlayerowned[0].length;i=i+2){
          if((this.allPlayerowned[0])[i] == x && ((this.allPlayerowned[0])[i+1] == y )){
            (this.allPlayerowned[0]).splice(i,2)
            console.log(x,y)
            
          }
        }
      }
      for(let z = 0;z<2;z++){
        
      
        for(let i= 0;i<this.allPlayerowned[1].length;i=i+2){
          if((this.allPlayerowned[1])[i] == x && ((this.allPlayerowned[1])[i+1] == y )){
            (this.allPlayerowned[1]).splice(i,2)
            console.log(x,y)
            
          }
        }
      }     
  } 
  getmouseKoord(x: number,y: number):void{ //is called on mouseenter
    this.mousePos[0] = x;
    this.mousePos[1] = y;  

  }
  getHover():number [] {
    


    
      let array : number[] = [];
      let xKoord:number;
      let yKoord :number;
      xKoord = this.mousePos[0];
      if (this.dropMode == false){
        return(this.mousePos)
      }
      for(let i:number = 0; i<8;i++){
        if (this.Board[xKoord][i] !=0){
          yKoord = i -1;
          break;
        }  
        if (i==7 && this.Board[xKoord][i]==0){
          yKoord= i;
          break;
        }   
      }
      array.push(xKoord,yKoord);
      return array; 
       
  }

  checkForWin(allPlayerowned: number[][],Board:number[][]) : boolean   {

    let Punkte :number = 0
    const umliegende:number [] = [-1,0,1]; //Liste mit werten für umliegende Felder
    for(let tempID:number = 0;tempID<2;tempID ++){
      for (let i:number = 0;i<allPlayerowned[0].length;i=i+2){ //loop durch von Spieler besetzten Felder
        let x:number= allPlayerowned[tempID][i];//Kordinaten von besetztem Feld
        let y:number =allPlayerowned[tempID][i+1];
        
        
        for(let ind1:number =0;ind1<3;ind1++){
          for(let ind2:number = 0;ind2<3;ind2++){
            Punkte = 0;
            if ((x+umliegende[ind1]>=0)&&(x+umliegende[ind1]<=7)&&(y+umliegende[ind2]>=0)&&(y+umliegende[ind2]<=7)){ //checkt ob zucheckendes Feld exsitiert         
              if(( Board[x+umliegende[ind1]][y+umliegende[ind2]] == tempID+1)&&(umliegende[ind1]*10+umliegende[ind2]*5)!=0){ //checkt alle möglichen umliegenden //fix muss noch übertragen werden 
              
  
                for (let counter : number = 0; counter<2;counter++){
                  
                  if((x+umliegende[ind1]*(counter+2)>=0&&x+umliegende[ind1]*(counter+2)<=7)&&(y+umliegende[ind2]*(counter+2)>=0 && y+umliegende[ind2]*(counter+2)<=7 )){
                    if(Board[x+umliegende[ind1]*(counter+2)][y+umliegende[ind2]*(counter+2)]==tempID+1){ //checkt ob in derRichtung des getroffenen Feldes noch 2 weitere sind 
                 
                  
                      Punkte++;
                        
                    }
                    else{
                      break
                  }
                  if (Punkte == 2){
                    if(tempID == 0){
                      this.text = "Blau"
                      return true; 
                    }
                    if(tempID == 1){
                      this.text = "Rot"
                      return true; 
                    }
                   
                    
                   
                  }
                }
              } 
            }            
            }
          } 
        }
      }
    
    }
    return false;
  }
  getPlayerClass(x:number,y:number): string{
    let hoverd: number[] = this.getHover(); 
    
    if(this.Board[x][y]==1){
      
      return("bg-gradient-to-b from-indigo-800 to-indigo-900 shadow-md inset-ring-2 ");
    }
    else if(this.Board[x][y]==2){
      return(("bg-gradient-to-b from-amber-700 to-amber-800 shadow-md inset-ring-2"))
    }


    if(x== hoverd[0] && y ==hoverd[1] && this.spielerID == 1 ){
      
      return("bg-amber-800 opacity-50");
    }
    if(x== hoverd[0] && y ==hoverd[1] && this.spielerID == 0 ){
      return("bg-indigo-800 opacity-50");
      
      
    }
    if((x!= hoverd[0] ||  y !=hoverd[1])&& (this.Board[x][y]==0)) {
      
      return("rounded-full bg-white inset-shadow-sm ");
     
    }
      else{
      return("")
    }


   
  }
  changeSpielerID():void{
    let temp :number = 10;
    if (this.spielerID==0){
      temp = 1;
      
    }
    if (this.spielerID==1){
      temp = 0;

    }
    this.spielerID = temp;
    

  }
  clicked(xKoord:number, yKoord:number):void{

      this.setNewBlock(this.spielerID,xKoord);
      this.changeSpielerID();
      if((this.checkForWin(this.allPlayerowned,this.Board))==true){
        
        this.showWinScreen = true;
      } 
      return;   
    }
       
       

  

reset ():void{
  this.Board = this.createBoard();
  
  this.showWinScreen = false;

  this.player1owned.length = 0;
  this.player2owned.length = 0;
  this.dropMode = true;
  
}



goMenu(){
this.reset()
 this.router.navigate(["/"]);

}

}