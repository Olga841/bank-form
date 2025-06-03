import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { CustomValidators } from '../../shared/custom-validators';

@Component({
  standalone: true,
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.html',
  styleUrls: ['./transaction-info.scss'],
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
export class TransactionInfoComponent implements OnInit {
  @Input() form!: FormGroup;

  // Опционально можно задать массивы для выпадающих списков
  transactionTypes: string[] = ['Перевод', 'Оплата', 'Пополнение'];
  currencies: string[] = ['RUB', 'USD', 'EUR'];

  ngOnInit(): void {
    if (!this.form) {
      throw new Error('TransactionInfoComponent: input form required');
    }
    
    // Сумма транзакции – положительное число, допустимо с 2 знаками после запятой
    if (!this.form.contains('amount')) {
      this.form.addControl('amount', new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+([.][0-9]{1,2})?$')
      ]));
    }
    
    // Дата транзакции – обязательное поле
    if (!this.form.contains('transactionDate')) {
      this.form.addControl('transactionDate', new FormControl('', Validators.required));
    }
    
    // Назначение платежа – обязательное, от 5 до 200 символов
    if (!this.form.contains('purpose')) {
      this.form.addControl('purpose', new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]));
    }
    
    // Новый: Тип транзакции – обязательное поле, выбор из выпадающего списка
    if (!this.form.contains('transactionType')) {
      this.form.addControl('transactionType', new FormControl('', Validators.required));
    }
    
    // Новый: Валюта – обязательное поле, выбор из выпадающего списка
    if (!this.form.contains('currency')) {
      this.form.addControl('currency', new FormControl('', Validators.required));
    }
    
    // Новый: Комментарий – необязательное поле, максимум 200 символов
    if (!this.form.contains('comment')) {
      this.form.addControl('comment', new FormControl('', Validators.maxLength(200)));
    }
  }
}
