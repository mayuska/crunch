import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const namePatternValidator = (githubUsername: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      return null;
    }

    const allowedChars = /^[a-zA-Z0-9_-]+$/;
    if (!allowedChars.test(value)) {
      return { invalidChars: true };
    }

    const requiredPattern = `42c-${githubUsername}`;
    if (!value.includes(requiredPattern)) {
      return { missingPattern: { pattern: requiredPattern } };
    }

    return null;
  };
};

export const descriptionPatternValidator = (githubUsername: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    const forbiddenPattern = `42c-${githubUsername}`;
    if (value.includes(forbiddenPattern)) {
      return { forbiddenPattern: { pattern: forbiddenPattern } };
    }

    return null;
  };
};
