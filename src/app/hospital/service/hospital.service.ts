import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hospital } from 'src/app/shared/models/hospital.model';

@Injectable()
export class HospitalService {
    url = environment.BaseUrl + 'hospital-service/'
    constructor(
        public http: HttpClient
    ) {

    }

    getCity() {
        return this.http.get(this.url + 'cities', this.options())
    }

    getDepartment() {
        return this.http.get(this.url + 'departments', this.options())
    }

    createHospital(hospital: Hospital) {
        return this.http.post(this.url + 'hospitals', hospital, this.options())
    }

    updateHospital() {

    }

    changeActiveStatus(id, data) {
        return this.http.put(this.url + 'hospitals/' + id, data, this.options())
    }

    listHospital() {
        return this.http.get(this.url + 'hospitals', this.options())
    }

    options() {
        let option = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'id-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhOWI3NTZlOC1hMzBjLTRiYzEtOWNmYi0xMmI2MDY1MGI5ODIiLCJjb2duaXRvOmdyb3VwcyI6WyJST0xFX1NVUEVSX0FETUlOIl0sIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.V5HmAYjZgZz642LD4bd8B9baTimxmehlYP6n8z7S0uc',
            })
        }
        return option;
    }
}