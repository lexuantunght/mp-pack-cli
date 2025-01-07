import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";
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
  plugins: [tsconfigPaths(), commonjs()],
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
  },
  ssr: {
    target: "node",
    noExternal: process.env.NODE_ENV == "development" ? [] : getDependencies(),
  },
});
