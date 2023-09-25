"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//const express = require("express");
const morgan = require('morgan');
const server = (0, express_1.default)();
const port = process.env.PORT;
//morgan configuration to see details responses
//new variable example:
morgan.token('type', (req, res) => {
    return req.headers['content-type']; //must create a header: 'content-type'
});
server.use(morgan(':method :url :status :res[content-lenght] - :response-time ms :date[web] :type'));
//end morgan
server.get('/', (req, res) => {
    res.send('Express + Typescript Server');
});
server.listen(port, () => console.info(`App listening on port ${port}`));
