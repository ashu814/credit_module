const Joi = require('joi');
const { OfferModel} = require('../Model/offer_model');



exports.create_offer = async (req, res) => {
    try {
        let {offer_name,icons,description,points } = req.body;
        const schema = Joi.object().keys({
            offer_name: Joi.string().required().error(e => 'offer_name require'),
            icons: Joi.string().required().error(e => 'icons require'),
            description: Joi.string().required().error(e => 'description require'),
            points: Joi.string().required().error(e => 'points require')
        })
        const result = Joi.validate(req.body, schema, { abortEarly: true });
        if (result.error) {
            if (result.error.details && result.error.details[0].message) {
                responses.parameterMissing(res, result.error.details[0].message);
            } else {
                responses.parameterMissing(res, result.error.message);
            }
            return;
        }
      
        let Data = new OfferModel({offer_name,icons,description,points})
        let Result = await Data.save();
        if (!Result) {
            throw new Error('Unable to process')
        }
        res.appSuccess(Result, 'successfully')
        
    } catch (error) {
        res.status(403).appError(error.message);
    }
} 



exports.get_offer_list = async (req, res) => {
    try {
        let find_data = await OfferModel.find({},{},{lean: true})
        res.appSuccess(find_data, 'successfully') 
    } catch (error) {
        res.status(403).appError(error.message);
    }
}