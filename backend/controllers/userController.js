const User = require('../models/userModels')
const createToken = require('../helpers/createToken');
const { sample } = require('lodash');

const me = async (req, res) => {
    return await res.json(req.user)
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.Login(email, password)
        console.log('just log in user : ' + user);
        console.log('user _id ' + user._id);
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'Production',
            // secure: true, // Secure must be true when samesite is None
            sameSite: 'None',
        });
        return res.json({ user, token });
    } catch (e) {
        return res.status(400).json({ error: 'error occur ' + e.message })
    }
}

const register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await User.Register(name, email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV == 'Production',
            // secure: true,
            sameSite: 'None',
        });
        return res.json({ user, token });
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}


const logout = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: 1,
        secure: process.env.NODE_ENV === 'Production', // Adjust for production
        sameSite: 'None',
    });
    return res.json({ msg: 'User logged out' });
};
module.exports = {
    me,
    login,
    register,
    logout,
}