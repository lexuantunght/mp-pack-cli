import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import commonjs from "vite-plugin-commonjs";
import path from "path";

function getDependencies() {
  const packageJson = require(path.join(process.cwd(), `package.json`));
  return Object.keys({
    ...(packageJson.dependencies || []),
    ...(packageJson.devDependencies || []),
  });
}

function getPlatform() {
  return JSON.stringify(process.env.PLATFORM || "web");
}

function getIsDev() {
  return process.env.NODE_ENV == "development";
}

export default defineConfig({
  base: "./",
  plugins: [
    tsconfigPaths(),
    commonjs(),
    dts({ insertTypesEntry: true, rollupTypes: true }),
  ],
  define: {
    __PLATFORM__: getPlatform(),
    __DEV__: getIsDev(),
    __WEB__: getPlatform() == "web",
    __MOBILE__: getPlatform() == "ios" || getPlatform() == "android",
    __VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    emptyOutDir: true,
    assetsInlineLimit: 0,
    copyPublicDir: true,
    minify: "esbuild",
  },
  ssr: {
    noExternal: process.env.NODE_ENV == "development" ? [] : getDependencies(),
  },
  esbuild: {
    legalComments: "none",
    keepNames: true,
  },
  clearScreen: true,
});
