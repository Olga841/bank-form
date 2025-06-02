import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  // Валидатор для проверки минимального возраста 
  static minimumAge(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const birthDate = new Date(value);
      if (isNaN(birthDate.getTime())) {
        return { invalidDate: 'Неверная дата' };
      }
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= minAge ? null : { minimumAge: { requiredAge: minAge, actualAge: age } };
    };
  }

  // Валидатор для проверки формата телефона.
  static phoneFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      // Пример шаблона: допускаются числовые значения, пробелы, скобки, дефисы, плюс в начале  
      
      const phoneRegex = /^[+]?[\d\s()-]{12,}$/;
      return phoneRegex.test(value) ? null : { phoneFormat: true };
    };
  }

  // Валидатор для проверки корректности серии и номера паспорта.  
  static passportValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const passportRegex = /^\d{2}\s?\d{6}$/;
      return passportRegex.test(value) ? null : { passportInvalid: true };
    };
  }

  // Валидатор для проверки длины банковских реквизитов (например, номер счета).  
  // Он проверяет, что значение (приведённое к строке) имеет длину между min и max.
  static bankDetailLength(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined) {
        return null;
      }
      const length = value.toString().trim().length;
      if (length < min) {
        return { bankDetailLength: { minRequired: min, actual: length } };
      }
      if (length > max) {
        return { bankDetailLength: { maxRequired: max, actual: length } };
      }
      return null;
    };
  }
}
