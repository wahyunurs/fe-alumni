/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    reactStrictMode: false,
    basePath: '/Alumni',
    async redirects(){
        return [
            {
                source: '/',
                destination: '/auth',
                permanent: true
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'alumni-api.dionavedo.my.id',
                port: '',
                pathname: '/storage/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/storage/**',
            },
            
        ]
    }
};

export default nextConfig;
