import { authRedirectMiddleware } from "./auth-redirect.middleware";
import { sissionMiddleware } from "./session.middleware";

const middlewaresAtivos = [authRedirectMiddleware, sissionMiddleware];

export default middlewaresAtivos;
