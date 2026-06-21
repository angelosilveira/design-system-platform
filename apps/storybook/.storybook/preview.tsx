import React, { useEffect } from "react";
import type { Preview, Decorator } from "@storybook/react";
import "./tailwind.css";

type Theme = "light" | "dark" | "brand";

const ThemeDecorator: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? "light") as Theme;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    return () => root.removeAttribute("data-theme");
  }, [theme]);

  return (
    <div style={{ background: "var(--ds-color-surface)", padding: "1.5rem", minHeight: "100vh" }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [ThemeDecorator],
  globalTypes: {
    theme: {
      description: "Tema global do Design System",
      defaultValue: "light",
      toolbar: {
        title: "Tema",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "brand", title: "Brand", icon: "heart" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: "#storybook-root",
      config: {},
      options: {},
      manual: false,
    },
  },
};

export default preview;
