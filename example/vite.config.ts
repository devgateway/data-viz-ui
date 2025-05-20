import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import Environment from 'vite-plugin-env-compatible';
import commonjs from 'vite-plugin-commonjs'

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    nodePolyfills({
      include: ["querystring"]
    }),
    // @ts-ignore
    Environment({
      prefix: "VITE_",
    }),
    // @ts-ignore
    commonjs(),
  ],
  optimizeDeps: {
    include: [
      "@devgateway/wp-react-lib",
      "semantic-ui-react",
      "@nivo/*",
    ]
  },
});
