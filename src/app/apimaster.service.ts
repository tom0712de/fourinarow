import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import {Observable, range} from 'rxjs';
import {map, filter} from 'rxjs/operators';
import { Gamestate } from './gamestate';
import { error, time } from 'node:console';
import { response } from 'express';
import { GlobalVarService } from './global-var.service';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APImasterService {

  constructor(private http: HttpClient,private globalVarService: GlobalVarService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  id = "1";
  url ="http://localhost:8080"
  data:Gamestate;
  getInit():Observable<any>{
    if(this.globalVarService.getUrl()!=undefined){
      return this.http.get(this.globalVarService.getUrl()+"/init/").pipe(timeout(1),
        map(response =>{const JsonObj =response;
          return new Gamestate(JsonObj["board"],JsonObj["wichTurn"],JsonObj["id"])
        })
        
        
      );
    }
    else{
      return null

    } 
  }
  getRequestGame(id:number):Observable<any>{
   
    if(id == undefined || this.globalVarService.getUrl() == undefined){
      
      return null
    }
    else{
      let temp : string = (this.globalVarService.getUrl()+"/requestGame"+id)
      return this.http.get(temp).pipe(timeout(1),
        map(response=>{var JsonObj = response;
          
          
          return new Gamestate(JsonObj["board"],JsonObj["wichTurn"],JsonObj["id"])
          
        }))
    }    
   
   
    
    
    
      

  }
  updateBoard(Board: Gamestate,id:number):any{
    
    
    this.http.put(this.globalVarService.getUrl()+"/updateBoard"+id,Board).subscribe( //JSON.parse(JSON.stringify(Board))
      response=>{}
    );

  }

}
