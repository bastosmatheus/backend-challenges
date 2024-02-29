import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  // private readonly userService = new UserService();

  public async getAllUsers(req: Request, res: Response) {
    const userService = new UserService();

    try {
      const users = await userService.getAll();

      return res.status(200).json({ type: "OK", statusCode: 200, users });
    } catch (error) {
      console.error(error);
    }
  }

  public async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const userService = new UserService();

    try {
      const user = await userService.getById(Number(id));

      return res.status(200).json({ type: "OK", statusCode: 200, user });
    } catch (error) {
      console.error(error);
    }
  }

  public async createUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    const userService = new UserService();

    try {
      const user = await userService.create(username, email, password);

      return res
        .status(200)
        .json({ message: "Usuário criado com sucesso", type: "OK", statusCode: 200, user });
    } catch (error) {
      console.error(error);
    }
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const userService = new UserService();

    try {
      const user = await userService.update(Number(id), username, email, password);

      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso", type: "OK", statusCode: 200, user });
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const userService = new UserService();

    try {
      const user = await userService.delete(Number(id));

      return res
        .status(200)
        .json({ message: "Usuário excluido com sucesso", type: "OK", statusCode: 200 });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UserController();
