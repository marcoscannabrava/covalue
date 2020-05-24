var mongoose = require('mongoose');
var DreRow = mongoose.model('DreRow');

const listDreRows = (req, res) => {
  DreRow.find({}, (err, docs) => {
    if (!!err) return res.status(500).send({ error: err })
    return res.status(200).send({ records: docs })
  })
}

const createDreRows = (accRecords) => { // [TO-DO]

  const calcRows = [
    'Receita Bruta',
    'Deduções da receita',
    'Custos',
    'SG&A',
    'Itens não recorrentes',
    'D&A',
    'Despesas financeiras',
    'Receitas financeiras',
    'IR/CS'
  ];

  // Create Hash Table w/ calcRow+Month as key,
  // Iterate records:
  // Sum of (ClassPL/Month - ClassPL/prevMonth) // each month is cumulative in same year
  // let prevMonth = new Date(currVal.month.getFullYear(), currVal.month.getMonth()-1, 1)

  let hash = {};
  let months = [];
  accRecords.forEach((currVal) => {
    if (!months.includes(currVal.month)) months.push(currVal.month);
    if (calcRows.includes(currVal.classPL)) {
      if (hash[`${currVal.classPL}-${currVal.month}`]) { // dehydrate currVal.month to simple month integer?
        hash[`${currVal.classPL}-${currVal.month}`] += currVal.value;
      } else {
        hash[`${currVal.classPL}-${currVal.month}`] = 0;
      }
    }
  })

  let dreRecords = [];
  for (key in hash) {
    let arr = key.split('-');
    dreRecords.push(new DreRow({
      userId: "",
      rowName: arr[0],
      value: hash[key],
      month: new Date(arr[1]) // does it work? what is arr[1]?
    }))
  }
  /*
  */

  // DreRow.insertMany(rows, { ordered: false }, (err, docs) => {
  //   if (!!err) return res.status(206).send({ file: req.file, error: err, rows: docs.length })

  //   return res.status(200).send({ file: req.file, rows: docs.length })
  // })
}

module.exports = {
  listDreRows,
  createDreRows
};
