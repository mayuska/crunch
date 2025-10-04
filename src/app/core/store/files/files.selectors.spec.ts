import { FilesEntity } from './files.models';
import { filesAdapter, FilesPartialState, initialFilesState } from './files.reducer';
import * as FilesSelectors from './files.selectors';

describe('Files Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFilesId = (it: FilesEntity) => it.id;
  const createFilesEntity = (id: string, name = '') =>
    ({
      id: id,
      name: name || `name-${id}`,
      displayName: `displayName-${id}`,
      valid: true,
      content: null
    }) as FilesEntity;

  let state: FilesPartialState;

  beforeEach(() => {
    state = {
      files: filesAdapter.setAll([createFilesEntity('PRODUCT-AAA'), createFilesEntity('PRODUCT-BBB'), createFilesEntity('PRODUCT-CCC')], {
        ...initialFilesState,
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      })
    };
  });

  describe('Files Selectors', () => {
    it('selectAllFiles() should return the list of Files', () => {
      const results = FilesSelectors.selectAllFiles(state);
      const selId = getFilesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = FilesSelectors.selectEntity(state) as FilesEntity;
      const selId = getFilesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectFilesLoaded() should return the current "loaded" status', () => {
      const result = FilesSelectors.selectFilesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectFilesError() should return the current "error" state', () => {
      const result = FilesSelectors.selectFilesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
