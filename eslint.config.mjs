import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Define __filename and __dirname to resolve paths correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a compatibility instance for ESLint configuration
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend ESLint configuration with specific rules
const eslintConfig = [
  // Extending base Next.js and TypeScript configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override rules
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable the 'no-explicit-any' rule
      "@typescript-eslint/no-unused-vars": "off", // Disable the 'no-unused-vars' rule
      "react-hooks/rules-of-hooks": "off", // Disable React hook rules (if needed)
      "react-hooks/exhaustive-deps": "off", // Disable exhaustive deps rule for useEffect
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-empty-object-type": "off"
    },
  },
];

export default eslintConfig;
