// next.config.js
const { withExpo } = require("@expo/next-adapter");

module.exports = withExpo({
  reactStrictMode: true,
  // Next.js 13.1 以降では transpilePackages オプションが利用可能
  transpilePackages: ["react-native", "expo"],
  experimental: {
    forceSwcTransforms: true,
  },
});
