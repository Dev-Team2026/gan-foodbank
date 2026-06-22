const express = require("express");
const server = express();
const port = 3000;

server.listen(port, () => {
      console.log(`Database is connected\nServer is listening on ${port}`);
      console.log(new Date(Date.now()));
    });

server.get("/", (request, response) => {
  response.send("Server is Live!");
});