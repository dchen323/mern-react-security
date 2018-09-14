import auth0, { WebAuth } from "auth0-js";
import key from "../auth0-credentials";
import history from "./history";

class Auth {
  auth0 = new WebAuth({
    domain: key["domain"],
    clientID: key["clientId"],
    redirectUri: "http://localhost:1234/callback",
    responseType: "token"
  });

  loggedIn = false;

  login = () => {
    this.auth0.authorize();
  };

  handleAuth = () => {
    this.auth0.parseHash((err, res) => {
      if (res) {
        localStorage.setItem("access_token", res.accessToken);
        localStorage.setItem(
          "expires_at",
          JSON.stringify(res.expiresIn * 1000 + new Date().getTime())
        );
        this.loggedIn = true;

        history.replace("/");
      } else if (err) {
        console.log("err", err);
      }
    });
  };

  logout = () => {
    ["access_token", "expires_at"].forEach(token =>
      localStorage.removeItem(token)
    );
    this.loggedIn = false;
    history.replace("/");
  };

  isAuthenticated() {
    return (
      this.loggedIn &&
      new Date().getTime() < +localStorage.getItem("expires_at")
    );
  }
}

export default Auth;
