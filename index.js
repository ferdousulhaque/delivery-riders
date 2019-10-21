'use strict';

// Imports dependencies and set up http server
const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');

// creates express http server
const app = express().use(body_parser.json());

// parse application/json
app.use(body_parser.json())

// Development environment variables
require('dotenv').config();

// Routes for the application
const rider_routes = require('./routes/rider-routes');

// Sets server port and logs message on success
app.listen(process.env.PORT || 8081, () => console.log('webhook is listening to '+process.env.PORT));
//let token = process.env.FB_TOKEN;

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(logger('dev'));

app.use('/riders/', rider_routes);