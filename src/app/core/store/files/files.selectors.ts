import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FILES_FEATURE_KEY, filesAdapter } from './files.reducer';
import { FilesState } from './files.models';

// Lookup the 'Files' feature state managed by NgRx
export const selectFilesState = createFeatureSelector<FilesState>(FILES_FEATURE_KEY);

const { selectAll, selectEntities, selectTotal } = filesAdapter.getSelectors();

export const selectFilesLoaded = createSelector(selectFilesState, (state: FilesState) => state.loaded);

export const selectFilesError = createSelector(selectFilesState, (state: FilesState) => state.error);

// not createSelector(selectFilesState, selectAll) for typescript to easier infer return type
export const selectAllFiles = createSelector(selectFilesState, (state: FilesState) => selectAll(state));

// not createSelector(selectFilesState, selectEntities) for typescript to easier infer return type
export const selectFilesEntities = createSelector(selectFilesState, (state: FilesState) => selectEntities(state));

export const selectFilesTotal = createSelector(selectFilesState, (state: FilesState) => selectTotal(state));

export const selectSelectedId = createSelector(selectFilesState, (state: FilesState) => state.selectedId);

export const selectEntity = createSelector(selectFilesEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
