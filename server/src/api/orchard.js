import { createOrchard } from "../services/orchard";

const create = async (req, res) => {
  try {
    const { orchardName, city, width, height } = req.body;
    const { email } = req.headers;

    const newOrchard = await createOrchard(
      orchardName,
      city,
      width,
      height,
      email
    );

    return res.status(200).json({
      message: `Created successfully.`,
      data: newOrchard,
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

export { create as createOrchard };
