/* eslint-disable @typescript-eslint/no-explicit-any */
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TableRowComponent } from './table-row.component';
import { FilesFacade } from '../../../core/store/files/files.facade';
import { ModalsService } from '../../services/modals.service';
import { FilesEntity } from '../../../core/store/files/files.models';

describe(TableRowComponent.name, () => {
  let fixture: any;
  let component: TableRowComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRowComponent],
      providers: [
        { provide: FilesFacade, useValue: filesFacadeMock },
        { provide: ModalsService, useValue: modalServiceMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteFile when confirm is true', fakeAsync(() => {
    const row = { id: 'file-id', displayName: 'file.txt' } as FilesEntity;

    component['openDeleteConfirm'](row);
    tick();
    expect(filesFacadeMock.deleteFile).toHaveBeenCalledWith('file-id');
  }));
});

const filesFacadeMock = {
  deleteFile: jest.fn()
};

const modalServiceMock = {
  openDelete: jest.fn().mockReturnValue({
    result: Promise.resolve(true) // Simulate dialog result
  })
};
