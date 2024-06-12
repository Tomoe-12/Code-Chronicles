const User = require('../models/userModels')

const me = (req,res)=> {
    res.status(200).json('hit me')
}

const login = (req,res)=>{
    res.status(200).json('hit login')
}

const register = (req,res)=>{
    res.status(200).json('hit register')
}

module.exports = {
    me,
    login,
    register,
}