import React from 'react';
import AppNavigator from "./app/navigation/AppNavigator";
import { Provider } from 'react-redux';
import { store } from './app/store/store';
export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
