import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FilesEntity } from '../../../core/store/files/files.models';
import { FilesFacade } from '../../../core/store/files/files.facade';
import { descriptionPatternValidator, namePatternValidator } from '../../validators/form-control.validator';

@Component({
  selector: 'crunch-upload-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './upload-dialog.component.html',
  styleUrl: './upload-dialog.component.scss'
})
export class UploadDialogComponent {
  public readonly GITHUB_USERNAME = 'mayuska';
  /** Facade for files state management */
  protected readonly filesFacade = inject(FilesFacade);

  protected form = new FormGroup({
    file: new FormControl(null, Validators.required),
    displayName: new FormControl('', [Validators.required, Validators.maxLength(32), namePatternValidator(this.GITHUB_USERNAME)]),
    description: new FormControl('', [Validators.maxLength(128), descriptionPatternValidator(this.GITHUB_USERNAME)])
  });

  private ngbActiveModal = inject(NgbActiveModal);

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.form.patchValue({ file });
    }
  }

  upload() {
    if (this.form.valid) {
      const values = this.form.getRawValue();
      const fileInput = values.file as File;
      const reader = new FileReader();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onload = (e: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let parsedContent: any;
        try {
          parsedContent = JSON.parse(e.target.result);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          parsedContent = null;
        }

        const newFile: FilesEntity = {
          id: crypto.randomUUID(),
          displayName: values.displayName,
          name: fileInput?.name || '',
          description: values.description,
          valid: !!parsedContent,
          content: parsedContent
        };

        this.filesFacade.addFile(newFile);
        this.cancel(true);
      };

      reader.readAsText(fileInput);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel(uploaded?: boolean) {
    this.ngbActiveModal.close(uploaded);
  }
}
