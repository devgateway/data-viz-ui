import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import Environment from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    nodePolyfills({
      include: ["querystring"]
    }),
    Environment({
      prefix: "VITE_",
    }),
  ],
  optimizeDeps: {
    include: [
      "@devgateway/wp-react-lib",
      "semantic-ui-react",
      "@nivo/*",
    ]
  },
});
