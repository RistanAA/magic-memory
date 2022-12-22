import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    cards: []
}

let url = 'http://localhost:5000/api/'
export const getCards = createAsyncThunk(
    'getCards',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(url + 'cards')
            return thunkApi.fulfillWithValue(data.cards)
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const cardSlice = createSlice({
    name: 'cardSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCards.fulfilled, (state, action) => {
                state.cards = action.payload
            })
    }
})

export default cardSlice.reducer