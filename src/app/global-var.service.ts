import { Injectable } from '@angular/core';
import { Gamestate } from './gamestate';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {

  constructor() { }
  public static id: number = 0;
  public static player :string;
  public static hostBoard:Gamestate
  public static isHost:boolean;
  public static WichTurn:string;
  public static url:string = "http://localhost:8080";
  setWichTurn(pWichTurn:string){
    GlobalVarService.WichTurn = pWichTurn;
  }
  setUrl(pUrl:string){
    GlobalVarService.url = pUrl;

  }
  getUrl(){
    return GlobalVarService.url;
  }
  getWichTurn(){
    return GlobalVarService.WichTurn;
  }
  setID(pID:number){
    GlobalVarService.id = pID;
  }
  getID(){
    
    return GlobalVarService.id;
   
  }
  getPlayer(){
    return GlobalVarService.player;
  }
  setPlayer(pPlayer:string){
    GlobalVarService.player =pPlayer
  }
  setHostBoard(pHostBoard:Gamestate){
    GlobalVarService.hostBoard=pHostBoard;
  }
  getHostBoard():Gamestate{
    return GlobalVarService.hostBoard
  }
  setIsHost(pIsHost:boolean){
    GlobalVarService.isHost = pIsHost;

  }
  getIsHost(){
    return GlobalVarService.isHost;
  }

  
}
