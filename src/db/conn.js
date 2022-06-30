const mongoose = require("mongoose"); //require to call mongoose connect function.
//creating a database
mongoose
  .connect("mongodb://localhost:27017/web", {})
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((error) => {
    console.log(error);
  });
