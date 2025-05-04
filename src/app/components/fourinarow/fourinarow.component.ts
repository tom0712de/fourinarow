import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fourinarow',
  imports: [CommonModule],
  templateUrl: './fourinarow.component.html',
  styleUrl: './fourinarow.component.scss'
})
export class FourinarowComponent {
  boardStatus:boolean = true;
  Brett:number[][] =[];
  btnState:string
  text: string = "";
  showWinScreen: boolean = false;
   

  createBoard(array:number [][]):number[][]{ //oben links 00 unten rechts 77
    for(let i= 0;i<8;i++){
      array[i] =new Array<number>();;
      for(let j= 0;j<8;j++){
        ((array[i])).push(0);
      }  
      
    }
    return(array)
  }
  Board: number [][] = this.createBoard(this.Brett) 
  spielerID : number = 0
  player1owned:number[]= [];
  player2owned:number[]= []
  allPlayerowned:number[][] =[this.player1owned,this.player2owned]


  setNewBlock(spielerID:number,xKoord:number):void{
    for(let i:number = 0; i<8;i++){
      if (this.Board[xKoord][i] !=0){
        let yKoord :number = i -1;
        this.Board[xKoord][yKoord]= spielerID+1;
        
        this.allPlayerowned[spielerID].push(xKoord,yKoord);
        break;
      }
      if (i==7 && this.Board[xKoord][i]==0){
        let yKoord:number = i
        this.Board[xKoord][yKoord] = spielerID+1
        this.allPlayerowned[spielerID].push(xKoord,yKoord)
        break;
      }
    }
  }
  mousePos : number [] = [1,1]
  
  getmouseKoord(x: number,y: number):void{
    this.mousePos[0] = x;
    this.mousePos[1] = y;  

  }
  getHover():number [] {
    let array : number[] = [];
    
    let xKoord:number;
    let yKoord :number;
   
    
    xKoord = this.mousePos[0];
    

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
    for (let i:number = 0;i<allPlayerowned[0].length;i=i+2){ //loop durch von Spieler besetzten Felder
      let x:number= allPlayerowned[0][i];//Kordinaten von besetztem Feld
      let y:number =allPlayerowned[0][i+1];
      
      for(let ind1:number =0;ind1<3;ind1++){
        for(let ind2:number = 0;ind2<3;ind2++){
          Punkte = 0;
          if ((x+umliegende[ind1]>=0)&&(x+umliegende[ind1]<=7)&&(y+umliegende[ind2]>=0)&&(y+umliegende[ind2]<=7)){ //checkt ob zucheckendes Feld exsitiert         
            if(( Board[x+umliegende[ind1]][y+umliegende[ind2]] == 1)&&(umliegende[ind1]*10+umliegende[ind2]*5)!=0){ //checkt alle möglichen umliegenden //fix muss noch übertragen werden 
             
 
              for (let counter : number = 0; counter<2;counter++){
                
                if((x+umliegende[ind1]*(counter+2)>=0&&x+umliegende[ind1]*(counter+2)<=7)&&(y+umliegende[ind2]*(counter+2)>=0 && y+umliegende[ind2]*(counter+2)<=7 )){
                  if(Board[x+umliegende[ind1]*(counter+2)][y+umliegende[ind2]*(counter+2)]==1){ //checkt ob in derRichtung des getroffenen Feldes noch 2 weitere sind 

                 
                    Punkte++;
                       
                  }
                  else{
                    break
                 }
                 if (Punkte == 2){
                  this.text = "Blau";
                  return true;  
                }
              }
            } 
          }            
          }
        } 
      }
    }
  
  
    
     
    for (let i:number = 0;i<allPlayerowned[1].length;i=i+2){ //loop durch von Spieler besetzten Felder
      let x2:number= allPlayerowned[1][i];//Kordinaten von besetztem Feld
      let y2:number =allPlayerowned[1][i+1];
      
      for(let ind1:number =0;ind1<3;ind1++){
        for(let ind2:number = 0;ind2<3;ind2++){
          Punkte = 0;
          if ((x2+umliegende[ind1]>=0)&&(x2+umliegende[ind1]<=7)&&(y2+umliegende[ind2]>=0)&&(y2+umliegende[ind2]<=7)){
            if( (Board[x2+umliegende[ind1]][y2+umliegende[ind2]]) == 2 && (umliegende[ind1]*10+umliegende[ind2]*5)!=0){ //checkt alle möglichen umliegenden 
 
              for (let counter : number = 0; counter<2;counter++){
                if((x2+umliegende[ind1]*(counter+2)>=0&&x2+umliegende[ind1]*(counter+2)<=7)&&(y2+umliegende[ind2]*(counter+2)>=0 && y2+umliegende[ind2]*(counter+2)<=7 )){

                  if(Board[x2+umliegende[ind1]*(counter+2)][y2+umliegende[ind2]*(counter+2)]==2){ //checkt ob in derRichtung des getroffenen Feldes noch 2 weitere sind 
                    Punkte++;
   
                  }
                  else{
                    break
                  }
                }  
              }            
            }
          }
          if (Punkte == 2){
            this.text = "Rot";              
            return true;                               
          }  
        } 
      }
      

    }
    return false;
    
    
  }
  getPlayerClass(x:number,y:number):string{
    let hoverd: number[] = this.getHover(); 
    
    if(this.Board[x][y]==1){
      
      return("blue");
    }
    else if(this.Board[x][y]==2){
      return(("red"))
    }


    if(x== hoverd[0] && y ==hoverd[1] && this.spielerID == 1 ){
      return("hoverRed")
    }
    if(x== hoverd[0] && y ==hoverd[1] && this.spielerID == 0 ){
      
      return("hoverBlue");
    }
    else {
      return("grey");
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
       
       

  }
  reset ():void{
     this.Board = this.createBoard(this.Brett);
     
     this.showWinScreen = false;
  
     this.player1owned.length = 0;
     this.player2owned.length = 0;
     
  }
}





  

  


    
  
  
  
  
    
    

  
    


  

  





