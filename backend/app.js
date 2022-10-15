const mongoose =require("mongoose");
const express = require("express")
const app = express();
const toDoRoute = require("./routes/toDoRoute")
const listRoute = require("./routes/ListRoute")
const bodyParser = require("body-parser")
const listModel = require("./models/ListModel")
const userRoute = require("./routes/UserRoute")
require('dotenv').config();

const cors = require("cors");

app.use(cors());

app.use(bodyParser.json())

// allow the user in the frontend to consume the APIs that you have created without any problem of CORS errors
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
}); */




app.use("/",toDoRoute)
app.use("/list/", listRoute)
app.use("/user", userRoute)
//middelware 
app.use('/', ()=>{
  console.log("this is middelware yaani kiiii n7il lhome page howa yeexcutiii au meme temps ")
})


mongoose
    .connect(process.env.DB_CONNECT ,() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});



 


 async function run(name){
  try {
    const l = new listModel({
      name:name,
     })
     const find =  await listModel.findByName(name)
     if(find.length===0){
      l.save()
     }

  } catch (error) {
    console.log(error)
  }
 }
 run("Shopping")
 run("Design")
 run("Work")
 run("Fitness")
 run("Movies")
 run("Food")
 run("Music")
 run("Idea")
 run("Coding")



/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  */
  // error handler
 /* app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });*/
app.listen(3001)
