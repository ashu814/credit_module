module.exports = (req, res, next) => {
    res.appSuccess = function(result, message = '') {
        if(message == '') {
            this.send({response : result});
        } else {
            this.send({message, response : result});
        }
    }

    res.appError = function(error) {
        this.send( { message : error, response : {}});
    }
    
    next();
}