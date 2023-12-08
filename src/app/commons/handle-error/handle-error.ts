import { HttpErrorResponse } from "@angular/common/http";
import { TranslatePipe } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { IHandleError } from "../handle-error.interface";

export class HandleError implements IHandleError {

    public isLoading = false;

    constructor (
        protected _toast: ToastrService,
        protected _translatePipe: TranslatePipe,
    ) {}

    handleError(error: HttpErrorResponse) {
        this.isLoading = false;
        this._toast.error(
            this._translatePipe.transform(error.error.message)
        );
      }
}