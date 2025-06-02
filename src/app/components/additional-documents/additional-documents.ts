import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-additional-documents',
  templateUrl: './additional-documents.html',
  styleUrls: ['./additional-documents.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AdditionalDocumentsComponent implements OnInit {
  @Input() form!: FormArray;

  ngOnInit(): void {
    // Если в передаваемом FormArray ещё нет документов, добавляем один для начала
    if (this.form.length === 0) {
      this.addDocument();
    }
  }

  addDocument(): void {
    const documentGroup = new FormGroup({
      documentType: new FormControl('', Validators.required),
      documentFile: new FormControl(null, Validators.required),
      documentDescription: new FormControl('')
    });
    this.form.push(documentGroup);
  }

  removeDocument(index: number): void {
    this.form.removeAt(index);
  }

  // Геттер для безопасного приведения типа
  get documentGroups(): FormGroup[] {
    return this.form.controls as FormGroup[];
  }
}
