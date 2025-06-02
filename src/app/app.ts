import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BankFormComponent } from './bank-form/bank-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BankFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'bank-form';
}
