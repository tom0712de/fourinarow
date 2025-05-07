import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasegameService } from '../basegame.service';

@Component({
  selector: 'app-party',
  imports: [CommonModule],
  templateUrl: './party.component.html',
  styleUrl: './party.component.scss'
})
export class PartyComponent {
  constructor(private router: Router, public baseGameService: BasegameService ) {

  }
  bombeSelcted :boolean = false;
  swapSelected:boolean = false;
  selectedBlau: { [key:string]: boolean } = {
    bomb: false,
    swap: false,
    setBlock: true,

  }
  selectedRot: { [key:string]: boolean } = {
    bomb: false,
    swap: false,
    setBlock: true,

  }
  selectedAll:any[]=[this.selectedBlau,this.selectedRot];
  

  clickHandle(x,y){
    if((this.selectedAll[this.baseGameService.spielerID])["bomb"] == true){
      this.Bomb(y,x);
      this.resetSelected();
      this.baseGameService.gravityCheck();
      
      
      return;
    }
    if((this.selectedAll[this.baseGameService.spielerID])["swap"] == true){
      this.swap(x,y)
      this.resetSelected();
      this.baseGameService.gravityCheck();
      return;
      
    }
    if((this.selectedAll[this.baseGameService.spielerID])["setBlock"]== true){
      this.baseGameService.clicked(x,y);
      this.resetSelected();
      this.baseGameService.gravityCheck();
      return;
    }
  }

  updateDropMode(){
    if((this.selectedAll[this.baseGameService.spielerID])["bomb"] == true || (this.selectedAll[this.baseGameService.spielerID])["swap"] == true){
      this.baseGameService.dropMode = false;
      
    }
    else{
      this.baseGameService.dropMode = true;
    }

  }
  resetSelected(){
    for(let index = 0; index<2;index++){
    let keys: string []
    keys =Object.keys(this.selectedAll[index])
    for(let i = 0;i<keys.length;i++){
      (this.selectedAll[index])[keys[i]] = false;
  

      
    }
    this.selectedAll[0]["setBlock"] = true;
    this.selectedAll[1]["setBlock"] = true;
  } 
  
 
  } 

  

  changeBombSelected(){
    
    if ((this.selectedAll[this.baseGameService.spielerID])["bomb"] == true){
      (this.selectedAll[this.baseGameService.spielerID])["bomb"] = false;
      (this.selectedAll[this.baseGameService.spielerID])["setBlock"] = true;
    }
    else{
      let keys: string []
      keys =Object.keys(this.selectedAll[this.baseGameService.spielerID])
      for(let i = 0;i<keys.length;i++){
        (this.selectedAll[this.baseGameService.spielerID])[keys[i]] = false;
      }
      (this.selectedAll[this.baseGameService.spielerID])["bomb"] = true;
    }
    this.updateDropMode();
    
  }
  removeBlock(x,y){
    
    for(let i= 0;i<this.baseGameService.allPlayerowned[0].length;i=i+2){
      if((this.baseGameService.allPlayerowned[0])[i] == x && ((this.baseGameService.allPlayerowned[0])[i+1] == y )){
        (this.baseGameService.allPlayerowned[0]).splice(i,2)
        
      }
    }
  }  
    

 
 
 
Bomb(yKoord:number,xKoord:number){
  console.log(this.baseGameService.allPlayerowned[1],this.baseGameService.allPlayerowned[0])
  const umliegende:number [] = [-1,0,1];
  this.bombeSelcted = false;
  for(let xadd = 0;xadd<3;xadd++){
    for(let yadd = 0;yadd<3;yadd++){
      if ((xKoord+umliegende[xadd]>=0)&&(xKoord+umliegende[xadd]<=7)&&(yKoord+umliegende[yadd]>=0)&&(yKoord+umliegende[yadd]<=7)){
        this.baseGameService.Board[xKoord+umliegende[xadd]][yKoord+umliegende[yadd]] = 0;
        this.removeBlock(xKoord+umliegende[xadd],yKoord+umliegende[yadd])
        

        
      }
    }
  }
  console.log(this.baseGameService.allPlayerowned[1],this.baseGameService.allPlayerowned[0])
  this.baseGameService.changeSpielerID();
}

changeSwapSelected(){

  if ((this.selectedAll[this.baseGameService.spielerID])["swap"] == true){
    (this.selectedAll[this.baseGameService.spielerID])["swap"] = false;
    (this.selectedAll[this.baseGameService.spielerID])["setBlock"] = true;
  }
  else{
    let keys: string []

    keys =Object.keys(this.selectedAll[this.baseGameService.spielerID])
    for(let i = 0;i<keys.length;i++){
      (this.selectedAll[this.baseGameService.spielerID])[keys[i]] = false;
    }
    (this.selectedAll[this.baseGameService.spielerID])["swap"] = true;
  } 
  this.updateDropMode(); 
}
swap(x,y){
  
  this.baseGameService.Board[x][y] = this.baseGameService.spielerID+1
  console.log(this.baseGameService.Board[x][y]);
  if(this.baseGameService.checkForWin(this.baseGameService.allPlayerowned, this.baseGameService.Board) == true){
    this.baseGameService.showWinScreen = true;
  }
  this.baseGameService.changeSpielerID();
  
}

tetris(){
  this.baseGameService.changeSpielerID() 
  let counter:number = 0;
  for(let y = 0;y<8;y++){
    counter = 0;
    for(let x = 0;x<8;x++){ 
      if (this.baseGameService.Board[x][y] != 0){
        counter++;
        if (counter == 7){
          for(let x = 0;x<8;x++){
            this.baseGameService.Board[x][y] =0;  
            }
          }
      }
    }
    }
    this.baseGameService.changeSpielerID(); 
  } 


  
}







