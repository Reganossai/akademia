const express = require("express");
const cors = require("cors");
const{ dbConnect } = require("./config/db");
const Router = require("./Routes/route");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const PORT = 4000;
dotenv.config()

app.use(express.json());
app.use(cors({origin: 'http:localhost:3001', credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
dbConnect();
app.use("/api/v1/users",Router);


app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
