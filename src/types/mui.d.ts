// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    filterPanel?: string;
  }
  interface Palette {
    card: {
      header: string;
      body: string;
      border: string;
      rankBorder: string;
      rankBg: string;
    },
    search: {
      primary: string;
      border: string;
    }
  }
  interface PaletteOptions {
    card?: {
      header?: string;
      body?: string;
      border?: string;
      rankBorder?: string;
      rankBg?: string;
    },
    search: {
      primary?: string;
      border?: string;
    }
  }
}
