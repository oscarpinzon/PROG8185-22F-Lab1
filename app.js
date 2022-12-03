const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

mongoose.connect(
  "mongodb://localhost:27017/LabDec",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {});

app.use(
  session({
    secret: "labwork",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

//add body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//add static files
app.use(express.static(path.join(__dirname, "public")));
//add the router
app.use("/", router);
//add port
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  //__dirname : It will resolve to your project folder.
});

router.post("/register", function (req, res) {
  const { username, email, password, phoneNumber } = req.body;
  // encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  // set cookie
  const userObject = { username, email, password: hash, phoneNumber };
  const jsonObject = JSON.stringify(userObject);
  res.cookie("user", jsonObject, { maxAge: 900000, httpOnly: true });
  console.log("Cookie set");
  // print json object
  console.log(userObject);
  res.end();
});
