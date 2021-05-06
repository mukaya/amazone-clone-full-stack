const express = require("express");
const morgan = require("morgan");
const PORT = 3000;

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("Hello word");
});

app.post("/", (req, res) => {
  res.json("On post");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is open on port ${PORT}`);
  }
});
