import { Component } from "@angular/core";
import {NgForm} from '@angular/forms'
import { DataService } from "../service/data.service";
import { ToastrService } from "../service/toastr.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './register.component.html',
    styles: [ ` 
        #containerRegister {
            border: 1px solid;
            padding: 10px;
            box-shadow: 5px 10px #888888;
        }  
    
    `]
})
export class RegisterComponent {

    selectedValue: string;
    roles: [ 'Guest', 'Admin' ];


    constructor(private dataService:DataService, 
                private toastrService:ToastrService,
                private router:Router){}

    onSubmit(f: NgForm){
        this.dataService
            .register(f.value.email,f.value.password,f.value.role)
            .subscribe(() => {
                this.toastrService.success('User registered sucessfully');
                this.router.navigate(['/login']);
            });
                        
    }
}