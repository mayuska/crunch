import { Component, inject, OnInit } from '@angular/core';
import { ModalsService } from '../../../../shared/services/modals.service';
import { FilesFacade } from '../../../../core/store/files/files.facade';
import { AsyncPipe } from '@angular/common';
import { DomService } from '../../../../shared/services/dom.service';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html-pipe';

@Component({
  selector: 'crunch-home',
  imports: [AsyncPipe, SafeHtmlPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private modalService = inject(ModalsService);
  protected readonly filesFacade = inject(FilesFacade);
  protected readonly domService = inject(DomService);
  /** Image displayed on the home page */
  protected welcomeImage = this.domService.getSvgImg('card-img');

  public ngOnInit() {
    this.filesFacade.init();
  }

  /** Opens dialog for uploading JSON files */
  protected openUploadDialog() {
    this.modalService.openUploadFile().result.then();
  }
}
