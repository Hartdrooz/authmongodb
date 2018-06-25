import { Injectable } from "@angular/core";

@Injectable()
export class SessionService {

    get Token():string{
        return localStorage.getItem('token');
    }

    saveSession(token:string){
        localStorage.setItem('token',token);
    }

    deleteSession(){
        localStorage.removeItem('token');
    }

}