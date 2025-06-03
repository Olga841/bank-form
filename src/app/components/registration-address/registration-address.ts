import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-registration-address',
  templateUrl: './registration-address.html',
  styleUrls: ['./registration-address.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule]
})
export class RegistrationAddressComponent implements OnInit {
  countries: string[] = ['Беларусь', 'Россия', 'Украина', 'Польша'];
  @Input() form!: FormGroup;
  
  ngOnInit(): void {
    if (!this.form) {
      throw new Error('RegistrationAddressComponent: input form required');
    }
    if (!this.form.contains('street')) {
      this.form.addControl('street', new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]));
    }
    if (!this.form.contains('houseNumber')) {
      this.form.addControl('houseNumber', new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]));
    }
    if (!this.form.contains('city')) {
      this.form.addControl('city', new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]));
    }
    if (!this.form.contains('postalCode')) {
      this.form.addControl('postalCode', new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{5}$')
      ]));
    }
    
    if (!this.form) {
      throw new Error('RegistrationAddressComponent: input form required');
    }
    // При инициализации добавляем контрол для страны, если он отсутствует
    if (!this.form.contains('country')) {
      this.form.addControl('country', new FormControl('', Validators.required));
    }
  }
}
