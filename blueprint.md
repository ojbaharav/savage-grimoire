# SWADE Powers Web App Blueprint

## Overview

This document outlines the plan and progress for building a React web application to display and manage SWADE (Savage Worlds Adventure Edition) powers. The application will be similar in functionality to PF2Easy's spellbook, featuring a filterable and sortable table of powers, light/dark mode, and a responsive design.

## Completed Tasks

### Initial Setup and Core Features

*   **Project Setup:**
    *   Installed necessary dependencies: `@mui/material`, `@emotion/react`, `@emotion/styled`, `sass`.
    *   Created the initial file structure, including folders for components, data, styles, hooks, and utils.
    *   Created the `powers.json` file with sample data.

*   **Data Loading:**
    *   Created a `dataLoader.js` utility to load the `powers.json` file.
    *   Implemented a `usePowers.js` hook to manage the powers data.

*   **Component Implementation:**
    *   Created a `PowerTable` component to display the powers in a Material UI table.
    *   Created a `FilterPanel` component with Material UI checkboxes for filtering.
    *   Created a `ThemeToggle` component to switch between light and dark themes.

*   **Styling:**
    *   Set up the basic SCSS structure with `_variables.scss`, `_mixins.scss`, `_components.scss`, and `main.scss`.

*   **App Component:**
    *   Integrated the components into the main `App.tsx` file.

### Advanced Features

*   **Advanced Filtering:**
    *   Created a utility function to extract unique values from the powers data.
    *   Updated the `FilterPanel` component to include filters for `arcane_background` and `domain`.
    *   Updated the `useFilters` hook to handle the new filters.
    *   Updated `App.tsx` to pass the filter options to `FilterPanel`.

*   **Search:**
    *   Created a `SearchBar` component.
    *   Updated `useFilters` to include a search query.
    *   Integrated the `SearchBar` into `App.tsx`.

*   **Responsive Design:**
    *   Used Material UI's grid system to create a responsive layout.
    *   Ensured the `PowerTable` and `FilterPanel` are usable on smaller screens.

## Future Enhancements

*   **Detailed Power View:** Clicking on a power in the table could open a modal or a separate page with more detailed information.
*   **Character Sheet Integration:** The app could be integrated with a character sheet to allow users to add and manage their character's powers.
*   **Custom Power Creation:** Users could be able to create and save their own custom powers.
