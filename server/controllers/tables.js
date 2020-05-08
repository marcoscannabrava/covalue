var multer = require('multer');
var path = require('path');
var XLSX = require('xlsx');
var mongoose = require('mongoose');
var AccRecord = mongoose.model('AccRecord');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
})

// Upload file to public/files, creates model AccRecord and others
const upload = (req, res) => {
  multer({ storage: storage }).single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    let wb = XLSX.readFile(path.join(__dirname, '../public/files/'+req.file.filename));
    let ws = wb.Sheets[wb.SheetNames[0]];
    let records = XLSX.utils.sheet_to_json(ws);

    records = records.map((record) => {
      return new AccRecord({
        month: new Date(record['Mês']),
        account: record['CONTA'],
        g: record['G'],
        description: record['DESCRIÇÃO'],
        value: record[' Valor '],
        classCogsSga: record[' Classificação COGS e SGA '],
        period: record['Período'],
        classPL: record[' Classificação P&L ']
      })
    })

    AccRecord.insertMany(records, { ordered: false }, (err, docs) => {
      if (!!err) return res.status(206).send({ file: req.file, error: err, rows: docs.length })

      return res.status(200).send({ file: req.file, rows: docs.length })
    })

    // [TODO] call method to create KPIs and DRE Models ?

  })
}

const listAccRecords = (req, res) => {
  console.log('\n\nConnection: \n', mongoose.connection)
  AccRecord.find({}, (err, docs) => {
    if (!!err) return res.status(500).send({ error: err })
    console.log('\n\nConnection: \n', mongoose.connection)
    return res.status(200).send({ records: docs })
  })
}

module.exports = {
  upload,
  listAccRecords
};
