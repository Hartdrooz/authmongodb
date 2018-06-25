import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './route';
import { DataService } from './service/data.service';
import { ToastrService } from './service/toastr.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
