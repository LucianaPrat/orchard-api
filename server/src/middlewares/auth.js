// const jwt = require("jsonwebtoken");
// import { existUser } from "../data-access/user";

import jwt from "jsonwebtoken";

const fs = require("fs");

var Promise = require("bluebird");
var jwtVerifyAsync = Promise.promisify(jwt.verify, jwt);

export const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.token;

    // verify issuer
    const cert = fs.readFileSync("public-key.pem"); // get public key
    const decodedToken = await jwtVerifyAsync(token, cert, {
      algorithms: ["RS256"],
      audience: "urn:orchard",
      issuer: "urn:orchard",
      subject: "urn:orchard",
    });

    const decodedEmail = decodedToken.data;
    if (decodedEmail === req.headers.email) {
      next();
    } else {
      res.status(401).json({
        error: new Error("Unauthorized"),
      });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: new Error("Unauthorized"),
    });
  }
};
