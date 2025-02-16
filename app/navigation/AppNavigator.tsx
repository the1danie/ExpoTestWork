import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SecondScreen from '../screens/SecondScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Для иконок
import { useTranslation } from 'react-i18next';
import SettingsScreen from "../screens/SettingsScreen"; // Для перевода



const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const { t } = useTranslation(); // Хук для доступа к переводам

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'Second') {
                            iconName = 'apps';
                        } else {
                            iconName = 'settings';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: t('home') }} // Переводится только заголовок
                />
                <Tab.Screen
                    name="Second"
                    component={SecondScreen}
                    options={{ title: t('second') }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ title: t('settings') }}
                />
            </Tab.Navigator>
        </NavigationContainer>

    );
};

export default AppNavigator;
