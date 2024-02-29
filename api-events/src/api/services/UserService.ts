import { UserRepository } from "../repositories/UserRepository";

class UserService {
  private userRepository = new UserRepository();

  public async getAll() {
    const users = await this.userRepository.getAllUsers();

    return users;
  }

  public async getById(id: number) {
    const user = await this.userRepository.getUserById(id);

    return user;
  }

  public async create(username: string, email: string, password: string) {
    const user = await this.userRepository.createUser(username, email, password);

    return user;
  }

  public async update(id: number, username: string, email: string, password: string) {
    const user = await this.userRepository.updateUser(id, username, email, password);

    return user;
  }

  public async delete(id: number) {
    const user = await this.userRepository.deleteUser(id);
  }
}

export { UserService };
