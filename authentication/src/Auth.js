import auth0, { WebAuth } from "auth0-js";
import key from 'autho-credentials';

class Auth {
  auth0 = new WebAuth({
    domain: key["domain"];
    client-id: key["clientId"],
    redirectUri: 'http://localhost:1234/callback',
    responseType: 'token'
  });

  login = () => {
    //TODO
  }

  handleAuth = () => {
    //TODO
  }

  logout = () => {
    //TODO
  }

  isAuthenticated(){
    return false;
  }
}

export default Auth;
