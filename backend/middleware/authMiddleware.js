import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not Authorized" });
  }
};
