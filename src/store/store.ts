import { configureStore } from '@reduxjs/toolkit'
// import schedulerReducer from '../features/scheduler/store/schedulerSlice'

export const store = configureStore({
  reducer: {
    // scheduler: schedulerReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch