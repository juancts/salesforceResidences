import {Router} from 'express';
import documentRoutes from './document.routes';

//import the routes from the routes module
const index = Router();

index.use('/documents', documentRoutes)




export default index;
