import { createAction, props } from '@ngrx/store';
import { FilesEntity } from './files.models';

export const initFiles = createAction('[Files Page] Init');

export const loadFilesSuccess = createAction('[Files/API] Load Files Success', props<{ files: FilesEntity[] }>());

export const loadFilesFailure = createAction('[Files/API] Load Files Failure', props<{ error: any }>());

export const addFile = createAction('[Files/API] Add File', props<{ file: FilesEntity }>());

export const deleteFile = createAction('[Files/API] Delete File', props<{ id: string }>());
