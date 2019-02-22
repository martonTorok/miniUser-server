import "reflect-metadata";

import "../config/config";
import "./controllers/user.controller";
import "./controllers/admin.controller";
import App from "./app";

const app = new App();
const serverInstance = app.server.build();
serverInstance.listen(process.env.PORT);
console.log(`Server started listening on port: ${process.env.PORT}`);
