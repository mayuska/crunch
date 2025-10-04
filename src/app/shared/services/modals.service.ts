import { inject, Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UploadDialogComponent } from '../components/upload-dialog/upload-dialog.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  /** A ngb service for opening modal windows */
  public readonly ngbModal = inject(NgbModal);

  /** Wrapper method for opening upload file dialog.
   * @param options NgbModalOptions to customize the modal behavior and appearance
   */
  public openUploadFile(options: NgbModalOptions = { size: 'lg' }) {
    const modalRef = this.ngbModal.open(UploadDialogComponent, options);
    return modalRef;
  }

  /** Opens a delete confirmation dialog with the given display name and optional configuration.
   * @param displayName Name to be shown in the confirmation message
   * @param options NgbModalOptions to customize the modal behavior and appearance
   */
  public openDelete(displayName: string, options: NgbModalOptions = { size: 'lg' }) {
    const modalRef = this.ngbModal.open(DeleteDialogComponent, options);

    (modalRef.componentInstance as DeleteDialogComponent).displayName.set(displayName);
    return modalRef;
  }
}
