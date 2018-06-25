import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
	{ path: 'register', component: RegisterComponent },
	{ path: 'main', component: MainComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
];
