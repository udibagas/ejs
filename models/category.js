const pool = require("../config/connection");

class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async findAll() {
    let query = `SELECT * FROM "Categories" ORDER BY "name" ASC`;
    const { rows } = await pool.query(query);

    const categories = rows.map((el) => {
      return new Category(el.id, el.name);
    });

    return categories;
  }
}

module.exports = Category;
