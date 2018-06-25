import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

    constructor(private http:HttpClient){

    }

    register(email,password,role): Observable<any>{
        const url = 'http://localhost:3000/api/account';
        return this.http.post(url,{
            email: email,
            password: password,
            role: role
        });
    }

    login(email:string,password:string){
        const url = 'http://localhost:3000/api/account/login';
        return this.http.post(url,{
            email: email,
            password: password
        });
    }
}