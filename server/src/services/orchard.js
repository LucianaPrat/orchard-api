import { createOrchard } from "../data-access/orchard";

const create = async (name, city, width, height, fkUser) => {
  try {
    const newOrchard = await createOrchard(name, city, width, height, fkUser);
    return newOrchard;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { create as createOrchard };
