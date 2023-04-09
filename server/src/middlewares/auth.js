import { checkAuth } from "../services/auth";

export const authCheck = async (req, res, next) => {
  try {
    const email = req.headers.email;
    const { token } = req.cookies;

    const authorized = await checkAuth(token, email);
    if (authorized) {
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
