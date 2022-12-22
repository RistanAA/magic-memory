import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    scores: []
}

let url = 'https://magic-memory-back-cq2guhwqd-ristanaa.vercel.app/api/'
// let url = 'http://localhost:5000/api/'
export const getScores = createAsyncThunk(
    'getScores',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(url + 'score')
            return thunkApi.fulfillWithValue(data.score)
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const leaderboardSlice = createSlice({
    name: 'leaderboardSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getScores.fulfilled, (state, action) => {
                state.scores = action.payload
            })
    }
})

export default leaderboardSlice.reducer