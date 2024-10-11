/** @type {import('next').NextConfig} */
const nextConfig = {
    // https://linked-posts.routemisr.com/uploads/default-profile.png
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "linked-posts.routemisr.com",
        pathname: "/uploads/*",
      },
    ],
  },
};

export default nextConfig;
