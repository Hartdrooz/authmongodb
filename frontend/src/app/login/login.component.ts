import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DataService } from "../service/data.service";

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
export class LoginComponent {

    constructor(private dataService:DataService,private router:Router){}

    onSubmit(f:NgForm){
        this.dataService
            .login(f.value.email,f.value.password)
            .subscribe((result) => {
                console.log(result);
            });
                       
    }
}