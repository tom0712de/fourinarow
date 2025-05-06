import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  constructor(private router: Router) {}
  startGame(){
    this.router.navigate(["/game"]);
  }
  party(){
    this.router.navigate(["/party"]);

  }

}
