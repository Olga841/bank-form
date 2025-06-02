import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Импортируем standalone-компоненты формы
import { ClientDataComponent } from '../components/client-data/client-data';
import { RegistrationAddressComponent } from '../components/registration-address/registration-address';
import { BankDetailsComponent } from '../components/bank-details/bank-details';
import { TransactionInfoComponent } from '../components/transaction-info/transaction-info';
import { AdditionalDocumentsComponent } from '../components/additional-documents/additional-documents';

import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-bank-form',
  templateUrl: './bank-form.html',
  styleUrls: ['./bank-form.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientDataComponent,
    RegistrationAddressComponent,
    BankDetailsComponent,
    TransactionInfoComponent,
    AdditionalDocumentsComponent,
    MatButtonModule
  ]
})
export class BankFormComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      clientData: this.fb.group({}),
      registrationAddress: this.fb.group({}),
      bankDetails: this.fb.group({}),
      transactionInfo: this.fb.group({}),
      additionalDocuments: this.fb.array([])
    });
  }

  // Геттеры для удобного доступа к подформам
  get clientDataForm(): FormGroup {
    return this.transactionForm.get('clientData') as FormGroup;
  }
  get registrationAddressForm(): FormGroup {
    return this.transactionForm.get('registrationAddress') as FormGroup;
  }
  get bankDetailsForm(): FormGroup {
    return this.transactionForm.get('bankDetails') as FormGroup;
  }
  get transactionInfoForm(): FormGroup {
    return this.transactionForm.get('transactionInfo') as FormGroup;
  }
  get additionalDocumentsForm(): FormArray {
    return this.transactionForm.get('additionalDocuments') as FormArray;
  }

  // Обработчик на отправку формы
  onSubmit(): void {
    // Если форма не валидна — помечаем все поля как "затронутые"
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }
    // Здесь можно отправить данные на сервер с помощью HttpClient.
    // Пока выводим данные в консоль для демонстрации:
    console.log('Отправленные данные:', this.transactionForm.value);
  }

  // Обработчик на очистку формы
  onReset(): void {
    this.transactionForm.reset();
  }
}

