// vue.config.js
module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 必须与后端端口一致
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // 正确移除前缀
      },
    },
  },
};
