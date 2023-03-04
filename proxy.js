const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy the Yelp search request
app.use(
  "/yelp-search",
  createProxyMiddleware({
    target: "https://www.yelp.com",
    changeOrigin: true,
    pathRewrite: {
      "^/yelp-search": "/search",
    },
    onProxyReq(proxyReq) {
      proxyReq.setHeader("Referer", "https://www.yelp.com/");
    },
  })
);

// Serve the React app
app.use(express.static("build"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
