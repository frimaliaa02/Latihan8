export const authBearer = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No authorization header "});

    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Bearer token required"});

    }

    const token = authHeader.split("")[1];

    const VALID_TOKEN = "12345TOKENRAHASIA";

    if (token !== VALID_TOKEN) {
        return res.status(403).json({ message: "invalid token"});
    }
    next();
}