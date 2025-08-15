import { Router } from "express";
import { baseRoutes } from "./base.route";

import { usersRoutes } from "./users.route";
// import { authRoute } from "./auth.route";

export const routes = Router();
routes.use("/", baseRoutes);
// routes.use("/auth", authRoute);
// routes.use("/login", loginRoute);
routes.use("/", usersRoutes);
