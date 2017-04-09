import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
import {Observable} from "rxjs";
import {IHeroResponse,IHero} from './ihero';
/*
  Generated class for the Hero provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HeroProvider {

  url:string = "http://localhost:3000/hero/";

  constructor(public http: Http) {
    console.log('Hello Hero Provider');
  }

  createHero(data:IHero):Observable<IHeroResponse>{
    
    return this.http.post(this.url,data)
            .map(res=>{
            return res.json();
        }).catch(this.throwServiceError);;
  }

  getHeroes():Observable<IHeroResponse>{
    return this.http.get(this.url)
            .map(res=>{
            return res.json();
        }).catch(this.throwServiceError);;
  }

  throwServiceError(error:any):any{
    let errorMessage = error && error.statusText || error.json() ||  'Server error';
    console.log("errorMessage : " + errorMessage);
    return Observable.throw( errorMessage );
  }

}
