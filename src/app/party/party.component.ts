import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-party',
  imports: [CommonModule],
  templateUrl: './party.component.html',
  styleUrl: './party.component.scss'
})
export class PartyComponent {
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
  bombeSelcted :boolean = false;

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
  getmouseKoord(x: number,y: number):void{ //is called on mouseenter
    this.mousePos[0] = x;
    this.mousePos[1] = y;  

  }
  getHover():number [] {
    if(this.bombeSelcted == true){
      return(this.mousePos)

    }
    else{
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
  }
  changeBombSelected(){
    console.log("2");
    if (this.bombeSelcted == false){
      this.bombeSelcted = true;
      console.log("bombeSelcted");
    }
    else {
      this.bombeSelcted = false;
    }
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
    if (this.bombeSelcted == true){
      console.log("1");
      this.Bomb(yKoord,xKoord)
      


    }
    else{
      this.setNewBlock(this.spielerID,xKoord);
      this.changeSpielerID();
      if((this.checkForWin(this.allPlayerowned,this.Board))==true){
        console.log(this.allPlayerowned)
        this.showWinScreen = true;
      }    
    }
       
       

  }
  reset ():void{
    this.Board = this.createBoard();
    
    this.showWinScreen = false;
 
    this.player1owned.length = 0;
    this.player2owned.length = 0;
    
 }
 goMenu(){
  this.player1owned.length = 0;
  this.player2owned.length = 0;
  this.router.navigate(["/"]);

}

Bomb(yKoord:number,xKoord:number){
  const umliegende:number [] = [-1,0,1];
  this.bombeSelcted = false;
  for(let xadd = 0;xadd<3;xadd++){
    for(let yadd = 0;yadd<3;yadd++){
      if ((xKoord+umliegende[xadd]>=0)&&(xKoord+umliegende[xadd]<=7)&&(yKoord+umliegende[yadd]>=0)&&(yKoord+umliegende[yadd]<=7)){
        this.Board[xKoord+umliegende[xadd]][yKoord+umliegende[yadd]] = 0;
        console.log(xKoord+umliegende[xadd],umliegende[yadd])
      }
    }
  }




}


tetris(){
  
  let counter:number = 0;
  
  for(let y = 0;y<8;y++){
    counter = 0;
    
    for(let x = 0;x<8;x++){
      
      if (this.Board[x][y] != 0){
        counter++;
        if (counter == 7){
         
    
          for(let x = 0;x<8;x++){
            this.Board[x][y] =0;
            
              
      
            }
          }
        

      }
    }


    }
  }
  

}





