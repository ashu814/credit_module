
var{mongoose, conn} = require("../Module/connection");
let  userSchema  = mongoose.Schema(
    {
        first_name : {
            type : String,
            require : true,
            default : null
        }, 
        last_name : {
            type : String,
            require : true,
            default : null
        },
        country_code : {
            type: String,
            require:true,
            default : null
        },
        mobile_number : {
            type: String,
            require:true,
            default : null
        }
      
    },
    {
        strict: true,
        collection: 'User',
        versionKey: false
    }
    
);
exports.UserModel = conn.model('User', userSchema);