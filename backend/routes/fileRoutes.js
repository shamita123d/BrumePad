const express = require('express');
const router = express.Router();
const { getFiles, saveFile, deleteFile } = require('../controllers/fileController');

router.get('/', getFiles);
router.post('/', saveFile);
router.delete('/:id', deleteFile); // ← added route

module.exports = router;
