var mongoose = require('mongoose');
var DreRow = mongoose.model('DreRow');

const listDreRows = (req, res) => {
  DreRow.find({}, (err, docs) => {
    if (!!err) return res.status(500).send({ error: err })
    return res.status(200).send({ records: docs })
  })
}

const createDreRows = (accRecords) => {

// [TODO]

  // DreRow.insertMany(rows, { ordered: false }, (err, docs) => {
  //   if (!!err) return res.status(206).send({ file: req.file, error: err, rows: docs.length })

  //   return res.status(200).send({ file: req.file, rows: docs.length })
  // })
}

module.exports = {
  listDreRows,
  createDreRows
};
