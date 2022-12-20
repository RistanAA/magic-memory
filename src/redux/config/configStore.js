import { configureStore } from '@reduxjs/toolkit'
import gameProgress from '../modules/gameProgress'

export const store = configureStore({
  reducer: {
    gameProgress
  },
})