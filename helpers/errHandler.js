const errHandler = (err, request, response, next) => {
    if (err.name) {
        if (err.name == "SequelizeValidationError") {
            let errors = []
            err.errors.forEach(element => {
                errors.push(element.message)
            });
            response.status(400).json({errors})
        }else if(err.length > 0){
            response.status(400).json({errors: [err.errors[0].message]})
        }else{
            // console.log()
            response.status(500).json({errors: [err]})
        }
    }else{
        if (err.msg) {
            response.status(err.code).json({errors: [err.msg]})
        }else{
            response.status(err.code).json({errors: ['Internal Server Error']})
        }
    }
}
module.exports = errHandler