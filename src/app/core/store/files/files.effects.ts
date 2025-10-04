import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, tap, withLatestFrom } from 'rxjs';
import * as FilesActions from './files.actions';
import { selectAllFiles } from './files.selectors';
import { Store } from '@ngrx/store';

const FILES_KEY = 'crunch-files';

@Injectable()
export class FilesEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  /** Load initial state from localStorage */
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilesActions.initFiles),
      map(() => {
        try {
          const json = localStorage.getItem(FILES_KEY);
          const files = json ? JSON.parse(json) : [];
          return FilesActions.loadFilesSuccess({ files });
        } catch (error) {
          return FilesActions.loadFilesFailure({ error });
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(FilesActions.loadFilesFailure({ error }));
      })
    )
  );

  /** Persist to localStorage on every change (add, delete, or full load) */
  persistFiles$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FilesActions.loadFilesSuccess, FilesActions.addFile, FilesActions.deleteFile),
        withLatestFrom(this.store.select(selectAllFiles)),
        tap(([_, files]) => {
          localStorage.setItem(FILES_KEY, JSON.stringify(files));
        })
      ),
    { dispatch: false }
  );
}
