const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

    try {

        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        // Remove "Bearer "
        token = token.split(" ")[1];

        const decoded = jwt.verify(token, "secretkey");

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid token"
        });

    }

};

module.exports = protect;