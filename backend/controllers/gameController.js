const asyncHandler = require('express-async-handler')
const gameModel = require('../models/gameModel');
const questionModel = require('../models/questionModel');
const questionResponseModel = require('../models/questionResponseModel');
const userModel = require('../models/userModel');
const {Types} = require('mongoose');

// @desc    Create a new game
// @route   POST /api/games
// @access  Private

//function to create random 8 digit game code
const generateGameCode = () => {
    let gameCode = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 8; i++) {
        gameCode += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return gameCode;
};

exports.createGame = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.user._id);
    if(!user){
        throw new Error('User not found');
    }
    if(user.isInGame){
        throw new Error('User is already in a game');
    }
    const game = await gameModel.create({
        host: req.user._id,
        code: generateGameCode(),
        players: [req.user._id],
    });

    user.isInGame = true;
    user.game = game._id;
    await user.save();

    res.status(201).json(game);
});

exports.joinGame = asyncHandler(async (req, res) => {
    const {gameCode} = req.body;
    const game = await gameModel.findOne({code: gameCode});
    if(!game){
        throw new Error('Game not found');
    }
    if(game.isStarted || game.isFinished){
        throw new Error('Game has already started or finished');
    }
    const user = await userModel.findById(req.user._id);
    if(user.isInGame){
        throw new Error('Cannot join game, user is already in a game');
    }
    game.players.push(user._id);
    await game.save();

    user.isInGame = true;
    user.game = game._id;
    await user.save();

    res.status(200).json(game);
});

exports.startGame = asyncHandler(async (req, res) => {
    if(!req.body.id){
        throw new Error('Invalid request');
    }
    const game = await gameModel.findById(req.body.id);
    if(!game){
        throw new Error('Game not found');
    }
    if(game.host.toString() !== req.user._id.toString()){
        throw new Error('User is not the host of the game');
    }
    if(game.isStarted || game.isFinished){
        throw new Error('Game has already started or finished');
    }
    if(game.players.length < 2){
        throw new Error('Cannot start game, not enough players');
    }
    let numOfQuestions = req.body.numOfQuestions || 10;
    let category = req.body.category || '';
    let difficulty = req.body.difficulty || 'medium';
    game.isWaiting = false;
    game.isStarted = true;
    game.isFinished = false;
    game.numOfQuestions = numOfQuestions;
    game.category = category;
    game.curentQuestion = 0;
    await game.save();

    //get question from opentdb api
    const response = await fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&type=multiple&difficulty=${difficulty}`);
    const questions = await response.json();
    let questionIndex = 0;
    for(const question of questions.results){
        const gameQuestion = await questionModel.create({
            game: game._id,
            question: question.question,
            correctAnswer: question.correct_answer,
            incorrectAnswers: question.incorrect_answers,
            category: question.category,
            difficulty: question.difficulty,
            type: question.type,
            index: questionIndex,
        });
        questionIndex++;
    }

    res.status(200).json(game);
});

exports.getGame = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const query = [
        {
            $match: {
                _id: Types.ObjectId(req.params.id),
            },  
        },
        {
            $lookup: {
                from: 'users',
                localField: 'players',
                foreignField: '_id',
                as: 'players',
            },
        },
        {
            $project: {
                _id: 1,
                code: 1,
                host: 1,
                players: 1,
                isWaiting: 1,
                isStarted: 1,
                isFinished: 1,
                numOfQuestions: 1,
                category: 1,
                difficulty: 1,
                currentQuestion: 1,
                createdAt: 1,
            },
        },
    ]
    const game = await gameModel.aggregate(query);
    if(!game){
        throw new Error('Game not found');
    }
    res.status(200).json(game);
});


exports.getCurrentQuestion = asyncHandler(async (req, res) => {
    const game = await gameModel.findById(req.params.id);
    if(!game){
        throw new Error('Game not found');
    }
    if(!game.isStarted || game.isFinished){
        throw new Error('Game has not started or has finished');
    }
    const question = await questionModel.findOne({game: game._id, index: game.currentQuestion}).select('-game -correctAnswer -incorrectAnswers -createdAt -updatedAt -__v');
    if(!question){
        throw new Error('Question not found');
    }
    res.status(200).json(question);
});
