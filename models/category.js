const pool = require("../config/connection");

class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static createCategories(data) {
    return data.map(({ id, name }) => new Category(id, name));
  }

  static async findAll() {
    let query = `SELECT * FROM "Categories" ORDER BY "name" ASC`;
    const { rows } = await pool.query(query);
    return this.createCategories(rows);
  }
}

module.exports = Category;
