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
  });
  try {
    const query = await connection.query(
      `SELECT id, email, name FROM users WHERE email = '${email}'`
    );
    if (query && query.length > 1) {
      throw Error(`More than 1 user with email ${email}`);
    }
    return query[0];
  } finally {
    connection.end();
  }
}

export { existUser, getUser };
