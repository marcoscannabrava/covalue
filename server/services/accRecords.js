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
      return new AccRecord({
        month: new Date(Math.round((record['Mês'] - 25569)*86400*1000)),
        account: record['CONTA'],
        g: record['G'],
        description: record['DESCRIÇÃO'],
        value: record[' Valor '],
        classCogsSga: record[' Classificação COGS e SGA '],
        period: record['Período'],
        classPL: record[' Classificação P&L ']
      })
    })

    
    const populateModels = async (records, cb) => {
      
      const accRecordResponse = new Promise((a,b) => {}) // AccRecord.insertMany(records, { ordered: false });
      
      const dreRowResponse = createDreRows(records);
    
      //   if (!!err) return { status: 206, error: err, msg: 'Error generating DreRows Collection. Partially populated. ' }
      //   return { status: 200, msg: 'DreRows Insertion Ok. ' }
      // if (!!err) return { status: 206, error: err, msg: 'Error inserting into AccRecords Collection. Partially populated. ' }
      // return { status: 200, msg: 'AccRecords Insertion Ok. ' }
      
      const responses = await Promise.all([accRecordResponse, dreRowResponse])
      
      cb(accRecordResponse, dreRowResponse)
    };

    const cb = (accRecordResponse, dreRowResponse) => {
      if (accRecordResponse.length > 0 && dreRowResponse.length > 0) {
        return res.status(200).send({response: 'success', msg: 'accRecords and dreRows populated'})
      } else {
        return res.status(206).send({ response: 'error', msg: accRecordResponse.msg + dreRowResponse.msg })
      }
    }

    populateModels(records, cb);
    
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
