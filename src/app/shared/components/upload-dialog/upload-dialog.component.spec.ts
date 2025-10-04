/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    window.crypto.randomUUID = jest.fn(() => 'mock-uuid');

    (window as any).FileReader = jest.fn(() => fileReaderMock);
  });

  beforeEach(async () => {
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
  ])('should handle $name correctly', ({ content, valid, expectedContent }) => {
    const fakeFile = new Blob([content], { type: 'application/json' }) as File;
    Object.defineProperty(fakeFile, 'name', { value: 'test.json' });

    component['form'].patchValue({
      file: fakeFile,
      displayName: 'Test File',
      description: ''
    });

    component.upload();
    fileReaderMock.onload?.({ target: { result: content } });

    expect(filesFacadeMock.addFile).toHaveBeenCalledWith(
      expect.objectContaining({
        valid,
        content: expectedContent
      })
    );
  });
});

const filesFacadeMock = {
  addFile: jest.fn()
};

const ngbActiveModalMock = {
  close: jest.fn()
};

const fileReaderMock = {
  readAsText: jest.fn(),
  onload: null as any
};
