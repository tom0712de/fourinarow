
import { RouterModule, Routes } from '@angular/router';
import { FourinarowComponent } from './components/fourinarow/fourinarow.component';
import { StartComponent } from './start/start.component';
import{PartyComponent} from './party/party.component';
import { OnlineComponent } from './online/online.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { OnlineLoginComponent } from './online-login/online-login.component';




export const routes: Routes = [   
     {path: 'game',component: FourinarowComponent},
     
     {path:'',component: StartComponent},
     {path: 'party',component: PartyComponent},
     {path: 'online',component: OnlineComponent},
     {path:'online-login',component: OnlineLoginComponent}
];

    


    //{ path: 'main', component: MainComponent },  // Route to Main page];