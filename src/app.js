const express = require("express");
const app = express();

// /test is a route which can be added here
app.use("/test", (req, res) => {
  res.send("Hello, World!");
});

app.use("/", (req, res) => {
    res.send("Hello, World!");
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
