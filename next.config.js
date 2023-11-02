/** @type {import('next').NextConfig} */

const { withAxiom } = require("next-axiom");
module.exports = withAxiom({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
      },
    ],
  },
});
