const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.menus);
router.get("/add", Controller.addMenu);
router.get("/:id", Controller.menu); // /menus/add
router.post("/add", Controller.saveMenu);
router.get("/delete/:id", Controller.removeMenu);
router.get("/edit/:id", Controller.editMenu);
router.post("/edit/:id", Controller.updateMenu);

module.exports = router;
