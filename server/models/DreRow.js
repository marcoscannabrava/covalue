var mongoose = require('mongoose');

// Schema for each Accouting Record line
var DreRowSchema = new mongoose.Schema({
  userId: String,
  rowName: String,
  value: Number,
  month: Date
});

// Currency Workaround
// Getter
DreRowSchema.path('value').get(function(num) {
  return (num / 100).toFixed(2);
});
// Setter
DreRowSchema.path('value').set(function(num) {
  return num * 100;
});


mongoose.model('DreRow', DreRowSchema);
