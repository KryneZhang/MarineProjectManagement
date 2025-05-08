import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // 在这里添加你的 reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 