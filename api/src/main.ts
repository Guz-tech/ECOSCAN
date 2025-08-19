import "./config/env";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { Connection } from "./database/connection";
import { errorHandler } from "./errors/handler.error";
import { routes } from "./routes";
import { setupDatabase } from "./database/dbSetup";

const app = express();

await Connection();
await setupDatabase();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(errorHandler);
app.listen(3000, () => console.log("Servidor Ligado na porta 3000"));
