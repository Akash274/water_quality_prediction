const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const wmlRouter = require("./routers/api/wml");
app.use("/api/wml",wmlRouter);

const port = process.env.PORT || 8080;
app.listen(port, () =>{
    console.log('Server listening at port ${port}');
});