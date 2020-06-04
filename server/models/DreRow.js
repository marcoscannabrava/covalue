var mongoose = require('mongoose');

var ValuesSchema = new mongoose.Schema({
  month: Date,
  value: Number
});

// Schema for each Accouting Record line
var DreRowSchema = new mongoose.Schema({
  userId: String,
  rowName: String,
  values: [ValuesSchema]
});

// Currency Workaround
// Getter
ValuesSchema.path('value').get(function(num) {
  return (num / 100).toFixed(2);
});
// Setter
ValuesSchema.path('value').set(function(num) {
  return num * 100;
});


mongoose.model('DreRow', DreRowSchema);
