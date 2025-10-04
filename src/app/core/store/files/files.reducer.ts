import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import * as FilesActions from './files.actions';
import { FilesEntity, FilesState } from './files.models';

export const FILES_FEATURE_KEY = 'files';

export interface FilesPartialState {
  readonly [FILES_FEATURE_KEY]: FilesState;
}
export const filesAdapter: EntityAdapter<FilesEntity> = createEntityAdapter<FilesEntity>();

export const initialFilesState: FilesState = filesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  error: null
});

export const reducer = createReducer(
  initialFilesState,
  on(FilesActions.initFiles, (state) => ({ ...state, loaded: false, error: null })),
  on(FilesActions.loadFilesSuccess, (state, { files }) => filesAdapter.setAll(files, { ...state, loaded: true })),
  on(FilesActions.loadFilesFailure, (state, { error }) => ({ ...state, error })),
  on(FilesActions.addFile, (state, { file }) => filesAdapter.addOne(file, state)),
  on(FilesActions.deleteFile, (state, { id }) => filesAdapter.removeOne(id, state))
);
