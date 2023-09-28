"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const server = (0, express_1.default)();
dotenv_1.default.config();
//const express = require("express");
const morgan = require('morgan');
const port = process.env.PORT;
server.listen(port, () => console.info(`App listening on port ${port}`));
server.use('/', routes_1.default);
//morgan configuration to see details responses
//new variable example:
morgan.token('type', (req, res) => {
    return req.headers['content-type']; //must create a header: 'content-type'
});
server.use(morgan(':method :url :status :res[content-lenght] - :response-time ms :date[web] :type'));
//end morgan
server.use((0, cors_1.default)());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json({ limit: '25mb' }));
server.use(express_1.default.urlencoded({ limit: '25mb' }));
server.use(body_parser_1.default.json);
server.use((0, cookie_parser_1.default)());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// Error catching endware.
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
exports.default = server;
