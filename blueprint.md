# SWADE Powers Filter Application

## Overview

This is a React application designed to help users browse and filter through a list of powers from the Savage Worlds Adventure Edition (SWADE) role-playing game. The application provides a user-friendly interface with robust filtering and sorting capabilities to make finding the right power quick and easy.

## Key Features

*   **Power Listing:** Displays a comprehensive list of SWADE powers in a clear and organized table.
*   **Filtering:** Allows users to filter powers by various criteria, including:
    *   Rank
    *   Power Points
    *   Arcane Background
    *   Domain
    *   Duration
*   **Sorting:** Enables users to sort the power list by different columns.
*   **Search:** Provides a search bar for quickly finding specific powers.
*   **Dark/Light Mode:** Includes a theme toggler for user preference.

## Current Task: Hide Numerical Prefix in Rank Display

### Plan

1.  **Modify `src/components/FilterPanel/filters/RankFilter.tsx`:**
    *   Create a helper function `getDisplayRank` to extract only the descriptive part of the rank (e.g., "Novice" from "1 Novice").
    *   Use this helper function to set the `label` for each `FormControlLabel` in the filter options.

2.  **Modify `src/components/PowerTable/index.tsx`:**
    *   Add a similar `getDisplayRank` helper function.
    *   Use this function to display the rank in the "Rank" `TableCell`.

3.  **Verify `src/hooks/useSorting.ts`:** Confirm that `useSorting` correctly sorts based on the `power.rank` (the full string), ensuring the numerical order is preserved.

### Implemented Functionality (Previous Iterations)

*   **Component Refactoring:** `FilterPanel` was split into `RankFilter`, `DurationFilter`, `ArcaneBackgroundFilter`, and `DomainFilter` sub-components.
*   **Shared Types:** `Filters` and `FilterOptions` interfaces were moved to `src/types/filters.ts`.
*   **Arcane Background Sub-filters:** Implemented special functionality for "ELEMENTALIST" and "SUMMONER" filters with conditional sub-type selection.
*   **Duration Filter "Any" Option:** Added an "Any" option to the Duration filter for clearing all duration selections.
