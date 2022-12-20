import { createSlice } from "@reduxjs/toolkit"

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