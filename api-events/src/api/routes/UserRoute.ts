import { Router } from "express";
import UserController from "../controllers/UserController";

// criar uma classe para acesso da rota
const routerUser = Router();

routerUser.get("/users", UserController.getAllUsers);
routerUser.get("/users/:id", UserController.getUserById);
routerUser.post("/users", UserController.createUser);
routerUser.put("/users/:id", UserController.updateUser);
routerUser.delete("/users/:id", UserController.deleteUser);

export { routerUser };
