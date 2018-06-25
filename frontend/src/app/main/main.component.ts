import { Component } from "@angular/core";
import { DataService } from "../service/data.service";
import { Router } from "@angular/router";
import { SessionService } from "../service/session.service";
import { ToastrService } from "../service/toastr.service";

@Component({
    templateUrl: './main.component.html'
})
export class MainComponent {
    message: string = 'no data selected';

    constructor(private dataService:DataService,
                private sessionService:SessionService,
                private toastrService: ToastrService,
                private router:Router){

    }

    onAdmin(){
        this.dataService
            .getAdminData()
            .subscribe((data:any) => {
                this.message = data.message;
            },(error) => {
                if (error.status == 401){
                    this.toastrService.error('No access');
                    this.message = "You don't have access to the admin data";
                }
            });
            
    }

    onGuest(){
        this.dataService
            .getGuestData()
            .subscribe((data:any) => {
                this.message = data.message;
            },(error) => {
                if (error.status == 401){
                    this.toastrService.error('No access');
                    this.message = "You don't have access to the guest data";
                }
            });
    }

    logout(){
        this.sessionService.deleteSession();
        this.router.navigate(['/login']);
    }


}