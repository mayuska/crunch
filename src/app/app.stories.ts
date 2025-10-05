import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { App } from './app';
import { expect } from 'storybook/test';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FilesEffects } from './core/store/files/files.effects';
import * as fromFiles from './core/store/files/files.reducer';
import { FilesFacade } from './core/store/files/files.facade';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const meta: Meta<App> = {
  component: App,
  title: 'App',
  decorators: [
    applicationConfig({
      providers: [
        provideStore(),
        provideEffects(FilesEffects),
        provideState(fromFiles.FILES_FEATURE_KEY, fromFiles.reducer),
        FilesFacade,
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient()
      ]
    })
  ]
};
export default meta;

type Story = StoryObj<App>;

export const Primary: Story = {
  args: {}
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/app/gi)).toBeTruthy();
  }
};
