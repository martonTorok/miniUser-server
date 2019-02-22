import {
  controller,
  httpPost,
  request,
  response,
  httpDelete,
  requestParam,
  httpGet
} from "inversify-express-utils";
import { Response, Request } from "express";
import * as _ from "lodash";
import { inject } from "inversify";

import UserService from "../services/user.service";
import TYPES from "../constant/types";
import authenticate from "../middleware/auth.middleware";

@controller("/users", authenticate)
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @httpGet("/")
  public async getUsers(
    @request() request: Request,
    @response() response: Response
  ) {
    try {
      const users = await this.userService.getUsers();
      if (users) {
        response.status(200).send(users);
      } else {
        response.status(404).send({ error: `Users not found!` });
      }
    } catch (e) {
      response.status(400).send(e);
    }
  }

  @httpPost("/create")
  public async createNewUser(
    @request() request: Request,
    @response() response: Response
  ) {
    try {
      let credentials = _.pick(request.body, ["UserEmail", "UserName"]);
      if (await this.userService.getUserByEmail(credentials.UserEmail)) {
        response.status(400).send({
          error: `User with email: ${credentials.UserEmail} already registered!`
        });
      } else {
        const user = await this.userService.createUser(
          credentials.UserEmail,
          credentials.UserName
        );
        response.status(200).send(user);
      }
    } catch (e) {
      response.status(400).send({ error: "Invalid input" });
    }
  }

  @httpDelete("/delete/:id")
  public async deleteUser(
    @request() request: Request,
    @response() response: Response,
    @requestParam("id") userId: number
  ) {
    try {
      const user = await this.userService.getUserById(userId);
      if (user) {
        await this.userService.deleteUser(userId);
        response.status(200).send({ message: "Deletion successful!" });
      } else {
        response
          .status(400)
          .send({ error: `User with id: ${userId} not found!` });
      }
    } catch (e) {
      response.status(400).send({ error: e });
    }
  }
}
