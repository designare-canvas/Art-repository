require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const schema = require('./database/schema');

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8080;


app.listen(port, () => console.log(`Listening on port ${port}..`));