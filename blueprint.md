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

## Current Task: Implement Special Functionality for ELEMENTALIST and SUMMONER Filters

### Plan

1.  **Update `src/components/FilterPanel/index.tsx`:**
    *   Group all "ELEMENTALIST" and "SUMMONER" variants into single checkboxes.
    *   Introduce new state variables to hold the selected sub-type for "ELEMENTALIST" and "SUMMONER".
    *   Conditionally render a `Select` component for each of them when their corresponding checkbox is checked. These `Select` components will have a default "Any" option.
    *   Update the main filter state to include the sub-type selections.

2.  **Update `src/hooks/useFilters.ts`:**
    *   Adjust the filtering logic to handle this new, more detailed filter state.
    *   If "ELEMENTALIST" is selected with the "Any" sub-type, it will match all characters whose `arcane_background` starts with "ELEMENTALIST".
    *   If a specific sub-type like "Fire" is chosen, it will only match characters with `arcane_background` of "ELEMENTALIST (FIRE)".
    *   The same logic will apply to "SUMMONER".
