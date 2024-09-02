const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // menangkap application/x-www-form-urlencoded => req.body
app.use("/", express.static("public")); // root
app.use("/uploads", express.static("uploads")); // root
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
