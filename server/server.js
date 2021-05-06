const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();

mongoose.connect(
  "mongodb+srv://osee:osee@cluster0.kahm9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connexion succeffully in database");
    }
  }
);

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
