import mysql from "promise-mysql";

async function create(name, city, width, height, fkUser) {
  const connection = await mysql.createConnection({
    host: "mysql_db",
    user: "root",
    password: "pass123",
    database: "orchard",
  });
  try {
    const result = await connection.query(
      `INSERT INTO orchard(name, city, width, height, fkUser) VALUES ('${name}', '${city}', ${width}, ${height},${fkUser})`
    );
    return result;
  } finally {
    connection.end();
  }
}

export { create as createOrchard };
