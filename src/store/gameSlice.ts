/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Leaderboard {
  counter: number,
  score: number
}

// Define a type for the slice state
interface GameState {
  leaderboard: Leaderboard[];
}

// Define the initial state using that type
const initialState: GameState = {
  leaderboard: [{ counter: 1, score: 5 }, { counter: 2, score: 3 }, { counter: 3, score: 4 }],
};

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<any>) => {
      state.leaderboard.push(action.payload);
    },
  },
});

export const { addScore } = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export default gameSlice.reducer;
