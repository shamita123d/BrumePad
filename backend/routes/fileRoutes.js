const express = require('express');
const router = express.Router();
const { getFiles, saveFile, updateFile, deleteFile } = require('../controllers/fileController');

router.get('/', getFiles);
router.post('/', saveFile);        // create new file
// router.put('/', updateFile);       // update file content
router.delete('/:id', deleteFile);

module.exports = router;
