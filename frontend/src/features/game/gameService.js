import axios from 'axios'

const API_URL = '/api/game/'

const getConfig = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return config
}
const createGame = async (token) => {
    const config = getConfig(token)
    const response = await axios.post(API_URL+'create', {}, config)
    return response.data
}

const joinGame = async (gameCode, token ) => {
    const config = getConfig(token)
    const response = await axios.post(API_URL + 'join', { gameCode }, config)
    return response.data
}

const startGame = async (gameId, token) => {
    const config = getConfig(token)
    const response = await axios.post(API_URL + 'start', { gameId }, config)
    return response.data
}

const getGame = async (gameId, token) => {
    const config = getConfig(token)
    const response = await axios.get(API_URL + gameId, config)
    return response.data
}

const getCurrentQuestion = async (gameId, token) => {
    const config = getConfig(token)
    const response = await axios.get(API_URL + gameId + '/question', config)
    return response.data
}

const gameService = {
    createGame,
    joinGame,
    startGame,
    getGame,
    getCurrentQuestion
}

export default gameService;