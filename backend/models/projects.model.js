const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date},
    coffeesAmount: {type: Number},
    username: {type: String, required: true}
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 