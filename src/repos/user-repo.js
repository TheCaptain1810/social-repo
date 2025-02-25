const pool = require("../pool");
const toCamelCase = require("../repos/utils/to-camel-case");

class UserRepo {
  static async find() {
    const { rows } = await pool.query("SELECT * FROM users;");
    return toCamelCase(rows);
  }

  static async findById(id) {
    const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    return toCamelCase(rows)[0];
  }

  static async insert(username, bio) {
    return await pool.query(
      "INSERT INTO users(username, bio) VALUES ($1, $2);",
      [username, bio]
    );
  }

  static async update(id, username, bio) {
    const user = pool.query("SELECT * FROM users WHERE id = $1;", [id]);
    if (!user) {
      return new Error("User not found");
    }
    return await pool.query(
      "UPDATE users SET username = $1, bio = $2 WHERE id = $3;",
      [username, bio, id]
    );
  }

  static async delete(id) {
    const user = pool.query("SELECT * FROM users WHERE id = $1;", [id]);
    if (!user) {
      return new Error("User not found");
    }
    return await pool.query("DELETE FROM users WHERE id = $1;", [id]);
  }
}

module.exports = UserRepo;
