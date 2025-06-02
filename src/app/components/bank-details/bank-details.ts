import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../../shared/custom-validators';

@Component({
  standalone: true,
  selector: 'app-bank-details',
  templateUrl: './bank-details.html',
  styleUrls: ['./bank-details.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class BankDetailsComponent implements OnInit {
  @Input() form!: FormGroup;

  ngOnInit(): void {
    if (!this.form) {
      throw new Error('BankDetailsComponent: form input is required');
    }

    // Название банка и другие поля можно оставить без изменений…
    if (!this.form.contains('bankName')) {
      this.form.addControl('bankName', new FormControl('', Validators.required));
    }

    // Здесь мы задаём контрол для номера счета, требуя только цифры и проверяя длину в диапазоне от 10 до 20 символов
    if (!this.form.contains('accountNumber')) {
      this.form.addControl('accountNumber', new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/), // проверка, что значение состоит только из цифр
        CustomValidators.bankDetailLength(10, 20)
      ]));
    }

    if (!this.form.contains('bic')) {
      this.form.addControl('bic', new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/)
      ]));
    }
    if (!this.form.contains('iban')) {
      this.form.addControl('iban', new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/)
      ]));
    }
  }
}




