import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html-pipe';
import { DomService } from '../../../shared/services/dom.service';

@Component({
  selector: 'crunch-navigation',
  imports: [RouterLink, CommonModule, SafeHtmlPipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  private domService = inject(DomService);
  protected logo = this.domService.getSvgImg('logo');
}
