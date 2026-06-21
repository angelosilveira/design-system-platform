import { useEffect, type ReactNode } from "react";

export type Theme = "light" | "dark" | "brand";

export interface ThemeProviderProps {
  /** Tema ativo. Padrão: "light". */
  theme?: Theme;
  children: ReactNode;
}

/**
 * ThemeProvider — aplica o tema via `data-theme` no `<html>`.
 *
 * Funciona com o CSS gerado pelo Token Manager:
 *   [data-theme="dark"] { --ds-color-primary: #4C9AFF; ... }
 *
 * Uso:
 *   <ThemeProvider theme="dark">
 *     <App />
 *   </ThemeProvider>
 */
export function ThemeProvider({ theme = "light", children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    return () => root.removeAttribute("data-theme");
  }, [theme]);

  return <>{children}</>;
}
