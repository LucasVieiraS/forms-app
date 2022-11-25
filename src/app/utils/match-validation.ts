/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { FormGroup } from '@angular/forms';

export function matchValidation(controlName: string, matchName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const match = formGroup.controls[matchName];

    if (control.errors) {
      return;
    }

    if (control.value !== match.value) {
      match.setErrors({ match: true });
    } else {
      match.setErrors(null);
    }
  };
}
