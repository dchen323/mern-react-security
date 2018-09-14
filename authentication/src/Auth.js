import auth0, { WebAuth } from "auth0-js";
import key from "../auth0-credentials";

class Auth {
  auth0 = new WebAuth({
    domain: key["domain"],
    clientID: key["clientId"],
    redirectUri: "http://localhost:1234/callback",
    responseType: "token"
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuth = () => {
    //TODO
  };

  logout = () => {
    //TODO
  };

  isAuthenticated() {
    return false;
  }
}

export default Auth;
