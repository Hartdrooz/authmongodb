import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from "./session.service";


@Injectable()
export class DataService {

    constructor(private http:HttpClient,private sessionService:SessionService){

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

    getAdminData(){
        const headers = this.setHeaders();
        const url = 'http://localhost:3000/api/home/admin';
        return this.http.get(url,{headers: headers});
    }

    getGuestData(){
        const headers = this.setHeaders();
        const url = 'http://localhost:3000/api/home/guest';
        return this.http.get(url,{headers:headers});
    }

    private setHeaders(): HttpHeaders{
        
        // Get token
        const token = this.sessionService.Token;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type','application/json');
        return headers;
    }
}