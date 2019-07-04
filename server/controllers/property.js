import Property from '../models/Property';
import { properties } from '../data/store';


const propertyController = {
    newProperty: (req, res) => {
        // destructure field values from request.body
        try {
            const {
                price,
                state,
                city,
                address,
                type,
                imageurl,
            } = req.body;
            const newProperty = new Property('owner', price, state, city, address, type, imageurl);

            properties.push(newProperty);
            return res.status(201).json({
                status: 'succes',
                data: newProperty,
            });
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    status: 'error',
                    error: 'An error occured while creating this property',
                });
            }
        }
    },

    updateProperty: (req, res) => {
        // destructure field values from request.body
        try {
            const {
                price,
                imageurl,
            } = req.body;
            const propertyToUpdate = Property.getById(req.params.propertyid);
            if (!propertyToUpdate) {
                return res.status(404).json({
                    status: 'error',
                    error: 'property does not exist',
                });
            }

            propertyToUpdate.price = price;
            propertyToUpdate.image_url = imageurl;

            return res.status(200).json({
                status: 'succes',
                data: propertyToUpdate,
            });
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    status: 'error',
                    error: 'An error occured while updating this property',
                });
            }
        }
    },

    updatePropertyStatus: (req, res) => {
        // destructure field values from request.body
        try {
            const propertyToUpdateStatus = Property.getById(req.params.propertyid);
            if (!propertyToUpdateStatus) {
                return res.status(404).json({
                    status: 'error',
                    error: 'property does not exist',
                });
            }

            propertyToUpdateStatus.status = 'sold';

            return res.status(200).json({
                status: 'succes',
                data: propertyToUpdateStatus,
            });
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    status: 'error',
                    error: 'An error occured while updating this property status',
                });
            }
        }
    },

    deleteProperty: (req, res) => {
        // destructure field values from request.body
        try {
            const propertyToDelete = Property.getById(req.params.propertyid);
            if (!propertyToDelete) {
                return res.status(404).json({
                    status: 'error',
                    error: 'property does not exist',
                });
            }

            const propertyIndex = properties.indexOf(propertyToDelete);
            properties.splice(propertyIndex, 1);

            return res.status(200).json({
                status: 'succes',
                data: {
                    message: 'property deleted successfully',
                },
            });
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    status: 'error',
                    error: 'An error occured while deleting this property',
                });
            }
        }
    },

    getAllProperties: (req, res) => {
        // destructure field values from request.body
        try {

            if (!properties.length) {
                return res.status(404).json({
                    status: 'error',
                    error: 'There are properties for now',
                });
            }

            return res.status(200).json({
                status: 'succes',
                data: properties,
            });
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    status: 'error',
                    error: 'An error occured while getting',
                });
            }
        }
    },

    getSingleProperty: (req, res) => {
        // destructure field values from request.body
        try {
            const singleProperty = Property.getById(req.params.propertyid);
            if (!singleProperty) {
                return res.status(404).json({
                    status: 'error',
                    error: 'property does not exist',
                });
            }

            return res.status(200).json({
                status: 'succes',
                data: singleProperty,
            });
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    status: 'error',
                    error: 'An error occured while fetching this property',
                });
            }
        }
    },

    getAllPropertiesWithSpecificType: (req, res) => {
        // destructure field values from request.body
        try {
            const specifictypeproperties = properties.filter(property => property.type !== req.query.type);

            if (!specifictypeproperties.length) {
                return res.status(404).json({
                    status: 'error',
                    error: 'There are properties of this type now',
                });
            }

            return res.status(200).json({
                status: 'succes',
                data: specifictypeproperties,
            });
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    status: 'error',
                    error: 'An error occured while getting',
                });
            }
        }
    },
};

export default propertyController;