const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const questionRoute = require('./routes/question');
const responseRoute = require('./routes/response')
const authRoute = require('./routes/auth')


app.use(cookieParser());
// Connect to the database
const connectDb = async () => {
  await mongoose.connect('mongodb://localhost/api', { useNewUrlParser: true }).then(
      () => {
          console.info(`Connected to database`)
      },
      error => {
          console.error(`Connection error: ${error.stack}`)
          process.exit(1)
      }
  )
}

connectDb().catch(error => console.error(error))

app.use(express.json())


app.get("/",(req,res)=>{
  res.status(200).json("app is running....")
})
app.use("/api/auth", authRoute);
app.use("/api/questions/", questionRoute);
app.use("/api/responses/", responseRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
