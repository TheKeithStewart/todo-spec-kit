/**
 * Design Tokens for StackDay Design System
 * Based on Tailwind CSS color palette with semantic naming
 */
export declare const colors: {
  readonly primary: {
    readonly 50: '#eff6ff';
    readonly 100: '#dbeafe';
    readonly 200: '#bfdbfe';
    readonly 300: '#93c5fd';
    readonly 400: '#60a5fa';
    readonly 500: '#3b82f6';
    readonly 600: '#2563eb';
    readonly 700: '#1d4ed8';
    readonly 800: '#1e40af';
    readonly 900: '#1e3a8a';
    readonly 950: '#172554';
  };
  readonly success: {
    readonly 50: '#f0fdf4';
    readonly 500: '#22c55e';
    readonly 700: '#15803d';
  };
  readonly warning: {
    readonly 50: '#fefce8';
    readonly 500: '#eab308';
    readonly 700: '#a16207';
  };
  readonly error: {
    readonly 50: '#fef2f2';
    readonly 500: '#ef4444';
    readonly 700: '#b91c1c';
  };
  readonly info: {
    readonly 50: '#eff6ff';
    readonly 500: '#3b82f6';
    readonly 700: '#1d4ed8';
  };
  readonly gray: {
    readonly 50: '#f9fafb';
    readonly 100: '#f3f4f6';
    readonly 200: '#e5e7eb';
    readonly 300: '#d1d5db';
    readonly 400: '#9ca3af';
    readonly 500: '#6b7280';
    readonly 600: '#4b5563';
    readonly 700: '#374151';
    readonly 800: '#1f2937';
    readonly 900: '#111827';
    readonly 950: '#030712';
  };
  readonly white: '#ffffff';
  readonly black: '#000000';
  readonly transparent: 'transparent';
};
export declare const typography: {
  readonly fontFamily: {
    readonly sans: readonly ['Inter', 'system-ui', 'sans-serif'];
    readonly mono: readonly ['Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'];
  };
  readonly fontSize: {
    readonly xs: '0.75rem';
    readonly sm: '0.875rem';
    readonly base: '1rem';
    readonly lg: '1.125rem';
    readonly xl: '1.25rem';
    readonly '2xl': '1.5rem';
    readonly '3xl': '1.875rem';
    readonly '4xl': '2.25rem';
    readonly '5xl': '3rem';
  };
  readonly fontWeight: {
    readonly light: 300;
    readonly normal: 400;
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
  };
  readonly lineHeight: {
    readonly tight: 1.25;
    readonly normal: 1.5;
    readonly relaxed: 1.75;
  };
};
export declare const spacing: {
  readonly 0: '0';
  readonly 1: '0.25rem';
  readonly 2: '0.5rem';
  readonly 3: '0.75rem';
  readonly 4: '1rem';
  readonly 5: '1.25rem';
  readonly 6: '1.5rem';
  readonly 8: '2rem';
  readonly 10: '2.5rem';
  readonly 12: '3rem';
  readonly 16: '4rem';
  readonly 20: '5rem';
  readonly 24: '6rem';
};
export declare const borderRadius: {
  readonly none: '0';
  readonly sm: '0.125rem';
  readonly base: '0.25rem';
  readonly md: '0.375rem';
  readonly lg: '0.5rem';
  readonly xl: '0.75rem';
  readonly '2xl': '1rem';
  readonly full: '9999px';
};
export declare const shadows: {
  readonly sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)';
  readonly base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
  readonly md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
  readonly lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)';
  readonly xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
  readonly none: 'none';
};
export declare const transitions: {
  readonly fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)';
  readonly base: '200ms cubic-bezier(0.4, 0, 0.2, 1)';
  readonly slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)';
};
export declare const breakpoints: {
  readonly sm: '640px';
  readonly md: '768px';
  readonly lg: '1024px';
  readonly xl: '1280px';
  readonly '2xl': '1536px';
};
export declare const zIndex: {
  readonly dropdown: 1000;
  readonly sticky: 1020;
  readonly fixed: 1030;
  readonly modalBackdrop: 1040;
  readonly modal: 1050;
  readonly popover: 1060;
  readonly tooltip: 1070;
};
export type Color = keyof typeof colors;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadows;
//# sourceMappingURL=index.d.ts.map
