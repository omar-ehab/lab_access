const express = require('express');
const router = express.Router();
const labAccessController = require('../controllers/labAccessController');

router.post('/store_access_log', labAccessController.store_access);

router.get('/labs', labAccessController.get_distincet_labs);

router.get('/download_excel/:lab_id', labAccessController.download_excel);

module.exports = router;