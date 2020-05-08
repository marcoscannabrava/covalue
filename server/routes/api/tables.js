var router = require('express').Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public/files')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

/* GET tables listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/upload',function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
});

module.exports = router;
