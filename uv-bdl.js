var { createServer } = require("node:http");
var express = require('express');
var createBareServer = require("@tomphttp/bare-server-node");
var { uvPath } = require("@titaniumnetwork-dev/ultraviolet");

const bare = createBareServer("/bare/");
const app = express();

app.use(express.static(__dirname));
app.use("/uv/", express.static(uvPath));

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.listen({
  port: 8080,
});