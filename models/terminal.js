const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const terminalSchema = new Schema({
    name: String,
    number: String,
    location:String
});

module.exports = mongoose.model('Terminal', terminalSchema);
