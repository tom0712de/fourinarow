
import { RouterModule, Routes } from '@angular/router';
import { FourinarowComponent } from './components/fourinarow/fourinarow.component';
import { StartComponent } from './start/start.component';
import{PartyComponent} from './party/party.component';



export const routes: Routes = [   
     {path: 'game',component: FourinarowComponent},
     
     {path:'',component: StartComponent},
     {path: 'party',component: PartyComponent},
];

    


    //{ path: 'main', component: MainComponent },  // Route to Main page];