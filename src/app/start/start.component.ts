import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasegameService } from '../basegame.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start',
  imports: [CommonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  constructor(private router: Router,public baseGameService: BasegameService,) {}
  startGame(){
    this.router.navigate(["/game"]);
  }
  party(){
    this.router.navigate(["/party"]);

  }
  getRandomClass():string{
    let temp:number
    temp = Math.floor(Math.random() * (2 - 0 + 1)) + 0; ;
    if(temp == 0){
      return("rounded-full bg-white inset-shadow-sm ")
    }
    if(temp == 1){
      return("bg-gradient-to-b from-indigo-800 to-indigo-900 shadow-md inset-ring-2 ");

    }
    if(temp == 2){
      return(("bg-gradient-to-b from-amber-700 to-amber-800 shadow-md inset-ring-2"))

    }
    else{
      return"";
    }

  }
  

}
