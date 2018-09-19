const SHA256 = require("crypto-js/sha256");
const uuid = require("uuid/v4");

const { APP_SECRET } = require("./secret");

const hash = str => {
  return SHA256(`${APP_SECRET}${str}${APP_SECRET}`).toString();
};

class Session {
  constructor(username) {
    this.username = username;
    this.id = uuid();
  }

  toString() {
    return Session.dataToString(this.username, this.id);
  }

  static userData(username, id) {
    return `${username}|${id}`;
  }

  static dataToString(username, id) {
    const userData = Session.userData(username, id);
    return `${userData}|${hash(userData)}`;
  }

  static parse(sessionStr) {
    const sessionData = sessionStr.split("|");
    return {
      username: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2]
    };
  }

  static verify(sessionStr) {
    const { username, id, sessionHash } = Session.parse(sessionStr);
    const userData = Session.userData(username, id);
    return hash(userData) === sessionHash;
  }
}

module.exports = { hash, Session };
