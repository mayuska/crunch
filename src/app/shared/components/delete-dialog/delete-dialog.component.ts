import { Component, inject, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'crunch-delete-dialog',
  imports: [],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  /** Name of the entity to be deleted */
  public displayName = signal<string>('');
  /** A reference to the active modal instance */
  private ngbActiveModal = inject(NgbActiveModal);

  /** Closes the modal without deleting */
  protected cancel() {
    this.ngbActiveModal.close(false);
  }

  /** Closes the modal and confirms deletion */
  protected confirm() {
    this.ngbActiveModal.close(true);
  }
}
