import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { ListHospitalComponent } from './list-hospital/list-hospital.component';
import { UpdateHospitalComponent } from './update-hospital/update-hospital.component';

const hospitalRouting: Routes =[
    {
        path:'add',
        component: AddHospitalComponent
    },
    {
        path:'list',
        component: ListHospitalComponent
    },
    {
        path:'update/:id',
        component: UpdateHospitalComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(hospitalRouting)
    ],
    exports:[
        RouterModule
    ]
})
export class HospitalRoutingModule{}