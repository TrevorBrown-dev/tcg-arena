/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    reactStrictMode: true,
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config;
    },
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
    images: {
        domains: ['sponsrv2-profile-pics.s3.amazonaws.com'],
    },
};
