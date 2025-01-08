import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import path from "path";

function getDependencies() {
  const packageJson = require(path.join(process.cwd(), `package.json`));
  return Object.keys({
    ...(packageJson.dependencies || []),
    ...(packageJson.devDependencies || []),
  });
}

export default defineConfig({
  base: "./",
  plugins: [
    tsconfigPaths(),
    commonjs(),
    babel({
      exclude: ["node_modules", "**/node_modules/*"],
      extensions: [".js", ".ts", ".jsx", ".tsx"],
      babelHelpers: "bundled",
    }),
  ],
  define: {
    __PLATFORM__: JSON.stringify(process.env.PLATFORM || process.platform),
    __DEV__: process.env.NODE_ENV == "development",
  },
  build: {
    outDir: path.resolve(process.cwd(), "build"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    copyPublicDir: false,
    ssr: true,
    minify: "esbuild",
    target: "es5",
    rollupOptions: {
      output: {
        strict: false,
      },
    },
  },
  ssr: {
    target: "node",
    noExternal: process.env.NODE_ENV == "development" ? [] : getDependencies(),
  },
  esbuild: {
    legalComments: "none",
  },
});
