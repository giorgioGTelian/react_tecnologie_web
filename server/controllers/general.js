import User from "../models/User.js";
import jwt from 'jsonwebtoken';


export const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'your_jwt_secret'); // replace 'your_jwt_secret' with your actual secret

        // 'decoded' now contains the user information. You can use it to find the user in your database
        const user = await User.findById(decoded.id);

        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        console.log(users);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

