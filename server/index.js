if (typeof window === 'undefined') {
  global.window = {};
}
const fs = require("fs");
const path = require("path");
const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/search-server");

const template = fs.readFileSync(path.join(__dirname, "../dist/search.html"), "utf-8");

const renderMarkup = (content) => {
  const data = require("./data");

  return template.replace("<!--HTML_PLACEHOLDER-->", content)
    .replace("<!--INITIAL_DATA_PLACEHOLDER-->", JSON.stringify(data, null, 2));
};

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
