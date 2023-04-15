import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, Validator } from '@angular/forms';

// Using Injectable to make use of this class anywhere, importing it to other components.
@Injectable({ providedIn: 'root' })
// Using Implements Validator is optional as if we use it'll help us in creating Validator Class Blueprint with thoughful error messages
export class MatchPassword implements Validator {
  validate(formGroup: AbstractControl) {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordDontMatch: true };
    }
  }
}
