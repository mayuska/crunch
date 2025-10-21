# Crunch

## Table of content

1. [Intro](#intro)
2. [Dependencies](#dependencies)
3. [Development & Testing](#development)
4. [Features](#features)

## Intro

<a name="intro"></a>
Crunch is a lightweight and efficient web application for uploading, managing, and organizing your files with an intuitive interface.

## Dependencies

<a name="dependencies"></a>

```json
{
  "@angular/common": "~20.3.0",
  "@angular/compiler": "~20.3.0",
  "@angular/core": "~20.3.0",
  "@angular/forms": "~20.3.0",
  "@angular/localize": "^20.3.2",
  "@angular/platform-browser": "~20.3.0",
  "@angular/platform-browser-dynamic": "~20.3.0",
  "@angular/router": "~20.3.0",
  "@ng-bootstrap/ng-bootstrap": "^19.0.1",
  "@ngrx/component-store": "^20.0.0",
  "@ngrx/effects": "^20.0.0",
  "@ngrx/entity": "^20.0.0",
  "@ngrx/router-store": "^20.0.0",
  "@ngrx/store": "^20.0.1",
  "@popperjs/core": "^2.11.8",
  "bootstrap": "^5.3.8",
  "bootstrap-icons": "^1.13.1",
  "rxjs": "~7.8.0",
  "zone.js": "~0.15.0"
}
```

## Development & Testing

<a name="development"></a>

```bash
# Install dependencies
npm install

# Run all branch checks (format, lint, test, build)
npm run verify

# Run locally
npm run start

# Storybook preview
npm run storybook
```

## Features

<a name="features"></a>

### **Welcome Page**

Upload JSON files through a modal dialog, providing a name and a description.

### **File List Page**

Displays uploaded files with:

- File validity indicator (valid / not valid)
- Delete confirmation dialog
- File counter showing number of uploaded items

### **Upload Validation**

The files are automatically validated to ensure they're proper JSON format.
Form inputs are checked in a real-time to keep everything clean and error-free.

### **Persistence**

All uploaded files are automatically stored in the browser's local storage and restored on reload. No server required.

### **Navigation**

Lazy-loaded routes between pages for better performance.
