const express = require("express");

const server = express();

server.get("/health",(req, res) => {
    res.send("server is running");
})

const port = 3000;

server.listen(port, () => {
    console.log(`server is running`);
})