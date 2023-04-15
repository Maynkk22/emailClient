import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, FormControl } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

// using injectables only because we need to make use of http inside our validator class, which need to be injected inside the
// class, which can only be made use by custom created class if they have access to depency injection system.
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private auth: AuthService) {}
  validate = (control: AbstractControl) => {
    const { value } = control;
    return this.auth.usernameAvailable(value).pipe(
      map((value) => {
        if (value.available) {
          return null;
        }
        return null;
      }),
      catchError((err) => {
        console.log(err);
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
