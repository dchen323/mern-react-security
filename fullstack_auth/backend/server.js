const express = require("express");
const bodyParser = require("body-parser");

const user = require("./user");

const app = express();

app.use(bodyParser.json());
app.use("/user", user);

/* Moved functionality to bash script
const port = 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
*/

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 404;

  res.status(err.statusCode).json({ type: "error", message: err.message });
});

module.exports = app;
