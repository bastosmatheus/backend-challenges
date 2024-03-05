import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    const userService = new UserService();

    const users = await userService.getAll();

    return res.status(200).json({ type: "OK", statusCode: 200, users });
  }

  public async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    const userService = new UserService();

    const user = await userService.getById(Number(id));

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json(user.value);
    }

    return res.status(200).json({ type: "OK", statusCode: 200, user: user.value });
  }

  public async createUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const userService = new UserService();

    const user = await userService.create(username, email, password);

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json(user.value);
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      type: "Created",
      statusCode: 201,
      userCreated: user.value,
    });
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const userService = new UserService();

    const user = await userService.update(Number(id), username, email, password);

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json(user.value);
    }

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      type: "OK",
      statusCode: 200,
      userUpdated: user.value,
    });
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const userService = new UserService();

    const user = await userService.delete(Number(id));

    if (user.isFailure()) {
      return res.status(user.value.statusCode).json(user.value);
    }

    return res.status(200).json({
      message: "Usuário excluido com sucesso",
      type: "OK",
      statusCode: 200,
      userDeleted: user.value,
    });
  }

  public async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const userService = new UserService();

    const login = await userService.login(email, password);

    if (login.isFailure()) {
      return res.status(login.value.statusCode).json(login.value);
    }

    return res
      .status(200)
      .json({ message: "Usuário logado", type: "OK", statusCode: 200, userLogged: login.value });
  }
}

export default new UserController();
