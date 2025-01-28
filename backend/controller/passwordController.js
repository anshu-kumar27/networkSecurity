const Password = require('./../model/password')

// this is to control the upload of passswords
exports.uploadAPassword = async(req,res,next) =>{
    try{
        const {name,password} = req.body;
        const passwordmodel = await Password.create({
            name,
            password
        });
        res.status(200).json({
            passwordmodel
        })
    }catch(error){
        console.log(error);
    }
}
