import { Component, OnInit ,AfterViewInit, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasegameService } from '../basegame.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { APImasterService } from '../apimaster.service';
import { Gamestate } from '../gamestate';
import { GlobalVarService } from '../global-var.service';
import { Console, error } from 'node:console';
import { ChangeDetectorRef,NgZone } from '@angular/core';
import { interval } from 'rxjs';
import { Subscription,  Observable } from 'rxjs';

@Component({
  selector: 'app-online',
  imports: [CommonModule],
  templateUrl: './online.component.html',
  styleUrl: './online.component.scss'
})
export class OnlineComponent implements AfterViewInit{
  isDisabled:boolean = true;
  
  constructor(private router: Router,public baseGameService: BasegameService,private http: HttpClient ,private ngZone: NgZone,public cdr: ChangeDetectorRef, public apimasterService: APImasterService,public globalVarService: GlobalVarService){
  

  
  }
  isDead:boolean = false;
  poll: Subscription;
  source: Observable<number>;
  currentState: Gamestate;
  showWinScreen:boolean = false;
  allPlayerOwned:number[][];

  ngOnDestroy(){
    this.baseGameService.reset()
    this.isDead = true;
    if(this.poll ==undefined){

    }
    else{
      this.poll.unsubscribe();

    }
    
    
    
  }
  newGame(){
    this.router.navigate(["/online-login"])
  }
  ngAfterViewInit(){
   this.isDead = false;
    this.ngZone.runOutsideAngular(() => {
      this.poll = interval(1000).subscribe(() => {
        if (!this.isDead) {
          this.ngZone.run(() => {
            console.log("Polling working in prod!");
            // this.sync();  // Real logic here
          });
        }
      });
    });
  
    
    
    

    
    this.currentState= null;
    this.baseGameService.setWichTurn(this.globalVarService.getWichTurn())
    if(this.globalVarService.getHostBoard() instanceof Gamestate){
      this.baseGameService.setBoard(this.globalVarService.getHostBoard().getBoard());
      
    }
      
    if(this.globalVarService.getIsHost()==true){
      this.isDisabled = true;
   
    }
    else{
      this.isDisabled = true;
      this.sync();
      
   

    }
   

    

  }
  
  

  
createAllPlayerOwned(Board:number[][]){
    
    
    let arr1:number[] = [];
    let arr2:number[] = [];
    
    let temp:number[][]= [arr1,arr2];
    
    temp
    for (let i:number=0 ; i<8;i++){
      for(let j:number=0 ; j<8;j++){
        if(Board[i][j] !=0){
          
          temp[Board[i][j]-1].push(i,j);
          

        }
        
      }
      
    }
    return temp 
  }

  url ="http://localhost:8080/test";



  init(){
    this.apimasterService.getInit()
  }
  update(){
   this.apimasterService.updateBoard(this.currentState,1)
  }

  checkIfTurn():boolean{
    return this.globalVarService.getIsHost();

  }
  getTextClass(){
    if(this.globalVarService.getPlayer()=="blau"){
      return "text-indigo-800"
    }
    else{
      return "text-amber-700 "
    }
  }
  sync(){
   
    this.apimasterService.getRequestGame(this.globalVarService.getID()).subscribe(
      response=>
      {this.currentState= null;
        this.currentState = response;
        this.baseGameService.setBoard(this.currentState.getBoard())
       
        if (this.baseGameService.checkForWin(this.createAllPlayerOwned(this.baseGameService.getBoard()),this.baseGameService.getBoard())){

          this.showWinScreen = true;
          
          
        }
        
    
        this.baseGameService.setWichTurn(this.currentState.getWichTurn())
   
        
       
        
        if(this.baseGameService.getWichTurn() == this.globalVarService.getPlayer()){
          
          this.isDisabled = false;
        
          
          
        }
        else{
          this.isDisabled =true;
     
        }
        
       
      
      
      
      },
      
    )
    
     
  }
  onClick(pX:number,pY:number,){
    this.baseGameService.clicked(pX,pY);
    let temp1:Gamestate = new Gamestate(this.baseGameService.getBoard(),this.baseGameService.getWichTurn(),this.globalVarService.getID());
    
    
    this.apimasterService.updateBoard(temp1,this.globalVarService.getID());
    
    if (this.baseGameService.checkForWin(this.createAllPlayerOwned(this.baseGameService.getBoard()),this.baseGameService.getBoard())){
          this.showWinScreen = true;
          this.isDisabled = true;
          
          
      }
    this.isDisabled = true;

    
    
  }


  
  

  

}
