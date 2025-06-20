import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalVarService } from '../global-var.service';
import { APImasterService } from '../apimaster.service';
import { Gamestate } from '../gamestate';


@Component({
  selector: 'app-online-login',
  imports: [ FormsModule,CommonModule,],
  templateUrl: './online-login.component.html',
  styleUrl: './online-login.component.scss'
})
export class OnlineLoginComponent {
  constructor(private router: Router,private globalVarService: GlobalVarService,private apimasterservice:APImasterService) {}
  id: number;
  url:string;
  confirmBtn(){
    this.globalVarService.setID(this.id)
    
    this.globalVarService.setPlayer("rot")
    this.globalVarService.setIsHost(false);
    this.globalVarService.setUrl(this.url);
    
    this.apimasterservice.getRequestGame(this.id).subscribe(
      response=>{
        this.globalVarService.setHostBoard(response)
        this.globalVarService.setWichTurn(response.getWichTurn())
        this.router.navigate(["/online"]);
       


      }
    )
    
  }
  hostBtn(){
    this.globalVarService.setPlayer("blau");
    this.globalVarService.setIsHost(true);
    this.globalVarService.setUrl(this.url);
    
    this.apimasterservice.getInit().subscribe(
      response=>{
        this.globalVarService.setHostBoard(response.getBoard());
        this.globalVarService.setID(response.getID());
        this.globalVarService.setWichTurn(response.getWichTurn())
        this.router.navigate(["/online"]);
      }
    )

    
  
    
    


  }

}
