const express = require("express");
const path = require("path");
require("./db/conn"); // to tell app.js about connection with mongoose database.
const User = require("./models/usermessage");

const hbs = require("hbs");
const { registerPartials } = require("hbs");

const app = express(); // we can use now all the methods and properties from express in app.
const port = process.env.PORT || 3000; // we want nodemon to run both js and hsb files

//setting the path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

//linking bootstrap,jquery etc.
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

app.use(express.urlencoded({ extended: false }));
//middleware
app.use(express.static(staticpath));

app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

//routing
//app.get(path,callback)
app.get("/", (req, res) => {
  res.render("index"); //routing for index for first page.
}); //fat arrow function

app.post("/contact", async (req, res) => {
  try {
    //res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/index", (req, res) => {
  res.render("index"); //Routing for Index
});
//server create
app.listen(port, () => {
  console.log(`server is running at port no${port}`);
});
