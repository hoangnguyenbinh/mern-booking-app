import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { check, validationResult } from "express-validator";
export const userRouter = express.Router();

userRouter.post(
	"/register",
	[
		check("firstName", "First name is requireed").isString(),
		check("lastName", "Last name is required").isString(),
		check("email", "Email is required").isEmail(),
		check("password", "Password must be 6 characters at least")
			.isLength({ min: 6 })
			.isString(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		console.log(errors.array());
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const existingUser = await User.findOne({ email: req.body.email });
			if (existingUser) {
				return res.status(400).json({ message: "User Already Exist" });
			}
			const user = await User.create(req.body);
			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, {
				expiresIn: "1d",
			});
			res.cookie("auth_token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 86400000,
			});
			return res.status(200).json({ message: "Register Successful" });
		} catch (error) {
			console.log("User_Register", error);
			res.status(500).send({ message: "Something went wrong" });
		}
	},
);
