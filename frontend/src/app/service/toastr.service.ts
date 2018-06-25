import { Injectable } from "@angular/core";
import * as toastr from 'toastr';

@Injectable()
export class ToastrService {

    success(message:string){
        toastr.success(message);
    }

    error(message:string){
        toastr.error(message);
    }
}