import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class AuthToken {
  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ message: "Usuário não autenticado", type: "Unauthorized", statusCode: 401 });
    }

    const token = authorization.split(" ")[1];

    const tokenVerified = jwt.verify(token, process.env.JWT_PASS ?? "", (err) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Usuário não autenticado", type: "Unauthorized", statusCode: 401 });
      }
    });

    next();
  }
}

export default new AuthToken();
