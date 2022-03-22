
var{mongoose, conn} = require("../Module/connection");
let  ReedemSchema  = mongoose.Schema(
    {
        credit_type : {
            type : String,
            require : true
        }, 
        points_used : {
            type : Number,
            require : true
        },
        user_id : {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            require: true
        },
        offer_id : {
            type: mongoose.Schema.ObjectId,
            ref: "Offer",
            require: true
        },
        created_at:{
            type:Number,
            default:new Date().getTime()
        }
      
    },
    {
        strict: true,
        collection: 'Reedem',
        versionKey: false
    }
    
);
exports.ReedemModel = conn.model('Reedem', ReedemSchema);