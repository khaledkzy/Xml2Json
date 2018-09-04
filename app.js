const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const parseXML = require("./parseXMLtoJSON");
const parseXMLmanually = require("./parseXMLmanually");
const extractReturnedDebitItem = require('./extractReturnedDebit');
const mongoose = require('mongoose');

const BACSDocument = require('./models/BACSDocumentSchema');
const DEBITITEM = require('./models/debitItemSchema');

require('./connection');


const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);


app.get("/XMLtoJSON", (req, res) => {
  parseXML().then(result => {
    let debit = extractReturnedDebitItem(result)
    res.send(debit);
  });
});

app.get("/XMLtoJSONmanually", (req, res) => {
  parseXMLmanually().then(result => {
    console.log("I get it here", result);
    res.send(result);
  });
});

app.get('/save', async (req, res) => {
  try {
    const parsed = await parseXML()
    //console.log('>>>>', JSON.stringify(parsed))
    const response = await BACSDocument(parsed)
    const debit = await extractReturnedDebitItem(response)
    const debitReturn = await DEBITITEM(debit)

    response.save()
    debitReturn.save()
    console.log(debitReturn)
    res.status(200).send(debitReturn)
  }
  catch (error) {
    console.log('>>>>>>' + error)
    res.status(502).send("unable to save to database");
  }
  // return db.XML.find({})
  //   .then(console.log)
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
