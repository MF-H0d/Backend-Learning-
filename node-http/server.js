const http = require("http");

const hostname = "localhost";
const port = 3000;

const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(`Request for ${res.url} by method ${req.method}`);

  if (req.method === "GET") {
    let fileUrl = req.url;
    if (fileUrl === "/") {
      fileUrl = "/index.html";
    }
    const filepath = path.resolve("./public" + fileUrl);
    const fileExt = path.extname(filepath);
    if (fileExt === ".html") {
      fs.access(filepath, (err) => {
        if (err) {
          res.statusCode = 404;
          res.setHeader("content-type", "text/html");
          res.end(
            `<html><body><h1>Error 404: ${fileUrl} was not found</h1></body></html>`
          );
          return;
        }
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");
        fs.createReadStream(filepath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("content-type", "text/html");
      res.end(
        `<html><body><h1>Error 404: ${fileUrl} is not an html file</h1></body></html>`
      );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("content-type", "text/html");
    res.end(
      `<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`
    );
  }
});

server.listen(port, () =>
  console.log(`server running at http://${hostname}:${port}`)
);
console.log(global);
