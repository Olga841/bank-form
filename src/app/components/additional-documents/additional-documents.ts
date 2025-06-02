import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-additional-documents',
  templateUrl: './additional-documents.html',
  styleUrls: ['./additional-documents.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule]
})
export class AdditionalDocumentsComponent implements OnInit {
  @Input() form!: FormArray;
  
  ngOnInit(): void {
    if (!this.form) {
      throw new Error('AdditionalDocumentsComponent: FormArray input required');
    }
    // Если массив пуст – добавляем первый документ
    if (this.form.length === 0) {
      this.addDocument();
    }
  }
  
  addDocument(): void {
    const docGroup = new FormGroup({
      docName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      docNumber: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
    this.form.push(docGroup);
  }
  
  removeDocument(index: number): void {
    this.form.removeAt(index);
  }
}
