const express = require('express')
const router = express.Router()
const gameController = require('../controllers/gameController')
const {authorize} = require('../middleware/authMiddleware');

router.route('/:id').get(authorize,gameController.getGame)
router.route('/create').post(authorize,gameController.createGame)
router.route('/join').post(authorize,gameController.joinGame)
router.route('/start').post(authorize,gameController.startGame)
router.route('/:id/question').get(authorize,gameController.getCurrentQuestion)
module.exports = router