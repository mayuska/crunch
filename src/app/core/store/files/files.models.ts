import { EntityState } from '@ngrx/entity';

/** Interface for the 'Files' data */
export interface FilesEntity {
  /** The unique ID of the entity */
  id: string;
  /** The name of the json file */
  name: string;
  /** Dis */
  displayName: string;
  /** The description of the json file */
  description?: string;
  /** Is the content of the file valid */
  valid: boolean;
  /** The actual content of the json file */
  content: any;
}

export interface FilesState extends EntityState<FilesEntity> {
  /** Which Files record has been selected */
  selectedId?: string | number;
  /** Has the Files list been loaded */
  loaded: boolean;
  /** Last known error (if any) */
  error?: string | null;
}
