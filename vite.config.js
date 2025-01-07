import {
  defineConfig,
  splitVendorChunkPlugin,
  transformWithEsbuild,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

function reactVirtualized() {
  return {
    name: "wp-cli:react-virtualized",
    configResolved() {
      if (
        !require(path.join(
          process.cwd(),
          `package.json`
        )).dependencies.hasOwnProperty("react-virtualized")
      ) {
        return;
      }
      const file = require
        .resolve("react-virtualized")
        .replace(
          path.join("dist", "commonjs", "index.js"),
          path.join("dist", "es", "WindowScroller", "utils", "onScroll.js")
        );
      const code = fs.readFileSync(file, "utf-8");
      const modified = code.replace(
        `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`,
        ""
      );
      fs.writeFileSync(file, modified);
    },
  };
}

function reactJSX() {
  return {
    name: "wp-cli:treat-js-files-as-jsx",
    async transform(code, id) {
      if (!id.match(/src\/.*\.js$/)) return null;

      // Use the exposed transform from vite, instead of directly
      // transforming with esbuild
      return transformWithEsbuild(code, id, {
        loader: "jsx",
        jsx: "automatic",
      });
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [
    reactJSX(),
    react(),
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    reactVirtualized(),
  ],
  define: {
    __PLATFORM__: JSON.stringify(process.env.PLATFORM || process.platform),
    __DEV__: process.env.NODE_ENV == "development",
  },
  build: {
    outDir: path.resolve(__dirname, "build"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        entryFileNames: "js/[name].[hash].js",
        chunkFileNames: "js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          let extType = "assets";
          // if (assetInfo.name && /\.(css)$/.test(assetInfo.name)) {
          // 	extType = 'css';
          // }
          return `${extType}/[name].[hash][extname]`;
        },
      },
    },
    copyPublicDir: true,
  },
  publicDir: path.resolve(__dirname, "public"),
  esbuild: {
    legalComments: "none",
  },
  clearScreen: true,
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
