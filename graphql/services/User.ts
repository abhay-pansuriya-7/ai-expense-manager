const jwt = require('jsonwebtoken');
export const signJwt = (payload: object) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    return token;
};

export const verifyJwt = (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};