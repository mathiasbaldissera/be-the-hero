const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const { errors } = require("celebrate");
app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errors());

app.listen(3333);
