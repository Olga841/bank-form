import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../../shared/custom-validators'; // или путь '../../shared/custom-validators'

@Component({
  standalone: true,
  selector: 'app-client-data',
  templateUrl: './client-data.html',
  styleUrls: ['./client-data.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ClientDataComponent implements OnInit {
  @Input() form!: FormGroup;

  // Добавляем свойство genders
  genders: string[] = ['Мужской', 'Женский'];

  ngOnInit(): void {
    if (!this.form) {
      throw new Error('ClientDataComponent: form input is required');
    }
    if (!this.form.contains('dateOfBirth')) {
      this.form.addControl('dateOfBirth', new FormControl('', [
        Validators.required,
        CustomValidators.minimumAge(18)
      ]));
    }
    if (!this.form.contains('phone')) {
      this.form.addControl('phone', new FormControl('', [
        Validators.required,
        CustomValidators.phoneFormat()
      ]));
    }
    if (!this.form.contains('passport')) {
      this.form.addControl('passport', new FormControl('', [
        Validators.required,
        CustomValidators.passportValidator()
      ]));
    }
    // Если требуется контрол для выбора пола, его также можно добавить:
    if (!this.form.contains('gender')) {
      this.form.addControl('gender', new FormControl(''));
    }

    // Имя: обязательное, минимум 2, максимум 50 символов
    if (!this.form.contains('firstName')) {
      this.form.addControl('firstName', new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]));
    }
    
    // Фамилия: обязательное, минимум 2, максимум 50 символов
    if (!this.form.contains('lastName')) {
      this.form.addControl('lastName', new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]));
    }
    
    // Отчество: необязательное, если заполнено – минимум 2, максимум 50 символов
    if (!this.form.contains('middleName')) {
      this.form.addControl('middleName', new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(50)
      ]));
    }
  }
}