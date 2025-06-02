import { bootstrapApplication } from '@angular/platform-browser';
import { BankFormComponent } from './app/bank-form/bank-form';
import 'zone.js';

bootstrapApplication(BankFormComponent).catch(err => console.error(err));

