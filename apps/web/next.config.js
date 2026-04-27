import { realpathSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const twAnimatePath = realpathSync(
  join(__dirname, "../../node_modules/tw-animate-css/dist/tw-animate.css")
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      "tw-animate-css": twAnimatePath,
      "tw-animate-css/dist/tw-animate.css": twAnimatePath,
    },
  },
};

export default nextConfig;
