const pool = require("../config/connection");

class Menu {
  constructor(id, name, price, stock, categoryId, category, createdAt) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.categoryId = categoryId;
    this.category = category;
    this.createdAt = createdAt;
  }

  get priceInRupiah() {
    return this.price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  }

  static async findAll(keyword) {
    let query = `
      SELECT
        m.*,
        c."name" AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."categoryId"
    `;

    if (keyword) {
      query += `WHERE m.name ILIKE '%${keyword}%'`;
    }

    const { rows } = await pool.query(query);
    return rows.map((el) => {
      const { id, name, price, stock, categoryId, category, createdAt } = el;
      return new Menu(id, name, price, stock, categoryId, category, createdAt);
    });
  }

  static async findOne(menuId) {
    let query = `
      SELECT
        m.*,
        c."name" AS "category"
      FROM "Menus" m
      JOIN "Categories" c ON c.id = m."categoryId"
      WHERE m.id = $1;
    `;

    const { rows, rowCount } = await pool.query(query, [menuId]);

    if (rowCount == 0) {
      throw new Error("Menu not found");
    }

    const { id, name, price, stock, categoryId, category, createdAt } = rows[0];
    return new Menu(id, name, price, stock, categoryId, category, createdAt);
  }

  static async create({ name, categoryId, price, stock }) {
    this.validate({ name, categoryId, price, stock });

    const query = `
      INSERT INTO "Meinus" ("name", "categoryId", "price", "stock", "createdAt")
      VALUES ($1, $2, $3, $4, now())
    `;

    await pool.query(query, [name, categoryId, price, stock]);
  }

  static update(id, { name, categoryId, price, stock }) {
    this.validate({ name, categoryId, price, stock });

    const query = `
      UPDATE "Menus"
      SET
        "name" = $1,
        "categoryId" = $2,
        "price" = $3,
        "stock" = $4
      WHERE id = $5
    `;

    return pool.query(query, [name, categoryId, price, stock, id]);
  }

  static remove(id) {
    return pool.query(`DELETE FROM "Menus" WHERE id = ${id}`);
  }

  static validate({ name, categoryId, price, stock }) {
    // const errors = [];

    // if (!name) {
    //   errors.push("Name is required");
    // }

    // if (!categoryId) {
    //   errors.push("Category is required");
    // }

    // if (!price) {
    //   errors.push("Price is required");
    // }

    // if (!stock) {
    //   errors.push("Stock is required");
    // }

    // if (Number(price) < 10_000) {
    //   errors.push("Min price is 10.000");
    // }

    // if (errors.length > 0) {
    //   const error = new Error(errors.join(", "));
    //   error.name = "ValidationError";
    //   throw error;
    // }

    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!categoryId) {
      errors.categoryId = "Category is required";
    }

    if (!price) {
      errors.price = "Price is required";
    }

    if (!stock) {
      errors.stock = "Stock is required";
    }

    if (Object.keys(errors).length > 0) {
      // const error = new Error("Please chek your input");
      // error.name = "ValidationError";
      // error.errors = errors;
      // throw error;
      throw {
        name: "ValidationError",
        errors: errors,
      };
    }

    return true;
  }
}

module.exports = Menu;
