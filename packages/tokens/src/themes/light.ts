export const lightColors = {
  primary: { DEFAULT: "#0052CC", hover: "#0747A6", subtle: "#DEEBFF" },
  secondary: { DEFAULT: "#00AEEF", hover: "#0098D1", subtle: "#E0F7FF" },
  danger: { DEFAULT: "#DE350B", hover: "#BF2600", subtle: "#FFEBE6" },
  success: { DEFAULT: "#00875A", hover: "#006644", subtle: "#E3FCEF" },
  warning: { DEFAULT: "#FF8B00", hover: "#FF991F", subtle: "#FFF7E6" },
  surface: { DEFAULT: "#FFFFFF", subtle: "#F7F8F9", inverse: "#091E42" },
  border: { DEFAULT: "#DFE1E6", strong: "#A5ADBA" },
  text: { DEFAULT: "#172B4D", subtle: "#5E6C84", inverse: "#FFFFFF", disabled: "#A5ADBA" },
} as const;

export type ThemeColors = typeof lightColors;
