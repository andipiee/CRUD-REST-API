require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Role = require('../models/roleModel');

const secretKey = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
    let token = await req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) =>  {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        Role.find(
            { _id: user.role },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                }
                if (user.role == 'admin') {
                    next();
                    
                    return;
                }
                res.status(403).send({ message: 'Require Admin Role!' });

                return;
            }
        )
    });
};

const  authJwt = {
    verifyToken,
    isAdmin
};

module.exports = authJwt;
