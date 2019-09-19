import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const authRouting: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(authRouting),
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}