import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MsgService {
    constructor(
        public toastr: ToastrService
    ) {

    }

    showSuccess(msg: string) {
        this.toastr.success(msg);
    }
    showInfo(msg: string) {
        this.toastr.info(msg);

    }
    showWarnings(msg: string) {
        this.toastr.warning(msg);

    }
    showError(errorData: any) {
        debugger;
        if (errorData) {
            if (errorData.error) {
                this.toastr.error(errorData.error.message);
            }
        }
    }
}