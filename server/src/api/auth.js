import {
  login,
  getProfile,
  checkAuth,
  updateOnboarded,
} from "./../services/auth";

const loginUserApi = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const loginResult = await login(email, pass);

    // set the cookie
    res.cookie("token", loginResult.token, {
      secure: true,
      httpOnly: true,
      expires: loginResult.expireDate,
    });

    return res.status(200).json({
      message: `Login successfully.`,
      data: loginResult,
      error: false,
    });
  } catch (error) {
    console.error(error);
    let statusCode = 400;
    if (error.message.includes("No email found")) {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getProfileApi = async (req, res) => {
  try {
    const email = req.headers.email;
    const profileData = await getProfile(email);

    return res.status(200).json({
      message: `OK.`,
      data: profileData,
      error: false,
    });
  } catch (error) {
    console.error(error);
    let statusCode = 400;
    if (error.message.includes("No email found")) {
      statusCode = 404;
    }

    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const checkApi = async (req, res) => {
  try {
    const token = req.headers.token;
    const email = req.headers.email;
    console.log(token);
    console.log(email);
    const authorized = await checkAuth(token, email);

    return res.status(200).json({
      message: `OK.`,
      data: { check: authorized },
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const updateOnboardedApi = async (req, res) => {
  try {
    const email = req.headers.email;
    const { onboarded } = req.body;
    await updateOnboarded(email, onboarded);

    return res.status(200).json({
      message: `OK.`,
      data: {},
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export {
  loginUserApi as login,
  getProfileApi as getProfile,
  checkApi as check,
  updateOnboardedApi as updateOnboarded,
};
