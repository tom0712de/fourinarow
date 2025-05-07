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
  powerUpsBlue: string[] = ["bomb","swap","tetris"];
  powerUpsRed: string[] = ["swap","tetris",];
  powerUpsAll: string[][] = [this.powerUpsBlue,this.powerUpsRed]
  disableArray : boolean []= [true,true,true,true,true,true]

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
  checkPowerUps(name: string, ID : number,activate: boolean){
    console.log("iscalled")
    
    
      for(let x=0;x<this.powerUpsAll[ID].length;x++){
        if((this.powerUpsAll[ID])[x] == name){
          
          console.log(name,"=",(this.powerUpsAll[ID])[x],activate)
          if(activate == true){
            console.log("Power")
            console.log(this.powerUpsAll[0]);
            
            (this.powerUpsAll[ID]).splice(x,1);
            console.log(this.powerUpsAll[0]);
            
            
            
            
           
          }
          return true;
        }
    
      }
      
      return false;
     
        
        
  }
  disableButton(){
    this.disableArray[0] = (this.baseGameService.spielerID == 1|| !this.checkPowerUps("tetris",0,false))
    this.disableArray[1] = (this.baseGameService.spielerID == 1|| !this.checkPowerUps("bomb",0,false))
    this.disableArray[2] = (this.baseGameService.spielerID == 1 || !this.checkPowerUps("swap",0,false))
    this.disableArray[3] = (this.baseGameService.spielerID == 0 || !this.checkPowerUps("tetris",1,false))
    this.disableArray[4] = (this.baseGameService.spielerID == 0|| !this.checkPowerUps("bomb",1,false))
    this.disableArray[5] = (this.baseGameService.spielerID == 0 || !this.checkPowerUps("swap",1,false))
    console.log(this.checkPowerUps("swap",1,false),"returnb")
    console.log("swap",1,false)
    console.log(this.disableArray[4]);

    

  }
      
   

  
  

  clickHandle(x,y){
    
    if((this.selectedAll[this.baseGameService.spielerID])["bomb"] == true){
      
      this.Bomb(y,x);
      this.resetSelected();
      this.baseGameService.gravityCheck();
      console.log(this.baseGameService.spielerID)
      this.disableButton()
      
      
      return;
    }
    if((this.selectedAll[this.baseGameService.spielerID])["swap"] == true){
    
      this.swap(x,y)
      this.resetSelected();
      this.baseGameService.gravityCheck();
      this.disableButton()
      return;
      
    }
    if((this.selectedAll[this.baseGameService.spielerID])["setBlock"]== true){
      
      this.baseGameService.clicked(x,y);
      this.resetSelected();
      this.baseGameService.gravityCheck();
      this.disableButton()
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
    this.updateDropMode();
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

    

 
 
 
Bomb(yKoord:number,xKoord:number){
  console.log(this.baseGameService.allPlayerowned[1],this.baseGameService.allPlayerowned[0])
  const umliegende:number [] = [-1,0,1];
  this.bombeSelcted = false;
  for(let xadd = 0;xadd<3;xadd++){
    for(let yadd = 0;yadd<3;yadd++){
      if ((xKoord+umliegende[xadd]>=0)&&(xKoord+umliegende[xadd]<=7)&&(yKoord+umliegende[yadd]>=0)&&(yKoord+umliegende[yadd]<=7)){
        this.baseGameService.Board[xKoord+umliegende[xadd]][yKoord+umliegende[yadd]] = 0;
        this.baseGameService.removeBlock(xKoord+umliegende[xadd],yKoord+umliegende[yadd])

        

        
      }
    }
  }
  
  this.baseGameService.changeSpielerID();
  this.checkPowerUps("bomb",this.baseGameService.spielerID,true);
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
  this.checkPowerUps("swap",this.baseGameService.spielerID,true)
  
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
            this.baseGameService.removeBlock(x,y); 
            }
          }
      }
    }
    }
    this.baseGameService.changeSpielerID(); 
    this.checkPowerUps("tetris",this.baseGameService.spielerID,true,);
  } 



  
}







