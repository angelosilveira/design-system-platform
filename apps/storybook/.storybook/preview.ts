import type { Preview } from "@storybook/react";
import "./tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Garante que o addon-a11y rode em todas as stories por padrão,
    // sem precisar configurar isso individualmente em cada arquivo.
    a11y: {
      element: "#storybook-root",
      config: {},
      options: {},
      manual: false,
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#FFFFFF" },
        { name: "subtle", value: "#F7F8F9" },
      ],
    },
  },
};

export default preview;
