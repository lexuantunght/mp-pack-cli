import {
  defineConfig,
  splitVendorChunkPlugin,
  transformWithEsbuild,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import fs from "fs";

function reactVirtualized() {
  return {
    name: "mp-pack-cli:react-virtualized",
    configResolved() {
      let modified = null;
      let file = null;
      try {
        file = require
          .resolve("react-virtualized")
          .replace(
            path.join("dist", "commonjs", "index.js"),
            path.join("dist", "es", "WindowScroller", "utils", "onScroll.js")
          );
        const code = fs.readFileSync(file, "utf-8");
        modified = code.replace(
          `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`,
          ""
        );
      } catch {
        modified = null;
        file = null;
      }
      if (modified && file) {
        fs.writeFileSync(file, modified);
      }
    },
  };
}

function reactJSX() {
  return {
    name: "mp-pack-cli:treat-js-files-as-jsx",
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
    reactJSX(),
    react(),
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    commonjs(),
    reactVirtualized(),
    svgr({ include: "**/*.svg?react" }),
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
  publicDir: path.resolve(process.cwd(), "public"),
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
