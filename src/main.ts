import { bootstrapApplication } from '@angular/platform-browser';
import { getPlatform } from '@angular/core';
import { BankFormComponent } from './app/bank-form/bank-form';
import 'zone.js';

if (getPlatform()) {
    getPlatform()?.destroy();
  }

bootstrapApplication(BankFormComponent)
  .catch(err => console.error(err));

  console.log('BankFormComponent:', BankFormComponent);

