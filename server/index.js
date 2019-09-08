if (typeof window === 'undefined') {
  global.window = {};
}

const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/search-server");

const renderMarkup = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="root">${content}</div>
</body>
</html>
`;

const server = (port) => {
  const app = express();
  app.use(express.static('dist'));

  app.get("/search", (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log(`server is running listen to the port: ${port}`);
  });
};


server(process.env.PORT || 3000);
