const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse JSON
app.use(express.json()); 
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Message is sent");
});
app.listen(PORT,()=>{
  console.log("SERVER IS RUNNING...")
})
//Routes
app.use('/user',require('./routes/useRouter'))
//Connect MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("MongoDB Connected")
}).catch(err=>{
  console.log(err)
})

