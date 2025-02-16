import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoriteSlices';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
    },
});

// Определяем типы
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
