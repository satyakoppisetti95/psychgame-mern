const mongoose = require('mongoose')
const questionResponseSchema = mongoose.Schema(
    {
        question: {type: mongoose.Schema.Types.ObjectId, ref: 'GameQuestion', required: true},
        game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true},
        player: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        response: {type: String, required: true},
        isCorrect: {type: Boolean, required: true},
        pickedResponseOf: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required:false}
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('QuestionResponse', questionResponseSchema)