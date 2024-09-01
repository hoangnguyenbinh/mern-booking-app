import express, { Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import "dotenv/config";
import mongoose from "mongoose";
import { userRouter } from "./routes/users";
import { authRouter } from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || ".env" });
mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => console.log("Database connected to .env.2e2 "))
	.catch(() => console.log("something went wrong"));

const app = express();
app.use(
	express.static(path.join(__dirname, "../../frontend/mern-booking-app/dist")),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	}),
);

app.get("/api", async (req, res: Response) => {
	res.send("hello");
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(3001, () => {
	mongoose
		.connect(process.env.MONGODB_CONNECTION_STRING!)
		.then(() => console.log("Database has been connected"));
	console.log("Server is running on port 3001");
});
