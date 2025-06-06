import type { Config } from "@react-router/dev/config";
import { getPages } from "@devgateway/wp-react-lib/api";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // prerender: ["/", "/en", "/en/home"],
  future: {

  }
} satisfies Config;
