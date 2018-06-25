import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DataService } from "../service/data.service";
import { SessionService } from "../service/session.service";

@Component({
    templateUrl: './login.component.html',
    styles: [
        `
        #containerLogin {
            border: 1px solid;
            padding: 10px;
            box-shadow: 5px 10px #888888;
        }        
        
        `
    ]
})
export class LoginComponent implements OnInit {

    constructor(private dataService:DataService,
                private sessionService:SessionService,
                private router:Router){}

    ngOnInit(): void {
        this.sessionService.deleteSession();
    }

    onSubmit(f:NgForm){
        this.dataService
            .login(f.value.email,f.value.password)
            .subscribe((result:any) => {
                this.sessionService.saveSession(result.token);
                this.router.navigate(['/main']);
            });
                       
    }
}