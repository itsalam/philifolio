/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "github.com",
      "images.unsplash.com",
      "res.cloudinary.com",
      "source.unsplash.com",
      "picsum.photos",
      "cdn.sanity.io",
    ],
  },
  experimental: {
    mdxRs: true,
  },
};

export default nextConfig;
