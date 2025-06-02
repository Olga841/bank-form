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
      if (!control.value) return null; // Если значение отсутствует, допустим, RequiredValidator обработает это.
      
      // Обрезаем пробелы по краям
      const value = control.value.trim();
      
      // Регулярное выражение: 2 латинские буквы (любого регистра), затем 6 цифр
      const pattern = /^[A-Za-z]{2}\d{6}$/;
      
      return pattern.test(value) ? null : { passportInvalid: true };
    };
  }

  // Валидатор для проверки длины банковских реквизитов (например, номер счета).  
  // Он проверяет, что значение (приведённое к строке) имеет длину между min и max.
  static ibanValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // Если значение отсутствует – обязателен другой валидатор (Validators.required)
      
      const value = control.value.trim().toUpperCase();
      const pattern = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
      
      return pattern.test(value) ? null : { ibanInvalid: true };
    };
  }
}
