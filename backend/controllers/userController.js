const { databases, users, storage, API_KEY, BUCKET_ID, ENDPOINT, DATABASE_ID, PROJECT_ID, USER_COLLECTION_ID } = require('../lib/appwrite.config')
const { ID } = require('node-appwrite')
const User = require('../models/userModels')
const createToken = require('../helpers/createToken');
const { sample } = require('lodash');
const mongoose = require('mongoose');
const { InputFile } = require('node-appwrite/file')
const me = async (req, res) => {
    return await res.json(req.user)
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.Login(email, password)
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

const updateProfile = async (req, res) => {
    console.log(req.body);

    try {
        const { formData } = req.body;
        const id = req.params.userId;
        let inputFile;
        console.log('user id ', id);

        let file;
        if (req.file) {
            inputFile = InputFile.fromBuffer(
                req.file.buffer,
                req.file.originalname
            );

            console.log('input file ', inputFile);

            try {
                // Check if the file exists
                await storage.getFile(BUCKET_ID, id);
                
                // File exists, delete it
                await storage.deleteFile(BUCKET_ID, id);
                console.log('Existing profile file deleted successfully.');
            } catch (error) {
                if (error.code === 404) {
                    // File does not exist, no need to delete
                    console.log('No existing profile file found. Proceeding to upload a new file.');
                } else {
                    throw error;
                }
            }

            // Upload the new file
            file = await storage.createFile(BUCKET_ID, id, inputFile);
            console.log('New profile file uploaded successfully:', file);
        }

        // Additional logic for updating the user in your database
        // Uncomment and modify according to your database schema
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ msg: 'not a valid id' });
        // }

        // let userUpdate = await User.findByIdAndUpdate(id, {
        //     ...req.body
        // });

        // console.log('userupdate : ;', userUpdate);

        // if (!userUpdate) {
        //     return res.status(404).json({ msg: 'user not found' });
        // }
        // return res.status(200).json(userUpdate);

        return res.status(200).json(req.body);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};


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
    updateProfile
}