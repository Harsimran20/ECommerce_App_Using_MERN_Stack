const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
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

