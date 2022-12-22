import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    cardImages: [],
    // cardImages: [
    //     { src: "/img/success-kid.png", srcId: "1", matched: false },
    //     { src: "/img/potion-1.png", srcId: "2", matched: false },
    //     { src: "/img/ring-1.png", srcId: "3", matched: true },
    //     { src: "/img/scroll-1.png", srcId: "4", matched: false },
    //     { src: "/img/twitter.png", srcId: "5", matched: false },
    //     { src: "/img/sword-1.png", srcId: "6", matched: false },
    //     { src: "/img/success-kid.png", srcId: "1", matched: false },
    //     { src: "/img/potion-1.png", srcId: "2", matched: false },
    //     { src: "/img/ring-1.png", srcId: "3", matched: true },
    //     { src: "/img/scroll-1.png", srcId: "4", matched: false },
    //     { src: "/img/twitter.png", srcId: "5", matched: false },
    //     { src: "/img/sword-1.png", srcId: "6", matched: false },
    //     ],
    status: "progress",
    timeLeft: 0
}

let url = 'https://magic-memory-back-cq2guhwqd-ristanaa.vercel.app/api/'
// let url = 'http://localhost:5000/api/'

export const sendScore = createAsyncThunk(
    'sendScore',
    async (payload, thunkApi) => {
        try {
            await axios.post(url + 'score',payload)
            console.log("success")
            // return thunkApi.fulfillWithValue(data.cards)
        } catch (error) {
            return console.log(error.message);
        }
    }
)

const gameProgress = createSlice({
    name: 'gameProgress',
    initialState,
    reducers: {
        addProgress: (state, action) => {
            state.cardImages = action.payload.cards
            state.timeLeft = (action.payload.minutes * 60) + action.payload.seconds
        }
    }
})

export const { addProgress } = gameProgress.actions

export default gameProgress.reducer