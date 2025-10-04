import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './core/components/navigation/navigation.component';

@Component({
  imports: [RouterModule, NavigationComponent],
  selector: 'crunch-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
