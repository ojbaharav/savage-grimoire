# SWADE Powers Filter Application

## Overview

This is a React application designed to help users browse and filter through a list of powers from the Savage Worlds Adventure Edition (SWADE) role-playing game. The application provides a user-friendly interface with robust filtering and sorting capabilities to make finding the right power quick and easy.

## Features & Design Documentation

### Key Features

*   **Power Listing:** Displays a comprehensive list of SWADE powers in a clear and organized format.
*   **Filtering:** Allows users to filter powers by various criteria, including:
    *   Rank
    *   Power Points
    *   Arcane Background
    *   Domain
    *   Duration
*   **Sorting:** Enables users to sort the power list by different columns.
*   **Search:** Provides a search bar for quickly finding specific powers.
*   **Dark/Light Mode:** Includes a theme toggler for user preference.

### Implemented Functionality (Previous Iterations)

*   **Component Refactoring:** `FilterPanel` was split into `RankFilter`, `DurationFilter`, `ArcaneBackgroundFilter`, and `DomainFilter` sub-components.
*   **Shared Types:** `Filters` and `FilterOptions` interfaces were moved to `src/types/filters.ts`.
*   **Arcane Background Sub-filters:** Implemented special functionality for "ELEMENTALIST" and "SUMMONER" filters with conditional sub-type selection.
*   **Duration Filter "Any" Option:** Added an "Any" option to the Duration filter for clearing all duration selections.
*   **Rank Display:** The numerical prefix in the rank display has been hidden for a cleaner UI.

## Current Task: Implement Power Cards View

### Plan:

1.  **Create `PowerCard` Component (`src/components/PowerCard/index.tsx`):**
    *   This component will render a single power's details in a card format, as shown in the provided sketch.
    *   It will display the power's name, rank initial, power points, range, duration, and description.
    *   A helper function will be included to extract the first letter of the rank (e.g., 'N' for 'Novice').

2.  **Create `PowerCardList` Component (`src/components/PowerCardList/index.tsx`):**
    *   This component will receive the list of filtered and sorted powers.
    *   It will map through the powers and render a `PowerCard` for each one within a responsive grid layout.

3.  **Add Styles:**
    *   I will add the necessary SASS styles for both `PowerCard` and `PowerCardList` directly into the `src/styles/_components.scss` file to match the design from the sketch, ensuring they are responsive and theme-aware (dark/light mode).

4.  **Update `App.tsx`:**
    *   I will replace the `PowerTable` component with the new `PowerCardList` component.
    *   I will pass the already sorted and filtered `sortedPowers` array to the `PowerCardList`.

5.  **Prepare for Future Sorting UI:**
    *   The user mentioned that the sorting UI will be added to the `FilterPanel` later. To prepare for this, I will update the `FilterPanel` component's props to accept `requestSort` and `sortConfig`, and I will pass these props from `App.tsx`.
