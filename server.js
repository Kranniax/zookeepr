const express = require("express");
const fs = require("fs");
const path = require("path");
// routes middlewares 
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Once this server is placed on a host, the host will select the most appropriate port.
const PORT = process.env.PORT || 3001;

// Instantiate the express server.
const app = express();

//Informing the server that the "public" folder contains static files. This is needed
// if we are forwarding javascript, css or html files to the client.
app.use(express.static("public"));

// parse incomming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incomming JSON data
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log("API server now on port 3001!");
});
