const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require('body-parser');
const dbConnection = require("./config/dbConnection")
const cookieParser = require("cookie-parser")

dotenv.config()

const app = express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use("/", require("./routes/userRoutes"))



dbConnection()

const port = process.env.PORT || 4040;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})