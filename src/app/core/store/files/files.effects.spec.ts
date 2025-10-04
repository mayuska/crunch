import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as FilesActions from './files.actions';
import { FilesEffects } from './files.effects';

describe('FilesEffects', () => {
  let actions: Observable<Action>;
  let effects: FilesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FilesEffects, provideMockActions(() => actions), provideMockStore()]
    });

    effects = TestBed.inject(FilesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FilesActions.initFiles() });

      const expected = hot('-a-|', { a: FilesActions.loadFilesSuccess({ files: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
