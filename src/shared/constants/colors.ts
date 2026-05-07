export const COLORS = {
  // Primary
  primary: "#a73300",
  onPrimary: "#ffffff",
  primaryContainer: "#d24300",
  onPrimaryContainer: "#fffbff",
  primaryFixed: "#ffdbd0",
  primaryFixedDim: "#ffb59d",
  onPrimaryFixed: "#390c00",
  onPrimaryFixedVariant: "#832600",

  // Secondary
  secondary: "#5029e6",
  onSecondary: "#ffffff",
  secondaryContainer: "#694bff",
  onSecondaryContainer: "#f3eeff",
  secondaryFixed: "#e5deff",
  secondaryFixedDim: "#c8bfff",
  onSecondaryFixed: "#190064",
  onSecondaryFixedVariant: "#4104d9",

  // Tertiary
  tertiary: "#005cac",
  onTertiary: "#ffffff",
  tertiaryContainer: "#0075d8",
  onTertiaryContainer: "#fefcff",
  tertiaryFixed: "#d5e3ff",
  tertiaryFixedDim: "#a6c8ff",
  onTertiaryFixed: "#001c3b",
  onTertiaryFixedVariant: "#004787",

  // Surface / Background
  background: "#fef8f1",
  onBackground: "#1d1b17",
  surface: "#fef8f1",
  onSurface: "#1d1b17",
  surfaceVariant: "#e7e2db",
  onSurfaceVariant: "#5b4038",
  surfaceTint: "#ab3500",

  // Surface Containers
  surfaceBright: "#fef8f1",
  surfaceDim: "#dfd9d2",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f9f3ec",
  surfaceContainer: "#f3ede6",
  surfaceContainerHigh: "#ede7e0",
  surfaceContainerHighest: "#e7e2db",

  // Inverse
  inverseSurface: "#32302c",
  inverseOnSurface: "#f6f0e9",
  inversePrimary: "#ffb59d",

  // Error
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",

  // Outline
  outline: "#907066",
  outlineVariant: "#e4beb2",
} as const;

export type AppColors = typeof COLORS;
