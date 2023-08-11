const express = require("express");
const cors = require("cors");
const{ dbConnect } = require("./config/db");
const Router = require("./Routes/route");
const app = express();
const PORT = 4000;



app.use("/api/v1/users",Router);
app.use(express.json());
app.use(cors({origin: 'http:localhost:3001', credentials: true}));
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

dbConnect();
app.listen(() => console.log(`Server running on port ${PORT}`));
