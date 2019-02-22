import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { injectable } from "inversify";

import Admin from "../models/admin.model";

@injectable()
class AdminService {
  public async getAdminByName(name: string): Promise<Admin> {
    try {
      const admin = await Admin.find({ where: { adminName: name } });
      return admin;
    } catch (e) {
      throw Error("Error while getting admin " + e);
    }
  }
  public async hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (e) {
      throw Error("Error while hashing password");
    }
  }

  public async comparePassword(
    adminPassword: string,
    admin: Admin
  ): Promise<boolean> {
    try {
      const isValid = bcrypt.compare(adminPassword, admin.adminPassword);
      return isValid;
    } catch (e) {
      throw Error("Error while bcrypt compare");
    }
  }

  public generateAuthToken(admin: Admin) {
    return jwt
      .sign({ id: admin.id, access: "auth" }, process.env.JWT_SECRET, {
        expiresIn: "6h"
      })
      .toString();
  }
}

export default AdminService;
