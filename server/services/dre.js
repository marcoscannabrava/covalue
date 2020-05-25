var mongoose = require('mongoose');
var DreRow = mongoose.model('DreRow');

const listDreRows = (req, res) => {
  DreRow.find({}, (err, docs) => {
    if (!!err) return res.status(500).send({ error: err })
    return res.status(200).send({ records: docs })
  })
}

const createDreRows = async (accRecords) => { // [TO-DO] - not yet taking into account the fact base is cumulative

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
    let hashMonth = Date.parse(currVal.month);  // dehydrate currVal.month to number
    if (!months.includes(hashMonth)) months.push(hashMonth);
    if (calcRows.includes(currVal.classPL)) {
      if (hash[`${currVal.classPL}-${hashMonth}`]) {
        hash[`${currVal.classPL}-${hashMonth}`] += currVal.value;
      } else {
        hash[`${currVal.classPL}-${hashMonth}`] = 0;
      }
    }
  })

  console.log('\n\nHash:\n')
  console.log(hash)

  let dreRecords = [];
  for (key in hash) {
    let arr = key.split('-');
    dreRecords.push(new DreRow({
      userId: "", // for future feature
      rowName: arr[0],
      value: hash[key],
      month: new Date(arr[1]) // does it work? what is arr[1]?
    }))
  }

  return await DreRow.insertMany(dreRecords, { ordered: false }, (err, docs) => {
    if (!!err) return { status: 206, error: err, msg: 'Error generating DreRows Collection. Partially populated. ' }
    return { status: 200, msg: 'DreRows Insertion Ok. ' }
  })
}

module.exports = {
  listDreRows,
  createDreRows
};
