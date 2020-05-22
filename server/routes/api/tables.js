var router = require('express').Router();
var { upload, listAccRecords } = require('../../services/accRecords');
var { listDreRows } = require('../../services/dre');

/* GET tables listing. */
router.get('/base', listAccRecords);
router.get('/dre', listDreRows);

// Upload file to public/files, creates model AccRecord and others
router.post('/upload', upload);

module.exports = router;
