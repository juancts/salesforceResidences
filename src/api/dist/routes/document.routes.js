"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const document_controllers_1 = require("../controllers/document.controllers");
const docuRoutes = (0, express_1.default)();
/**
 //TODO: RUTA GET Obtener todos los Documentos
 */
docuRoutes.get("/", document_controllers_1.GET_AllDocuments);
exports.default = docuRoutes;
