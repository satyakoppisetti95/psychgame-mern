const mongoose = require('mongoose')

const gameQuestionSchema = mongoose.Schema(
    {
        question: {type: String, required: true},
        correctAnswer: {type: String, required: true},
        incorrectAnswers: [{type: String, required: true}],
        category: {type: String, required: true},
        difficulty: {type: String, required: true},
        type: {type: String, required: true},
        game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true},
        index: {type: Number, required: true}
    },
    {
        timestamps: true,
    }
)

exports.GameQuestion = mongoose.model('GameQuestion', gameQuestionSchema)