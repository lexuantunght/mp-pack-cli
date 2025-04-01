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

function getPlatform() {
  return JSON.stringify(process.env.PLATFORM || "web");
}

function getIsDev() {
  return process.env.NODE_ENV == "development";
}

function getDefinedFlags() {
  if (process.env.FLAGS) {
    const flags = process.env.FLAGS.split(",")
      .map((flag) => flag.split("="))
      .map(([k, v]) => [
        k,
        v === "true" ? true : v === "false" ? false : isNaN(v) ? v : Number(v),
      ]);
    return Object.fromEntries(flags);
  }
  return {};
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
    __PLATFORM__: getPlatform(),
    __DEV__: getIsDev(),
    __WEB__: getPlatform() == "web",
    __MOBILE__: getPlatform() == "ios" || getPlatform() == "android",
    __VERSION__: JSON.stringify(process.env.npm_package_version),
    ...getDefinedFlags(),
  },
  build: {
    emptyOutDir: true,
    assetsInlineLimit: 0,
    copyPublicDir: false,
    ssr: true,
    minify: "esbuild",
    rollupOptions: {
      plugins: [],
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
