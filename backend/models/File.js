const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: String,
    content: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
