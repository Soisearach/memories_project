import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.head.authorization.split(' ')[1];

        if (!token) next();

        const isCustomAuth = token.length < 500;

        let decodedData;
        if (isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
