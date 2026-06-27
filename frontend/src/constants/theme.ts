/**
 * Theme updated for MilkEnRte: White & Golden milk-inspired theme
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Milk-inspired whites and soft creams
    text: '#2C1810', // Rich chocolate brown like dark chocolate
    background: '#FFFFFF', // Pure white like fresh pasteurized milk
    backgroundElement: '#FEFBF7', // Warm cream like fresh cream foam
    backgroundSelected: '#FFF8E7', // Light golden tint like milk with honey
    textSecondary: '#8B6F47', // Soft golden brown like caramelized milk
    primary: '#D4AF37', // Rich golden like premium dairy gold label
    accent: '#FFD700', // Bright golden yellow for calls-to-action
    white: '#FFFFFF', // Pure white
    border: '#F5E6CC', // Warm caramel like milk toffee
  },
  dark: {
    // Creamy dark mode with golden highlights
    text: '#FFFFF0', // Ivory white like condensed milk
    background: '#1A1A1A', // Dark milk chocolate for contrast
    backgroundElement: '#2A2520', // Warm brown with golden undertones
    backgroundSelected: '#403522', // Rich golden brown like butterscotch
    textSecondary: '#D4AF37', // Soft gold like premium quality seal
    primary: '#FFD700', // Bright golden yellow for primary elements
    accent: '#FFA500', // Orange-gold like cream with saffron
    white: '#FFFFF0', // Ivory white
    border: '#4A4239', // Dark caramel border color
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded', // Rounded font matches milk theme softness
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 1200;

