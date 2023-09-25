import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();
//const express = require("express");
const morgan = require('morgan');
const server: Express = express();
const port = process.env.PORT;


//morgan configuration to see details responses
//new variable example:
morgan.token('type', (req: Request, res: Response)=>{
    return req.headers['content-type']; //must create a header: 'content-type'
})
server.use(morgan(':method :url :status :res[content-lenght] - :response-time ms :date[web] :type'));
//end morgan


server.get('/', (req: Request, res: Response)=>{
    res.send('Express + Typescript Server');
})

server.listen(port, ()=> console.info(`App listening on port ${port}`));

