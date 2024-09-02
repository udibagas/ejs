const Category = require("../models/category");
const Menu = require("../models/menu");

class Controller {
  static home(req, res) {
    res.render("home");
  }

  static async categories(req, res) {
    try {
      const categories = await Category.findAll();
      res.render("categories", { categories });
    } catch (err) {
      res.send(err.message);
      console.log(err);
    }
  }

  static async menus(req, res) {
    const { keyword } = req.query;

    try {
      const menus = await Menu.findAll(keyword);
      res.render("menus", { menus });
    } catch (err) {
      res.send(err.message);
      console.log(err);
    }
  }

  static async menu(req, res) {
    const { id } = req.params;

    try {
      const menu = await Menu.findOne(id);
      res.render("menu", { menu });
    } catch (err) {
      res.send(err.message);
      console.log(err);
    }
  }

  static async addMenu(req, res) {
    const { error } = req.query;

    try {
      const categories = await Category.findAll();
      res.render("addMenu", { categories, error: JSON.parse(error || "{}") });
    } catch (err) {
      res.send(err.message);
      console.log(err);
    }
  }

  static async saveMenu(req, res) {
    const { name, categoryId, price, stock } = req.body;

    try {
      await Menu.create({ name, categoryId, price, stock });
      res.redirect("/menus");
    } catch (err) {
      if (err.name == "ValidationError") {
        res.redirect(`/menus/add?error=${JSON.stringify(err.errors)}`);
      } else {
        res.status(500).render("error");
      }

      console.log(err);
    }
  }

  static async removeMenu(req, res) {
    const { id } = req.params;

    try {
      await Menu.remove(id);
      res.redirect("/menus");
    } catch (err) {
      res.send(err.message);
      console.log(err);
    }
  }

  static async editMenu(req, res) {
    const { id } = req.params;
    const { error } = req.query;

    try {
      const categories = await Category.findAll();
      const menu = await Menu.findOne(id);
      res.render("editMenu", {
        categories,
        menu,
        error: JSON.parse(error || "{}"),
      });
    } catch (err) {
      res.send(err.message);
      console.log(err);
    }
  }

  static async updateMenu(req, res) {
    const { id } = req.params;
    const { name, categoryId, price, stock } = req.body;
    try {
      await Menu.update(id, { name, categoryId, price, stock });
      res.redirect("/menus");
    } catch (err) {
      if (err.name == "ValidationError") {
        res.redirect(`/menus/edit/${id}?error=${JSON.stringify(err.errors)}`);
      } else {
        res.status(500).render("error");
      }
    }
  }
}

module.exports = Controller;
