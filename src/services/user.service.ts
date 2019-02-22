import { injectable } from "inversify";

import User from "../models/user.model";

@injectable()
class UserService {
  public async getUsers(): Promise<User[]> {
    try {
      const users = await User.findAll();
      return users;
    } catch (e) {
      throw Error("Error while gettins users :" + e);
    }
  }
  public async getUserById(id: number): Promise<User> {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (e) {
      throw Error("Error while getting user by id" + e);
    }
  }

  public async getUserByEmail(UserEmail: string): Promise<User> {
    try {
      const user = await User.findOne({ where: { UserEmail } });
      return user;
    } catch (e) {
      throw Error("Error while getting user by email " + e);
    }
  }

  public async createUser(email: string, userName: string) {
    try {
      const user = await User.build({
        UserEmail: email,
        UserName: userName
      });
      await user.save();
      return user;
    } catch (e) {
      throw Error("Error while saving user " + e);
    }
  }

  public async deleteUser(userId: number): Promise<number> {
    try {
      return await User.destroy({ where: { id: userId } });
    } catch (e) {
      throw Error("Error while deleting user :" + e);
    }
  }
}

export default UserService;
