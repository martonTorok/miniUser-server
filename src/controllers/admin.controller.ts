import {
  controller,
  httpPost,
  request,
  response
} from "inversify-express-utils";
import { Response, Request } from "express";
import * as _ from "lodash";
import { inject } from "inversify";

import AdminService from "../services/admin.service";
import TYPES from "../constant/types";

@controller("/admin")
export class AdminController {
  constructor(@inject(TYPES.AdminService) private adminService: AdminService) {}

  @httpPost("/login")
  public async login(
    @request() request: Request,
    @response() response: Response
  ) {
    const credentials = request.body;
    const admin = await this.adminService.getAdminByName(credentials.adminName);
    if (admin) {
      const isPasswordMatching = await this.adminService.comparePassword(
        credentials.adminPassword,
        admin
      );
      if (isPasswordMatching) {
        const token = this.adminService.generateAuthToken(admin);
        response.header("X-AUTH", token);
        response.send({ token });
      } else {
        response.status(401).send({ error: "Wrong credentials!" });
      }
    } else {
      response.status(401).send({ error: "Wrong credentials!" });
    }
  }
}
