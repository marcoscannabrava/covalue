var mongoose = require('mongoose');

// Schema for each Accouting Record line
var AccRecordSchema = new mongoose.Schema({
  month: Date,
  account: String,
  g: Number,
  description: String,
  value: Number,
  classCogsSga: String,
  period: String,
  classPL: String,
});

// Currency Workaround
// Getter
AccRecordSchema.path('value').get(function(num) {
  return (num / 100).toFixed(2);
});
// Setter
AccRecordSchema.path('value').set(function(num) {
  return num * 100;
});

mongoose.model('AccRecord', AccRecordSchema);
