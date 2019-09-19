import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Hospital } from 'src/app/shared/models/hospital.model';
import { MsgService } from 'src/app/shared/services/msg.service';
import { HospitalService } from '../service/hospital.service';
import { Department } from 'src/app/shared/models/department.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';



@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {
  hospital;
  cities = [];
  phone2: string = '';
  phone1: string = '';
  emergencyNumber: string = '';
  addDepartmentNow: boolean = false;


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  // fruitCtrl = new FormControl();
  // filteredFruits: Observable<string[]>;
  // fruits: string[] = [];
  // allFruits: string[] = ['Lemon', 'Apple', 'Lime', 'Orange', 'Strawberry'];

  deptCtrl = new FormControl();
  allDepartments: Array<Department>;
  selectedDepartments: Array<Department> = [];
  filteredDepartments: Observable<Department[]>;
  @ViewChild('deptInput') deptInput: ElementRef<HTMLInputElement>;



  // @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;



  constructor(
    public msgService: MsgService,
    public hospitalService: HospitalService
  ) {
    this.hospital = new Hospital({});
    this.hospitalService.getCity().subscribe(
      (data: any) => {
        this.cities = data.city;
      }
    )
    this.hospitalService.getDepartment().subscribe(
      (data: Array<Department>) => {
        this.allDepartments = data;
        this.filteredDepartments = this.deptCtrl.valueChanges.pipe(
          startWith(null),
          map((dept: Department | null) => dept ? this._filterDept(dept) : this.allDepartments.slice()));
      }
    )
  }

  ngOnInit() {
  }

  selectedDept(event: MatAutocompleteSelectedEvent): void {
    // console.log('event in selectedDept', event);
    let dept = event.option.value
    this.selectedDepartments.push(dept);
    const index = this.allDepartments.indexOf(dept);
    this.allDepartments.splice(index, 1);
    console.log(index, this.allDepartments);
    this.deptInput.nativeElement.value = '';
    this.deptCtrl.setValue(null);
  }

  addDept(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    // console.log('inside addDept>>', event)
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our fruit
      if ((value || '').trim()) {
        let newDept = { id: null, name: value.charAt(0).toUpperCase() + value.slice(1) }
        this.selectedDepartments.forEach((dept) => {
          // if dept already added dont let user add incomplete
          if (dept.name != newDept.name) {
            if (this.selectedDepartments.indexOf(newDept) < 0) {
              this.selectedDepartments.push(newDept);
            }
          }
        })
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.deptCtrl.setValue(null);
    }
  }

  removeDept(dept: any): void {
    const index = this.selectedDepartments.indexOf(dept);
    if (index >= 0) {
      this.allDepartments.push(this.selectedDepartments.splice(index, 1)[0]);
    }
  }

  private _filterDept(value: any): Department[] {
    // console.log('_filterDept');
    // console.log('value in filter dept', value);
    if (typeof (value) == "string") {
      value = {
        id: null,
        name: value
      }
      // console.log('2nd value in filter dept', value);
    }

    const filterValue = value.name.toLowerCase();
    // console.log('inside filter dept', filterValue);
    let a = this.allDepartments.filter(dept => dept.name.toLowerCase().indexOf(filterValue) === 0);
    // console.log('inside filter a>>', a);
    return a;
  }

  cancel() {
    this.hospital = new Hospital({});
    this.phone1 = '';
    this.phone2 = '';
    this.emergencyNumber = '';
    this.addDepartmentNow = false;
    this.selectedDepartments = [];
  }

  submit() {
    this.hospital.phone1 = "+977" + this.phone1;
    this.hospital.phone2 = "+977" + this.phone2;
    this.hospital.emergencyNumber = "+977" + this.emergencyNumber;
    this.hospital.departments = this.selectedDepartments;
    console.log(this.hospital);
    this.hospitalService.createHospital(this.hospital).subscribe(
      (data) => {
        this.msgService.showSuccess('Hospital Added Successfully');
        this.hospital = new Hospital({});
        this.phone1 = '';
        this.phone2 = '';
        this.emergencyNumber = '';
        this.addDepartmentNow = false;
        this.selectedDepartments = [];
      },
      error => {
        this.msgService.showError(error);
      }
    )
  }

  changeAddDepartmentNow() {
    if (!this.addDepartmentNow) {
      this.selectedDepartments = [];
    }

  }
}
