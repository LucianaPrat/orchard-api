import mysql from "promise-mysql";

async function existUser(email, pass) {
  const connection = await mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "pass123",
    database: "orchard",
  });
  try {
    const query = await connection.query(
      `SELECT id FROM users WHERE email = '${email}' AND pass = '${pass}'`
    );
    return query && query.length > 0;
  } finally {
    connection.end();
  }
}

async function getUser(email) {
  const connection = await mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "pass123",
    database: "orchard",
    typeCast: function castField(field, useDefaultTypeCasting) {
      // We only want to cast bit fields that have a single-bit in them. If the field
      // has more than one bit, then we cannot assume it is supposed to be a Boolean.
      if (field.type === "BIT" && field.length === 1) {
        var bytes = field.buffer();

        // A Buffer in Node represents a collection of 8-bit unsigned integers.
        // Therefore, our single "bit field" comes back as the bits '0000 0001',
        // which is equivalent to the number 1.
        return bytes[0] === 1;
      }

      return useDefaultTypeCasting();
    },
  });
  try {
    const query = await connection.query(
      `SELECT id, email, name, onboarded FROM users WHERE email = '${email}'`
    );
    if (query && query.length > 1) {
      throw Error(`More than 1 user with email ${email}`);
    }
    return query[0];
  } finally {
    connection.end();
  }
}

async function updateOnboardedCol(email, onboarded) {
  console.log(email);
  console.log(onboarded);
  const connection = await mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "pass123",
    database: "orchard",
  });
  try {
    const query = await connection.query(
      `UPDATE users SET onboarded = ${onboarded} WHERE email = '${email}'`
    );
  } finally {
    connection.end();
  }
}

export { existUser, getUser, updateOnboardedCol };
