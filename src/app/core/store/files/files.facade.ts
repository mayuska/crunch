import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FilesActions from './files.actions';
import * as FilesSelectors from './files.selectors';
import { FilesEntity } from './files.models';
import { map } from 'rxjs';

@Injectable()
export class FilesFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(FilesSelectors.selectFilesLoaded));
  allFiles$ = this.store.pipe(select(FilesSelectors.selectAllFiles));
  totalFiles$ = this.store.pipe(select(FilesSelectors.selectFilesTotal));
  selectedFiles$ = this.store.pipe(select(FilesSelectors.selectEntity));
  error$ = this.store.pipe(select(FilesSelectors.selectFilesError));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(FilesActions.initFiles());
  }

  addFile(file: FilesEntity) {
    this.store.dispatch(FilesActions.addFile({ file }));
  }

  deleteFile(id: string) {
    this.store.dispatch(FilesActions.deleteFile({ id }));
  }

  paginatedFiles(page: number, pageSize: number) {
    return this.allFiles$.pipe(
      map((files) => {
        const start = (page - 1) * pageSize;
        return files.slice(start, start + pageSize);
      })
    );
  }
}
