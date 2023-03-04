const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

router.get('/stored/shoes',meController.storedShoes)


module.exports = router;
