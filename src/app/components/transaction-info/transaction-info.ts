import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.html',
  styleUrls: ['./transaction-info.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule]
})
export class TransactionInfoComponent implements OnInit {
  @Input() form!: FormGroup;
  
  ngOnInit(): void {
    if (!this.form) {
      throw new Error('TransactionInfoComponent: input form required');
    }
    if (!this.form.contains('amount')) {
      this.form.addControl('amount', new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+([.][0-9]{1,2})?$')
      ]));
    }
    if (!this.form.contains('transactionDate')) {
      this.form.addControl('transactionDate', new FormControl('', Validators.required));
    }
    if (!this.form.contains('purpose')) {
      this.form.addControl('purpose', new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]));
    }
  }
}



