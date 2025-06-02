import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Импорт Angular Material модулей для standalone-компонента:
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// Импорт кастомных валидаторов (не забудьте проверить путь)
import { CustomValidators } from '../../shared/custom-validators';

@Component({
  standalone: true,
  selector: 'app-client-data',
  templateUrl: './client-data.html',
  styleUrls: ['./client-data.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class ClientDataComponent implements OnInit {
  @Input() form!: FormGroup;
  
  // Список для выбора пола
  genders: string[] = ['Мужской', 'Женский'];
  
  ngOnInit(): void {
    if (!this.form) {
      throw new Error('ClientDataComponent: form input is required');
    }
    // Поля клиента с сохранением ранее реализованного функционала

    // Имя – обязательно; минимум 2, максимум 50 символов
    if (!this.form.contains('firstName')) {
      this.form.addControl(
        'firstName',
        new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])
      );
    }
    // Фамилия – обязательно; минимум 2, максимум 50 символов
    if (!this.form.contains('lastName')) {
      this.form.addControl(
        'lastName',
        new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ])
      );
    }
    // Отчество – необязательно, если заполнено, то минимум 2, максимум 50 символов
    if (!this.form.contains('middleName')) {
      this.form.addControl(
        'middleName',
        new FormControl('', [
          Validators.minLength(2),
          Validators.maxLength(50)
        ])
      );
    }
    // Пол – обязательно (выбор из списка)
    if (!this.form.contains('gender')) {
      this.form.addControl('gender', new FormControl('', Validators.required));
    }
    // Дата рождения – обязательно, с кастомным валидатором (например, минимум 18 лет)
    if (!this.form.contains('dateOfBirth')) {
      this.form.addControl(
        'dateOfBirth',
        new FormControl('', [
          Validators.required,
          CustomValidators.minimumAge(18)
        ])
      );
    }
    // Телефон – обязательно, с кастомным валидатором формата телефона
    if (!this.form.contains('phone')) {
      this.form.addControl(
        'phone',
        new FormControl('', [
          Validators.required,
          CustomValidators.phoneFormat()
        ])
      );
    }
    // Паспорт – обязательно, с кастомным валидатором корректности серии и номера
    if (!this.form.contains('passport')) {
      this.form.addControl('passport', new FormControl('', [
        Validators.required,
        CustomValidators.passportValidator()
      ]));
    }
  }
}
