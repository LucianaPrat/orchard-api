import mysql from "promise-mysql";

async function create(name, city, width, height, userId) {
  const connection = await mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "pass123",
    database: "orchard",
  });
  try {
    const insertResult = await connection.query(
      `INSERT INTO orchard(name, city, width, height, fkUser) VALUES ('${name}', '${city}', ${width}, ${height},${userId})`
    );
    const insertId = insertResult.insertId;
    const getOrchards = await connection.query(
      `SELECT id, name, city, width, height FROM orchard WHERE id = ${insertId}`
    );
    return getOrchards && getOrchards.length > 0 ? getOrchards[0] : null;
  } finally {
    connection.end();
  }
}

export { create as createOrchard };
