import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch, RootState } from './store'; // Импорт типов Redux Store

const FAVORITES_KEY = 'favorites';

// Функция для загрузки избранных событий из AsyncStorage
const loadFavorites = async (): Promise<number[]> => {
    try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error('Ошибка загрузки избранных событий:', error);
        return [];
    }
};

// Определяем начальное состояние
type FavoritesState = number[];
const initialState: FavoritesState = [];

// Создаём slice
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<number[]>) => action.payload, // Инициализация из AsyncStorage
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const eventId = action.payload;
            return state.includes(eventId) ? state.filter(id => id !== eventId) : [...state, eventId];
        },
    },
});

// Экспортируем экшены
export const { setFavorites, toggleFavorite } = favoritesSlice.actions;

// Функция для сохранения в AsyncStorage
export const saveFavoritesToStorage = (favorites: number[]) => async (dispatch: AppDispatch) => {
    try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error('Ошибка сохранения избранных событий:', error);
    }
};

// Функция для загрузки из AsyncStorage
export const loadFavoritesFromStorage = () => async (dispatch: AppDispatch) => {
    const favorites = await loadFavorites();
    dispatch(setFavorites(favorites));
};

// Экспорт редюсера
export default favoritesSlice.reducer;
