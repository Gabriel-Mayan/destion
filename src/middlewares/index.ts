import { loginMiddleware } from "./login.middleware";
import { sissionMiddleware } from "./session.middleware";

const middlewaresAtivos = [loginMiddleware, sissionMiddleware];

export default middlewaresAtivos;
