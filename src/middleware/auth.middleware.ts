import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import Admin from "../models/admin.model";

async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.get("X-AUTH")) {
    try {
      const decoded = jwt.verify(request.get("x-auth"), process.env.JWT_SECRET);
      const id = decoded["id"];
      const expireIn = decoded["exp"];
      const currentTime = Math.round(new Date().getTime() / 1000);
      const admin = await Admin.findByPk(id);
      if (admin && expireIn > currentTime) {
        request["user"] = admin;
        next();
      } else {
        response.status(401).send({ error: "Wrong authentication token!" });
      }
    } catch (e) {
      response.status(401).send({ error: "Wrong authentication token!" });
    }
  } else {
    response.status(401).send({ error: "Authentication token missing!" });
  }
}

export default authenticate;
