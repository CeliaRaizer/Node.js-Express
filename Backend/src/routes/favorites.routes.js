const express = require("express");
const router = express.Router();

const favoritesController = require("../controllers/favoritesController");
const requireAuth = require("../middleware/auth");

router.get("/check/:bookId", requireAuth, favoritesController.checkFavorite);
router.get("/", requireAuth, favoritesController.getFavorites);
router.post("/:bookId", requireAuth, favoritesController.addFavorite);
router.delete("/:bookId", requireAuth, favoritesController.removeFavorite);

module.exports = router;
