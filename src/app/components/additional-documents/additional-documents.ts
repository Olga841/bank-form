import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material модули
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/**
 * Валидатор для группы документа, который проверяет,
 * что значение номера соответствует требуемой длине для выбранного типа документа.
 */
function docNumberByDocTypeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const docType = group.get('docType')?.value;
    const docNumber = group.get('docNumber')?.value;
    
    if (!docType || !docNumber) return null; // Обязательные валидаторы обработают пустые значения
    
    let requiredLength: number;
    if (docType === 'Паспорт') {
      requiredLength = 10;
    } else if (docType === 'СНИЛС') {
      requiredLength = 11;
    } else if (docType === 'ИНН') {
      requiredLength = 10;
    } else {
      return null;
    }
    
    if (docNumber.toString().length !== requiredLength) {
      return { docNumberLength: { requiredLength, actualLength: docNumber.toString().length } };
    }
    return null;
  };
}

@Component({
  standalone: true,
  selector: 'app-additional-documents',
  templateUrl: './additional-documents.html',
  styleUrls: ['./additional-documents.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class AdditionalDocumentsComponent implements OnInit {
  @Input() form!: FormArray;
  
  // Список доступных типов документа
  documentTypes: string[] = ['Паспорт', 'СНИЛС', 'ИНН'];

  ngOnInit(): void {
    if (!this.form) {
      throw new Error('AdditionalDocumentsComponent: FormArray input required');
    }
    // Здесь мы удаляем автоматическое добавление пустого документа.
    // Пользователь сам сможет добавить документ, нажав кнопку "Добавить документ".
  }
  
  addDocument(): void {
    const docGroup = new FormGroup(
      {
        // Тип документа – выбор из выпадающего списка
        docType: new FormControl('', Validators.required),
        // Номер документа – только цифры
        docNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]),
        // Дата выдачи – обязательно
        issueDate: new FormControl('', Validators.required)
      },
      { validators: docNumberByDocTypeValidator() } // Валидатор на уровень группы для проверки длины
    );
    this.form.push(docGroup);
  }
  
  removeDocument(index: number): void {
    this.form.removeAt(index);
  }

  get documentForms(): FormGroup[] {
    return this.form.controls as FormGroup[];
  }
  
}
