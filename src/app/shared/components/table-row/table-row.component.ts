import { Component, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { ModalsService } from '../../services/modals.service';
import { FilesEntity } from '../../../core/store/files/files.models';
import { FilesFacade } from '../../../core/store/files/files.facade';

@Component({
  selector: 'crunch-table-row',
  imports: [NgClass],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss'
})
export class TableRowComponent {
  /** Template reference for the row content */
  public template = viewChild('template', { read: TemplateRef });
  /** position of the row on current page */
  protected hoveredRowPos = signal<number>(null);
  /** Central service for opening modals */
  private modalService = inject(ModalsService);
  /** Facade for files state management */
  protected readonly filesFacade = inject(FilesFacade);

  /** Open delete confirmation modal */
  protected openDeleteConfirm(row: FilesEntity) {
    this.modalService.openDelete(row.displayName).result.then((res) => {
      if (res) {
        this.filesFacade.deleteFile(row.id);
      }
    });
  }
}
