import offer from '../Controller/OfferController';


exports.getRouter = (app) => {

    app.route("/offer/create_offer").post(offer.create_offer);
    app.route("/offer/get_offer_list").get(offer.get_offer_list);

    

    return app;
}