const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dbconnect = require("./dbconnect.js");
const dotenv = require('dotenv');
dotenv.config('./.env');
const port = process.env.PORT;
const usersRoute = require("./routes/usersroute.js")
const booksRoute = require("./routes/booksRoute");
const issueRoute = require("./routes/issuesRoute.js")
const reportsRoute = require("./routes/reportsRoute.js")
app.use(express.json());


app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/issues", issueRoute);
app.use("/api/reports", reportsRoute)

// main().then((res) =>{
//     console.log("connection succefull")
// })

// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/booksleansheads");
// }


dbconnect;

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})