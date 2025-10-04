import { Action } from '@ngrx/store';

import * as FilesActions from './files.actions';
import { FilesEntity, FilesState } from './files.models';
import { initialFilesState, reducer } from './files.reducer';

describe('Files Reducer', () => {
  const createFilesEntity = (id: string, name = ''): FilesEntity => ({
    id: id,
    name: name || `name-${id}`,
    displayName: `displayName-${id}`,
    valid: true,
    content: null
  });

  describe('valid Files actions', () => {
    it('loadFilesSuccess should return the list of known Files', () => {
      const files = [createFilesEntity('PRODUCT-AAA'), createFilesEntity('PRODUCT-zzz')];
      const action = FilesActions.loadFilesSuccess({ files });

      const result: FilesState = reducer(initialFilesState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialFilesState, action);

      expect(result).toBe(initialFilesState);
    });
  });
});
