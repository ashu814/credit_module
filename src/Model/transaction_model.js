
var{mongoose, conn} = require("../Module/connection");
let  transactionSchema  = mongoose.Schema(
    {
        transaction_id : {
            type : Number,
            require : true,
            default : new Date().getTime()
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
      
    },
    {
        strict: true,
        collection: 'Transaction',
        versionKey: false
    }
    
);
exports.TransactionModel = conn.model('Transaction', transactionSchema);