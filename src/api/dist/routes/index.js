"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_routes_1 = __importDefault(require("./document.routes"));
//import the routes from the routes module
const index = (0, express_1.Router)();
index.use('/documents', document_routes_1.default);
exports.default = index;
