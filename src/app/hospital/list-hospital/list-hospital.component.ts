import { Component, OnInit, ViewChild } from '@angular/core';
import { MsgService } from 'src/app/shared/services/msg.service';
import { HospitalService } from '../service/hospital.service';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/shared/models/hospital.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-list-hospital',
  templateUrl: './list-hospital.component.html',
  styleUrls: ['./list-hospital.component.css']
})
export class ListHospitalComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone1', 'email', 'verificationNumber', 'verificationType', 'address', 'active', 'action'];
  hospitals = [];
  dataSource: MatTableDataSource<Hospital>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public msgService: MsgService,
    public hospitalService: HospitalService,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.hospitalService.listHospital().subscribe(
      (data: any) => {
        console.log('hospitals:', data);
        this.hospitals = data;
        this.dataSource = new MatTableDataSource(this.hospitals);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.msgService.showError(error);
      }
    )

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  makeActive(hospitalId, i, activeFlag) {
    let confirmation = confirm('Are you sure to change status?');
    if (confirmation) {
      // console.log(hospitalId);
      // console.log(i);
      this.hospitalService.changeActiveStatus(hospitalId, { active: activeFlag }).subscribe(
        (data) => {
          this.msgService.showSuccess('Status changed successfully');
          this.hospitals[i].active = activeFlag;
        },
        (error) => {
          this.msgService.showError(error);
        }
      )
    }

  }
}
