import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Missing or invalid Authorization header" });
    }

    const token: any = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.secret as string) as JwtPayload;
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err: any) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default auth;
