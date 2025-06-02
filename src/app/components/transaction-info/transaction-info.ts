import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.html',
  styleUrls: ['./transaction-info.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TransactionInfoComponent implements OnInit {
  @Input() form!: FormGroup;

  ngOnInit(): void {
    // Добавляем контролы для информации о транзакции
    this.form.addControl('transactionAmount', new FormControl('', [
      Validators.required,
      Validators.min(0.01)
    ]));
    this.form.addControl('transactionDate', new FormControl('', Validators.required));
    this.form.addControl('transactionType', new FormControl('', Validators.required));
    this.form.addControl('description', new FormControl('')); // Поле опциональное
  }
}


