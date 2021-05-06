const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config();
const app = express();

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connexion succeffully in database");
    }
  }
);
//Middlewares
app.use(express.static('uploads'))
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//require apis
const productsRouters = require("./routes/product")
const categoryRouters = require("./routes/category")
const ownerRouters = require("./routes/owner")

app.use("/api/", productsRouters)
app.use("/api/", categoryRouters)
app.use("/api/", ownerRouters)

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is open on port ${process.env.PORT}`);
  }
});
