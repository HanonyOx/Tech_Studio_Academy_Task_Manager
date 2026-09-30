import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization format",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
  return res.status(401).json({
    success: false,
    message: "Token is missing",
  });
}

 try {
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  return res.status(500).json({
    success: false,
    message: "JWT secret is not configured",
  });
}

const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

req.userId = decoded.userId;
next()
} catch (error) {
  return res.status(401).json({
    success: false,
    message: "Invalid or expired token",
  });
}
};
