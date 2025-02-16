import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

// Переводы
const resources = {
    en: {
        translation: {
            welcome: 'Welcome to the App',
            home: 'Home',
            second: 'Favorites',
            settings: 'Settings',
            find_task: 'Find task by tag',
            filter_data: 'Filter by date (YYYY-MM-DD)',
            announce_event: 'Announce event',
            not_found: 'No results found',
        },
    },
    ru: {
        translation: {
            welcome: 'Добро пожаловать в приложение',
            home: 'Главная',
            second: 'Избранное',
            settings: 'Настройки',
            find_task: 'Найти событие по тегу',
            filter_data: 'Фильтр по дате (YYYY-MM-DD)',
            announce_event: 'Анонс события',
            not_found: 'Ничего не найдено',
        },
    },
};



i18n
    .use(initReactI18next) // Подключаем i18next для React
    .init({
        resources,
        lng: 'ru', // Устанавливаем язык устройства
        fallbackLng: 'ru', // Язык по умолчанию
        interpolation: {
            escapeValue: false, // React уже экранирует вывод
        },
    });

export default i18n; // Экспортируем i18n
