import { Department } from './department.model';

export class Hospital {
    id: number;
    name: string;
    phone1: string;
    phone2: Number;
    emergencyNumber: String;
    email: String;
    website: String;
    description: String;
    verificationNumber: String;
    verificationType: String;
    address: String;
    address2: String;
    city: String;
    state: String;
    departments: Array<Department>;
    active: Boolean;

    constructor(details: any) {
        this.id = details.id || null;
        this.name = details.name || '';
        this.phone1 = details.phone1 || '';
        this.phone2 = details.phone2 || '';
        this.emergencyNumber = details.emergencyNumber || '';
        this.email = details.email || '';
        this.website = details.website || '';
        this.description = details.description || '';
        this.verificationNumber = details.verificationNumber || '';
        this.verificationType = details.verificationType || '';
        this.address = details.address || '';
        this.address2 = details.address2 || '';
        this.city = details.city || '';
        this.state = details.state || '';
        this.departments = details.departments || null;
        this.active = details.active || true;
    }
}