import * as bodyParser from "body-parser";
import * as cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { Sequelize } from "sequelize-typescript";

import UserService from "./services/user.service";
import TYPES from "./constant/types";
import AdminService from "./services/admin.service";

class App {
  public container: Container;
  public server: InversifyExpressServer;

  constructor() {
    this.initContainer();
    this.server = new InversifyExpressServer(this.container);
    this.config();
    this.initDatabase();
  }

  private initContainer(): void {
    this.container = new Container();
    this.container.bind<UserService>(TYPES.UserService).to(UserService);
    this.container.bind<AdminService>(TYPES.AdminService).to(AdminService);
  }

  private initDatabase(): void {
    const sequelize = new Sequelize({
      database: process.env.MYSQL_DATABASE,
      dialect: process.env.DB_DIALECT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      modelPaths: [__dirname + "/models"]
    });
  }

  private config(): void {
    this.server.setConfig(app => {
      app.use(bodyParser.json());
      app.use(cors());
    });
  }
}

export default App;
