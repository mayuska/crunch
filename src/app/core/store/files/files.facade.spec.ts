import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import * as FilesActions from './files.actions';
import { FilesEffects } from './files.effects';
import { FilesFacade } from './files.facade';
import { FilesEntity, FilesState } from './files.models';
import { FILES_FEATURE_KEY, reducer } from './files.reducer';

interface TestSchema {
  files: FilesState;
}

describe('FilesFacade', () => {
  let facade: FilesFacade;
  let store: Store<TestSchema>;
  const createFilesEntity = (id: string, name = ''): FilesEntity => ({
    id: id,
    name: name || `name-${id}`,
    displayName: `displayName-${id}`,
    valid: true,
    content: null
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(FILES_FEATURE_KEY, reducer), EffectsModule.forFeature([FilesEffects])],
        providers: [FilesFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(FilesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allFiles$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await firstValueFrom(facade.allFiles$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadFilesSuccess` to manually update list
     */
    it('allFiles$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allFiles$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        FilesActions.loadFilesSuccess({
          files: [createFilesEntity('AAA'), createFilesEntity('BBB')]
        })
      );

      list = await firstValueFrom(facade.allFiles$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
