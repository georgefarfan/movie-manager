import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filter } from './filters';

export const BUILD_FORM = (filters: Filter[], fb: FormBuilder): FormGroup => {
  let formInputs: any = {};
  filters.forEach((filter) => {
    formInputs[filter.key] = [filter.initialValue];
    if (filter.required) {
      formInputs[filter.key] = [filter.initialValue, Validators.required];
    }
  });
  return fb.group(formInputs);
};
