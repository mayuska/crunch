import { Component, input, ViewChild, viewChild } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TableRowComponent } from './table-row.component';
import { FilesEntity } from '../../../core/store/files/files.models';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { ModalsService } from '../../services/modals.service';
import { FilesFacade } from '../../../core/store/files/files.facade';

const mockModalsService = {
  openDelete: (name: string) => ({
    result: Promise.resolve(confirm(`Delete "${name}"?`))
  })
};

const mockFilesFacade = {
  deleteFile: (id: string) => console.log('[Mock deleteFile]', id)
};

const validFile = {
  id: '1',
  name: 'valid.json',
  displayName: 'Valid File',
  description: 'Valid file description',
  valid: true,
  position: 0
} as FilesEntity;

const invalidFile = {
  id: '2',
  name: 'invalid.json',
  displayName: 'Invalid File',
  description: 'Invalid file description',
  valid: false,
  position: 1
} as FilesEntity;

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'storybook-table-row-host',
  standalone: true,
  imports: [CommonModule, TableRowComponent, NgTemplateOutlet],
  template: `
    <div class="px-3 pb-3 table-wrapper">
      <table class="table mt-2 mb-0">
        <tbody>
          <crunch-table-row #rowRef></crunch-table-row>

          @if (rowRef?.template()) {
            <ng-container
              [ngTemplateOutlet]="rowRef.template()"
              [ngTemplateOutletContext]="{ row: file(), i: hoveredRowPos() }"
            ></ng-container>
          }
        </tbody>
      </table>
    </div>
  `
})
class TableRowHostComponent {
  file = input<FilesEntity>(validFile);
  hoveredRowPos = input<number>(validFile['position']);
  rowRef = viewChild(TableRowComponent);
}

const meta: Meta<TableRowHostComponent> = {
  title: 'Table/TableRowComponent',
  component: TableRowHostComponent,
  decorators: [
    applicationConfig({
      providers: [
        { provide: ModalsService, useValue: mockModalsService },
        { provide: FilesFacade, useValue: mockFilesFacade }
      ]
    })
  ],
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    file: {
      options: ['valid', 'invalid'],
      mapping: {
        valid: validFile,
        invalid: invalidFile
      },
      control: { type: 'radio' },
      description: 'File entity to display in the row',
      table: {
        type: { summary: 'FilesEntity' },
        defaultValue: { summary: 'valid' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<TableRowHostComponent>;

export const Default: Story = {
  args: {}
};
