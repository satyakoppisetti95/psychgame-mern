import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import gameService from './gameService'

const constructErrorMsg = (error) => {
    const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString()
    return message
}

const initialState = {
    game: null,
    isHost: false,
    gameStarted: false,
    gameEnded: false,
    waitingForPlayers: false,
    waitingForResponses: false,
    showQuestion: false,
    isError: null,
    isSuccess: null,
    message: null,
    isLoading: false,
    players: [],
}


export const createGame = createAsyncThunk(
    'game/createGame',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await gameService.createGame(token)
        } catch (error) {
            const message = constructErrorMsg(error)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const joinGame = createAsyncThunk(
    'game/joinGame',
    async (gameCode, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await gameService.joinGame(gameCode, token)
        } catch (error) {
            const message = constructErrorMsg(error)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getGame = createAsyncThunk(
    'game/getGame',
    async (gameId, thunkAPI) => {
        try {
            console.log("getGame called")
            const token = thunkAPI.getState().auth.user.token
            return await gameService.getGame(gameId, token)
        } catch (error) {
            const message = constructErrorMsg(error)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        reset: (state) => {
            console.log("resetting game state")
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGame.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGame.fulfilled, (state, action) => {
                state.game = action.payload
                state.isHost = true
                state.waitingForPlayers = true
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createGame.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(joinGame.pending, (state) => {
                state.isLoading = true
            })
            .addCase(joinGame.fulfilled, (state, action) => {
                state.game = action.payload._id
                state.isHost = false
                state.waitingForPlayers = true
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(joinGame.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGame.fulfilled, (state, action) => {
                state.players = action.payload.players
                state.game = action.payload
                state.isError = false // todo: this is a hack
                state.message = null // todo: this is a hack
            })
    },
})

export const { reset } = gameSlice.actions
export default gameSlice.reducer