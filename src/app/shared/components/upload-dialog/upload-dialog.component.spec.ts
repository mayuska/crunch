/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UploadDialogComponent } from './upload-dialog.component';
import { FilesFacade } from '../../../core/store/files/files.facade';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('UploadDialogComponent', () => {
  let component: UploadDialogComponent;
  let fixture: ComponentFixture<UploadDialogComponent>;

  beforeAll(() => {
    if (!window.crypto) {
      (window as any).crypto = {};
    }
    window.crypto.randomUUID = jest.fn(() => 'mock-uuid' as any);
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [UploadDialogComponent],
      providers: [
        { provide: FilesFacade, useValue: filesFacadeMock },
        { provide: NgbActiveModal, useValue: ngbActiveModalMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component['form'].patchValue({
      file: '',
      displayName: '42c-mayuska-1',
      description: 'Test Description'
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it.each([
    {
      name: 'valid JSON',
      content: JSON.stringify({ a: 1 }),
      valid: true,
      expectedContent: { a: 1 }
    },
    {
      name: 'invalid JSON',
      content: '{ a: 1 }',
      valid: false,
      expectedContent: null
    }
  ])(
    'should handle $name correctly',
    fakeAsync(({ content, valid, expectedContent }) => {
      const fakeFile = new Blob([content], { type: 'application/json' }) as File;
      Object.defineProperty(fakeFile, 'name', { value: 'test.json' });

      component['form'].patchValue({ file: fakeFile });
      tick();

      jest.spyOn(FileReader.prototype, 'readAsText').mockImplementation(function (this: FileReader) {
        if (this.onload) {
          setTimeout(() => this.onload?.({ target: { result: content } } as any), 0);
        }
      });

      component.upload();
      tick(); // let the onload setTimeout execute

      expect(filesFacadeMock.addFile).toHaveBeenCalledWith(
        expect.objectContaining({
          valid,
          content: expectedContent
        })
      );
      expect(ngbActiveModalMock.close).toHaveBeenCalledWith(true);
    })
  );
});

const filesFacadeMock = {
  addFile: jest.fn()
};

const ngbActiveModalMock = {
  close: jest.fn()
};
