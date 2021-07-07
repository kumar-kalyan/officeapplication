const mongoose = require('../db');


const schema = mongoose.Schema({
    projectName: {
        desc: 'project name',
        trim: true,
        type: String,
        required: true,
    },
    client: {
        desc: 'client',
        trim: true,
        type: String,
        required: true,
    },
    clientEmail: {
        desc: 'clientemail',
        trim: true,
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    projectDetails: {
        trim: true,
        type: String,
        required: true,
    },
    lastDate: {
        desc: 'last date',
        type: String,
        required: true,
    },
    isSubmitted: {
        desc: 'is Submitted',
        type: Boolean,
        default: false,
        required: true,
    },
    projectValue: {
        desc: 'project Value',
        type: String,
        required: true,
    },
    teamAssigned: [{
        employeeId: String,
    }]

},
    {
        strict: true,
        versionKey: false,
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    });
module.exports = mongoose.model('Projects', schema);