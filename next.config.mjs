/** @type {import('next').NextConfig} */
const nextConfig = {
  // compiler: {
  //   removeConsole: { exclude: ['error'] },
  // },
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
    return config;
  },
};

export default nextConfig;
