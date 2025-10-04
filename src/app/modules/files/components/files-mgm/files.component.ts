import { AfterViewInit, Component, computed, inject, signal, viewChild } from '@angular/core';
import { TableRowComponent } from '../../../../shared/components/table-row/table-row.component';
import { NgbPagination, NgbPaginationNext, NgbPaginationPrevious } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ModalsService } from '../../../../shared/services/modals.service';
import { FilesFacade } from '../../../../core/store/files/files.facade';

@Component({
  selector: 'crunch-files',
  imports: [TableRowComponent, NgTemplateOutlet, NgbPagination, NgbPaginationPrevious, NgbPaginationNext, AsyncPipe],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements AfterViewInit {
  /** Reactive reference to the {@link TableRowComponent}. Used for dynamic rendering of each row in the table. */
  protected row = signal<TableRowComponent>(null);
  /** Pagination - current page */
  protected currentPage = signal(1);
  /** Pagination - page size */
  protected pageSize = 10;
  /** Reference to the {@link TableRowComponent} */
  private tableRowComponent = viewChild(TableRowComponent);
  /** Cental service for opening modals */
  private modalService = inject(ModalsService);
  /** Facade for files state management */
  protected readonly filesFacade = inject(FilesFacade);
  /** Observable for current page of files */
  paginatedFiles$ = computed(() => this.filesFacade.paginatedFiles(this.currentPage(), this.pageSize));

  public ngAfterViewInit() {
    this.row.set(this.tableRowComponent());
    this.filesFacade.init();
  }

  /** Opens dialog for uploading JSON files. */
  protected openUploadDialog() {
    this.modalService.openUploadFile().result.then();
  }
}
