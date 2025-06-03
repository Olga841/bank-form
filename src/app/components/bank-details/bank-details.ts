import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// Если используется кастомный валидатор для IBAN – не забудьте его импортировать
import { CustomValidators } from '../../shared/custom-validators';

@Component({
  standalone: true,
  selector: 'app-bank-details',
  templateUrl: './bank-details.html',
  styleUrls: ['./bank-details.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class BankDetailsComponent implements OnInit {
  @Input() form!: FormGroup;
  
  ngOnInit(): void {
    if (!this.form) {
      throw new Error('BankDetailsComponent: input form required');
    }
    
    // Наименование банка – обязательное с минимум 3 символами
    if (!this.form.contains('bankName')) {
      this.form.addControl('bankName', new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]));
    }
    
    // Номер счета – обязательное, только цифры
    if (!this.form.contains('accountNumber')) {
      this.form.addControl('accountNumber', new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]));
    }
    
    // Корреспондентский счет – обязательное, только цифры, ровно 20 символов
    if (!this.form.contains('corrAccount')) {
      this.form.addControl('corrAccount', new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{20}$/)
      ]));
    }
    
    // BIC – обязательное, с проверкой через регулярное выражение (пример)
    if (!this.form.contains('bic')) {
      this.form.addControl('bic', new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/)
      ]));
    }
    
    // IBAN – проверяется кастомным валидатором (уже настроен ранее)
    if (!this.form.contains('iban')) {
      this.form.addControl('iban', new FormControl('', [
        Validators.required,
        CustomValidators.ibanValidator()
      ]));
    }
  }
}

