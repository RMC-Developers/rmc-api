const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');


const indexRoutes = require("./routes/index");
const dbConnnection = require("./configurations/databaseConfiguration");
const {PORT} = require('./configurations/constants')

const server = express();

server.use(bodyParser.json())
server.use(cors());



//routing
//server.use("/v1/",indexRoutes);

server.use('/test',(req,res,next)=>{
  res.send({message:"server listening"})
})


//Handling invalid api request
server.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404 || err.status;
    res.status(err.status).send({ message: "Invalid API" });
    next();
  });

  //Hadeling error and sending response
server.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const message = error.message;
  console.log(error);
  res.status(statusCode).json({ data: { message } });
});

  // dbConnnection.dbConnection.then(()=>{
   
  // })

  server.listen(8080,()=>{
    console.log("Server started at:",PORT)
})


// const express = require('express');

// const server = express();

// server.use('/test',(req,res,next)=>{
//     res.send({message:"server listening"})
// })

// server.listen(8080,()=>{
//     console.log('listening on port');
// })