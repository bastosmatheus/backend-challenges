import { Router } from "express";
import AuthToken from "../middlewares/AuthToken";
import UserController from "../controllers/UserController";

// criar uma classe para acesso da rota
const routerUser = Router();

routerUser.get("/users", AuthToken.verifyToken, UserController.getAllUsers);
routerUser.get("/users/:id", AuthToken.verifyToken, UserController.getUserById);
routerUser.post("/users", UserController.createUser);
routerUser.put("/users/:id", AuthToken.verifyToken, UserController.updateUser);
routerUser.delete("/users/:id", AuthToken.verifyToken, UserController.deleteUser);
routerUser.post("/users/login", UserController.loginUser);

export { routerUser };
