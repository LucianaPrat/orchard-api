import { existUser, getUser } from "../data-access/user";

import jwt from "jsonwebtoken";

const fs = require("fs");

const login = async (email, pass) => {
  try {
    let exist = false;
    let token = null;
    let exp = null;

    exist = await existUser(email, pass);
    if (exist) {
      const privateKey = fs.readFileSync("private-key.pem");

      exp = Math.floor(Date.now() / 1000) + 60 * 60;
      token = jwt.sign({ exp: exp, data: email }, privateKey, {
        algorithm: "RS256",
        audience: "urn:orchard",
        issuer: "urn:orchard",
        subject: "urn:orchard",
      });
    }

    // exp: seconds from 1970
    const expireDate = new Date(Date.UTC(1970, 0, 1) + exp * 1000);

    return { login: exist, token, expireDate };
  } catch (error) {
    throw error;
  }
};

const getProfile = async (email) => {
  try {
    return await getUser(email);
  } catch (error) {
    throw error;
  }
};

export { login, getProfile };
