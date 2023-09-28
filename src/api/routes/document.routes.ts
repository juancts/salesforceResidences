import Router from 'express';

import {GET_AllDocuments} from "../controllers/document.controllers";
const docuRoutes = Router();



/**
 //TODO: RUTA GET Obtener todos los Documentos
 */
docuRoutes.get("/", GET_AllDocuments);

export default docuRoutes;