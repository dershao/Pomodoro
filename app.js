const loadenv = require("./utils/loadenv")();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const redisClient = require("./config/redis-client");

//port number
const PORT = process.env.PORT || 5000;

mongoose.Promise = require("bluebird");

mongoose.connect(process.env.MONGO_DB, {
    useMongoClient: true
}).then(() => {
    console.info("Connection with database established...");
}, (err) => {
    console.error(`Error connecting to database: ${err}`);
});

//express app
const app = express();

//template engine
app.set("view engine", "ejs");

//encrypt the cookie with a specify length of time
app.use(session({
    cookie: {maxAge: 24 * 60 * 60 * 1000},
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_KEY,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//initializes passport
app.use(passport.initialize());
app.use(passport.session());

//body parser
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

//use static files at specified directory
app.use(express.static("./public"));
app.use("/", require("./controllers"));

//listen to port number
app.listen(PORT);
console.log("Listening to port %s...",  PORT);
