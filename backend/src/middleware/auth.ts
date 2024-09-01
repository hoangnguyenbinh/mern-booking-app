import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { decode } from "punycode";

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies["auth_token"];
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		if (!decoded) {
			return res.status(401).json({ message: "Invalid Token" });
		}
		req.userId = (decoded as JwtPayload).userId;
		next();
	} catch (error) {
		console.log("AUTH VERIFY WENT WRONG");
		return res.status(401).json({ message: "Unauthorized" });
	}
};

