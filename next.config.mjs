/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {domains: ['img.youtube.com']},
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

export default nextConfig;
