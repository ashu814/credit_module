const Joi = require('joi');
const { UserModel} = require('../Model/user_model');
const { Reedem, ReedemModel} = require('../Model/reedem_model');
const { TransactionModel} = require('../Model/transaction_model');
const { OfferModel } = require('../Model/offer_model');




exports.user_reedem = async (req, res) => {
    try {
        let {user_id,offer_id,credit_type } = req.body;
        const schema = Joi.object().keys({
            user_id: Joi.string().required().error(e => 'user_id require'),
            offer_id: Joi.string().required().error(e => 'offer_id require'),
            credit_type: Joi.string().required().error(e => 'credit_type require'),
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
        let user_deatil = await UserModel.findOne({_id:user_id},{},{lean:true});
        if(!user_deatil){
            throw new Error('Please enter correct user_id');
        }
        let offer_deatil = await OfferModel.findOne({_id:offer_id},{},{lean:true});
        if(!offer_deatil){
            throw new Error('Please enter correct offer_id');
        }
        let Data = new ReedemModel({user_id,offer_id,credit_type,points_used:offer_deatil.points})
        let Result = await Data.save();
        if (!Result) {
            throw new Error('Unable to process')
        }else{
            let update_value = new TransactionModel({transaction_id:new Date().getTime(),points_used:offer_deatil.points,user_id,offer_id})
            await update_value.save();
        }
        res.appSuccess(Result, 'successfully')
        
    } catch (error) {
        res.status(403).appError(error.message);
    }
} 


exports.get_single_user_credit = async (req, res) => {
    try {
        let {user_id} = req.body;
        if(!user_id){
            throw new Error("Please enter user_id");
        }
        let user_deatil = await UserModel.findOne({_id:user_id},{},{lean:true});
        if(!user_deatil){
            throw new Error('Please enter correct user_id');
        }
        let reedeme_detail ={
            org_credit :0,
            time_credit:0,
            audit_credit:0
        }
        let find_reedem_data = await ReedemModel.find({user_id},{},{lean:true});

        if((find_reedem_data || []).length>0){
            for (let index = 0; index < find_reedem_data.length; index++) {
                if(find_reedem_data[index].credit_type == 'Org Credit'){
                    reedeme_detail.org_credit =   reedeme_detail.org_credit + find_reedem_data[index].points_used
                }
                if(find_reedem_data[index].credit_type == 'Time Credit'){
                    reedeme_detail.time_credit =   reedeme_detail.time_credit + find_reedem_data[index].points_used
                }
                if(find_reedem_data[index].credit_type == 'Audit Credit'){
                    reedeme_detail.audit_credit =   reedeme_detail.audit_credit + find_reedem_data[index].points_used
                }
                
            }
        }
        
        user_deatil.reedeme_detail= reedeme_detail
        res.appSuccess(user_deatil, 'successfully')
        
    } catch (error) {
        res.status(403).appError(error.message);
    }
} 


exports.get_transaction_detail = async (req, res) => {

    try {
        let {user_id} = req.body;
        let find_data = await TransactionModel.find({user_id},{},{lean:true}).select('-user_id -offer_id');
        res.appSuccess(find_data, 'successfully')
    } catch (error) {
        res.status(403).appError(error.message);
    }
}