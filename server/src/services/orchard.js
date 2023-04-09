import { createOrchard } from "../data-access/orchard";
import { getUser } from "../data-access/user";

const create = async (name, city, width, height, email) => {
  try {
    const user = await getUser(email);
    const newOrchard = await createOrchard(name, city, width, height, user.id);
    return newOrchard;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { create as createOrchard };
