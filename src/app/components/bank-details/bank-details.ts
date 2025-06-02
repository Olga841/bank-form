import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import {CustomValidators} from '../../shared/custom-validators';

@Component({
  standalone: true,
  selector: 'app-bank-details',
  templateUrl: './bank-details.html',
  styleUrls: ['./bank-details.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule]
})
export class BankDetailsComponent implements OnInit {
  @Input() form!: FormGroup;
  
  ngOnInit(): void {
    if (!this.form) {
      throw new Error('BankDetailsComponent: input form required');
    }
    // Название банка
    if (!this.form.contains('bankName')) {
      this.form.addControl('bankName', new FormControl('', Validators.required));
    }
    // Номер счета
    if (!this.form.contains('accountNumber')) {
      this.form.addControl('accountNumber', new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]));
    }
    // BIC – обязательное поле, проверка может быть реализована через pattern
    if (!this.form.contains('bic')) {
      // Пример паттерна: 8 или 11 символов, первые 6 всегда буквы, далее буквы или цифры (пример для некоторых банков)
      this.form.addControl('bic', new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/)
      ]));
    }
    // IBAN – обязательное поле 
    if (!this.form.contains('iban')) {
      this.form.addControl('iban', new FormControl('', [
        Validators.required,
        CustomValidators.ibanValidator()
      ]));
    }
  }
}
