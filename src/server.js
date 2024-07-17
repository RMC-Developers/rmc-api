const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const indexRoutes = require("./routes/index");
 const dbConnnection = require("./configurations/databaseConfiguration");
const {PORT} = require('./configurations/constants')

const server = express();

server.use(bodyParser.json())
server.use(cors());



//routing
server.use("/v1/",indexRoutes);

// swagger api doc
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile,{customCssUrl: CSS_URL}))

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

  dbConnnection.dbConnection.then(()=>{
    server.listen(PORT,()=>{
        console.log("Server started at:",PORT)
    })
  })




