const Joi = require('joi');
const { UserModel} = require('../Model/user_model');



exports.create_user = async (req, res) => {
    try {
        let {first_name,last_name,country_code,mobile_number } = req.body;
        const schema = Joi.object().keys({
            first_name: Joi.string().required().error(e => 'first_name require'),
            last_name: Joi.string().required().error(e => 'last_name require'),
            country_code: Joi.string().required().error(e => 'country_code require'),
            mobile_number: Joi.string().required().error(e => 'mobile_number require')
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
        let check_mobile_number = await UserModel.findOne({mobile_number, country_code},{},{lean:true});
        if(check_mobile_number){
            throw new Error('Mobile Number Already present')
        }
        let Data = new UserModel({first_name,last_name,country_code,mobile_number})
        let Result = await Data.save();
        if (!Result) {
            throw new Error('Unable to process')
        }
        res.appSuccess(Result, 'successfully')
        
    } catch (error) {
        res.status(403).appError(error.message);
    }
}  