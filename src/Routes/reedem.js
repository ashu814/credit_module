import reedem from '../Controller/ReedemController';


exports.getRouter = (app) => {

    app.route("/credit/user_reedem").post(reedem.user_reedem);
    app.route("/credit/get_single_user_credit").post(reedem.get_single_user_credit);
    app.route("/credit/get_transaction_detail").post(reedem.get_transaction_detail);
    

    

    return app;
}