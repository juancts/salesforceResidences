import express, {Express, Request, Response, NextFunction} from 'express';
import {HttpError} from "http-errors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import dotenv from 'dotenv';
import cors from 'cors';

import router from "./routes";

const server: Express = express();

dotenv.config();
//const express = require("express");
const morgan = require('morgan');

const port = process.env.PORT;
server.listen(port, ()=> console.info(`App listening on port ${port}`));

server.use('/', router);  

//morgan configuration to see details responses
//new variable example:
morgan.token('type', (req: Request, res: Response)=>{
    return req.headers['content-type']; //must create a header: 'content-type'
})
server.use(morgan(':method :url :status :res[content-lenght] - :response-time ms :date[web] :type'));
//end morgan

server.use(cors());
server.use(bodyParser.urlencoded({extended:true}));
server.use(express.json({limit: '25mb'}));
server.use(express.urlencoded({limit: '25mb'}));
server.use(bodyParser.json);
server.use(cookieParser());
server.use((req:Request, res:Response, next:NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  



// Error catching endware.
server.use((err:HttpError, req:Request, res:Response, next:NextFunction) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

export default server;

