import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-registration-address',
  templateUrl: './registration-address.html',
  styleUrls: ['./registration-address.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegistrationAddressComponent implements OnInit {
  @Input() form!: FormGroup;

  
  countries: string[] = ['Беларусь', 'Россия', 'Украина'];

  ngOnInit(): void {
    
    this.form.addControl('country', new FormControl('', Validators.required));
    this.form.addControl('region', new FormControl('', [Validators.required, Validators.minLength(3)]));
    this.form.addControl('city', new FormControl('', [Validators.required, Validators.minLength(3)]));
    this.form.addControl('street', new FormControl('', [Validators.required, Validators.minLength(3)]));
    this.form.addControl('house', new FormControl('', [Validators.required, Validators.minLength(1)]));
    // Поле "Квартира" не обязательно, проверяем, что введены только цифры.
    this.form.addControl('apartment', new FormControl('', Validators.pattern(/^\d*$/)));
    // Индекс обязателен и должен состоять ровно из 6 цифр.
    this.form.addControl('postalCode', new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]));
  }
}
