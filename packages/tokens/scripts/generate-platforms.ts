/**
 * Gera tokens de design para plataformas não-web usando Style Dictionary.
 *
 * Saídas por tema (light | dark | brand):
 *   dist/android/{tema}/colors.xml      — Android (Jetpack Compose / Views)
 *   dist/ios/{tema}/Colors.swift        — iOS (SwiftUI / UIKit)
 *   dist/flutter/{tema}/tokens.dart     — Flutter
 *   dist/react-native/{tema}/tokens.ts  — React Native
 *
 * Uso:
 *   pnpm --filter @design-system/tokens generate:platforms
 */
import StyleDictionary from "style-dictionary";
import { lightColors, darkColors, brandColors } from "../src/themes";
import { toSDTokens } from "../src/transformers/sd-adapter.ts";
import type { ThemeColors } from "../src/themes";

const themes: Array<{ name: string; colors: ThemeColors }> = [
  { name: "light", colors: lightColors },
  { name: "dark", colors: darkColors },
  { name: "brand", colors: brandColors },
];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function main() {
  for (const { name, colors } of themes) {
    const sd = new StyleDictionary({
      tokens: toSDTokens(colors),
      platforms: {
        android: {
          transformGroup: "android",
          buildPath: `dist/android/${name}/`,
          files: [
            {
              destination: "colors.xml",
              format: "android/colors",
            },
          ],
        },

        ios: {
          transformGroup: "ios-swift",
          buildPath: `dist/ios/${name}/`,
          files: [
            {
              destination: "Colors.swift",
              format: "ios-swift/enum.swift",
              options: {
                className: `DS${capitalize(name)}Colors`,
              },
            },
          ],
        },

        flutter: {
          transformGroup: "flutter",
          buildPath: `dist/flutter/${name}/`,
          files: [
            {
              destination: "tokens.dart",
              format: "flutter/class.dart",
              options: {
                className: `DS${capitalize(name)}Tokens`,
              },
            },
          ],
        },

        reactNative: {
          transforms: ["attribute/cti", "name/camel", "color/css"],
          buildPath: `dist/react-native/${name}/`,
          files: [
            {
              destination: "tokens.ts",
              format: "javascript/es6",
            },
          ],
        },
      },
    });

    await sd.buildAllPlatforms();
    console.log(`✅ ${name}: android · ios · flutter · react-native`);
  }

  console.log("\n📦 Tokens multi-plataforma gerados em packages/tokens/dist/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
