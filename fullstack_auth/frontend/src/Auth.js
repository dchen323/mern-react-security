import history from "./history";
import { CONNECTION } from "../config";

class Auth {
  loggedIn = false;

  signup = (username, password) => {
    fetch(`${CONNECTION}/user/new`, {
      method: "POST",
      credentials: "include",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(res => response.json())
      .then(json => {
        if (json.type === "error") {
          alert(json.message);
        } else {
          alert(json.message);
        }
      });
  };

  login = () => {};

  logout = () => {};
}

export default Auth;
