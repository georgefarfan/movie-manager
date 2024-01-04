const PROXY_CONFIG = [
  {
    context: ["https://www.omdbapi.com/**"],
    target: "http://localhost:3000",
    secure: false,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
