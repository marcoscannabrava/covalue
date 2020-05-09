var router = require('express').Router();
var { upload, listAccRecords } = require('../../controllers/tables');

/* GET tables listing. */
router.get('/base', listAccRecords);

// Upload file to public/files, creates model AccRecord and others
router.post('/upload', upload);

module.exports = router;
