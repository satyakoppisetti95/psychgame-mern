const mongoose = require('mongoose')
const gameSchema = mongoose.Schema(
    {
        host: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        code: {type: String, required: true},
        players: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        isWaiting: {type: Boolean, default: true},
        isStarted: {type: Boolean, default: false},
        isFinished: {type: Boolean, default: false},
        winner: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required:false},
        numOfQuestions: {type: Number, default: 10},
        currentQuestion: {type: Number, default: 0},
        category: {type: String, default: 'any'}
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Game', gameSchema)