import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "wqbeibveiubbrifi3qnr2939rnjkvdns", (err, payload) => {
      if (err) {
        return res.status(403).json({ error: "invalid token!" }); // Invalid token
      }
      req.userId = payload.userId;
      next();
    });
  } else {
    res.sendStatus(401).json({ error: "Access denied !" }); // Unauthorized
  }
};
