const Person = require('../models/model')

const RenderInformation = (req, res, next) => {
    try {
        const obj = new Person();
        obj.copy(req.body);
        obj.insert();
        res.render('success', obj);
    } catch (error) {
        next(error);
    }
}

const RenderIndex = (req,res)=>{
    res.render('index');
}

const RenderRegister = (req,res)=>{
    res.render('register');
}

module.exports = {RenderInformation,RenderIndex,RenderRegister};
