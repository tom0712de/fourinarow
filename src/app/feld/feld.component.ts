import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FourinarowComponent } from '../components/fourinarow/fourinarow.component';

@Component({
  selector: 'app-feld',
  imports: [CommonModule],
  templateUrl: './feld.component.html',
  styleUrl: './feld.component.scss'
 
})
export class FeldComponent {
  selcted: boolean = false;

 
  
  
  
  whennClicked():void{
    console.log("test")
    this.selcted = true;
    
   
    
    
    
  }


    
  
  
  



}
