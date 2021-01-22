const express = require("express");
const controller = require("./controller");

const app = express();

// initialize middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// default route
app.get("/", async (req, res, next) => {
  res.send("Hello from express");
});

app.get("/api/rates", controller);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
