import type { Config } from "@react-router/dev/config";
import { getPages } from "@devgateway/wp-react-lib";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // TODO: Enable lazy route discovery behind a proxy
  routeDiscovery: {
    mode: "initial",
  },
  prerender: [
    // add routes that can be prerendered here. The pages should be static.
  ],
  future: {

  }
} satisfies Config;
