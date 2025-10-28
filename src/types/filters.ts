export interface ArcaneBackgroundFilter {
  [key: string]: string | boolean;
}

export interface Filters {
  rank?: string[];
  powerPoints?: number[];
  arcane_background?: ArcaneBackgroundFilter;
  domain?: string[];
  duration?: string[];
}

export interface FilterOptions {
  ranks: string[];
  powerPoints: number[];
  arcaneBackgrounds: string[];
  domains: string[];
  durations: string[];
}
