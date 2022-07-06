/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;
module.exports = {
  reactStrictMode: true,
  // 브라우저상에서 소스의 경로를 목적지의 경로로 바꾸어버림
  async redirects() {
    return [
      {
        source: "/contact/:path*",
        destination: "/form/:path*",
        permanent: false, // redirection이 permanent(영구적)인지에 따라 브라우저 or 검색엔진이 이 정보를 기억하는가;
      },
    ];
  },
  // 브라우저상에서 소스의 경로를 유지한 채 목적지의 경로로 바꾸어버림
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

/**
   [NextJS에서 "npm run build" 를 해도 build 디렉토리가 생성되지 않을때]
   Look for a directory named .next which is the default the build command outputs to.
   You can set a custom directory (for example build) by adding it to the distDir key in next.config.js:
   https://stackoverflow.com/questions/72077860/why-i-cant-find-out-build-folder-after-runing-npm-run-build-on-a-nextjs-project
*/
/*
const nextConfig = {
  distDir: "build",
};
module.exports = nextConfig;
*/
