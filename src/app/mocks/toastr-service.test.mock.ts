import { IndividualConfig } from 'ngx-toastr';

const TOASTR_SERVICE_MOCK = {
  success: (
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ) => {},
  error: (
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ) => {},
};

export default TOASTR_SERVICE_MOCK;
