const express = require("express");
const Connection = require("./database/dbConnection");
const router = require("./router/auth");
const PORT = process.env.PORT

const app = express();

Connection();
app.use(express.json());
app.use(require("./router/auth"));

app.listen(PORT);
