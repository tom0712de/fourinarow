import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasegameService } from '../basegame.service';

@Component({
  selector: 'app-start',
  imports: [],
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

}
