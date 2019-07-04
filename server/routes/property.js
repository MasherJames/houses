import express from 'express';

import propertyController from '../controllers/property';
import propertyMiddleware from '../middleware/property';


const propertyRouter = express.Router();

propertyRouter.post('/property', propertyMiddleware.propertyInputsValidator, propertyController.newProperty);

propertyRouter.patch('/property/:propertyid', propertyController.updateProperty);
propertyRouter.patch('/property/:propertyid/sold', propertyController.updatePropertyStatus);
propertyRouter.delete('/property/:propertyid', propertyController.deleteProperty);
propertyRouter.get('/property', propertyController.getAllProperties);
propertyRouter.get('/property?type=propertyType', propertyController.getAllPropertiesWithSpecificType);
propertyRouter.get('/property/:propertyid', propertyController.getSingleProperty);


export default propertyRouter;