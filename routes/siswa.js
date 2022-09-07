var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { Siswa, sequelize } = require('../models');

// import fastest-validator
const v = new Validator();

// GET SISWA ROUTE
router.get('/', async (req, res) => {
    const siswa = await sequelize.query('SELECT * FROM siswa', {
        model: Siswa,
        mapToModel: true,
    });
    res.status(200).json(siswa);
});

module.exports = router;