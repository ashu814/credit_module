
var{mongoose, conn} = require("../Module/connection");
let  OfferSchema  = mongoose.Schema(
    {
        offer_name : {
            type : String,
            require : true,
            default : null
        }, 
        icons : {
            type : String,
            require : true,
            default : null
        },
        description : {
            type: String,
            require:true,
            default : null
        },
        points : {
            type: String,
            require:true,
            default : null
        }
      
    },
    {
        strict: true,
        collection: 'Offer',
        versionKey: false
    }
    
);
exports.OfferModel = conn.model('Offer', OfferSchema);