const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.home);
router.use("/categories", require("./categories"));
router.use("/menus", require("./menus"));

module.exports = router;
