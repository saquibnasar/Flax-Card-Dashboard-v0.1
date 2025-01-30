/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.PROTOCOL,
        hostname: process.env.HOSTNAME,
      },

      {
        protocol: "https",
        hostname: "prod-dashboard-profile-pictures-new.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "prod-dashboard-banner-images-new.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "prod-dashboard-profile-pictures.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "prod-dashboard-banner-images.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "prod-dashboard-pdf-files.s3.amazonaws.com",
      },
    ],
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
    };

    return config;
  },
};

module.exports = nextConfig;
