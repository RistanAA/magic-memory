import { configureStore } from '@reduxjs/toolkit'
import gameProgress from '../modules/gameProgress'
import cardSlice from '../modules/cardSlice'
import leaderboardSlice from '../modules/leaderboardSlice'

export const store = configureStore({
  reducer: {
    gameProgress,
    cardSlice,
    leaderboardSlice
  },
})