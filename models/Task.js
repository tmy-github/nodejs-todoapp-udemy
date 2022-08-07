const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Input Task Name"],
        trim: true,
        maxlength: [20, "Please Input Task Name within 20 letters"],

    },
    completed: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("Task", TaskSchema);