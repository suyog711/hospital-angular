import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHospitalComponent } from './add-hospital/add-hospital.component';
import { HospitalRoutingModule } from './hospital.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListHospitalComponent } from './list-hospital/list-hospital.component';
import { UpdateHospitalComponent } from './update-hospital/update-hospital.component';
import { HospitalService } from './service/hospital.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AddHospitalComponent, ListHospitalComponent, UpdateHospitalComponent],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [HospitalService]
})
export class HospitalModule { }
