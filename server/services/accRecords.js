var multer = require('multer');
var path = require('path');
var XLSX = require('xlsx');
var mongoose = require('mongoose');
var AccRecord = mongoose.model('AccRecord');
var DreRow = mongoose.model('DreRow');

var { createDreRows } = require('./dre');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/files/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
})

// Upload file to public/files, creates model AccRecord and others
const upload = (req, res) => {
  multer({ storage: storage }).single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({response:'error', ...err})
    } else if (err) {
      return res.status(500).json({response:'error', ...err})
    }
    
    let wb = XLSX.readFile(path.join(__dirname, '../public/files/'+req.file.filename));
    let ws = wb.Sheets[wb.SheetNames[0]];
    let records = XLSX.utils.sheet_to_json(ws);

    records = records.map((record) => {
      let date = record['Mês'].split('/');
      return new AccRecord({
        month: new Date(date[2], date[1]-1, date[0]),
        account: record['CONTA'],
        g: record['G'],
        description: record['DESCRIÇÃO'],
        value: record[' Valor '],
        classCogsSga: record[' Classificação COGS e SGA '],
        period: record['Período'],
        classPL: record[' Classificação P&L ']
      })
    })

    console.log('\n\n Inserting Records in AccRecords Collection...\n\n');
    AccRecord.insertMany(records, { ordered: false }, (err, docs) => {
      if (!!err) return res.status(206).send({ response: 'error', error: err, rows: docs.length })

      return res.status(200).send({ response: 'success', rows: docs.length })
    })

    createDreRows(records);

  })
}

const listAccRecords = (req, res) => {
  AccRecord.find({}, (err, docs) => {
    if (!!err) return res.status(500).send({ error: err })
    return res.status(200).send({ records: docs })
  })
}

module.exports = {
  upload,
  listAccRecords
};
