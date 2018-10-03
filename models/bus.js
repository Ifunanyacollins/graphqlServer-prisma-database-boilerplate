const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busSchema = new Schema({
    name: String,
    depart_time:{ type: Date, default: Date.now },
    terminalId: String
});

module.exports = mongoose.model('Bus', busSchema);
