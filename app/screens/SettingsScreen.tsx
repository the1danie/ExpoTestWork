import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18next from '../localization/i18n';
import colors from "../constants/colors";

const SettingsScreen = () => {
    const { t } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18next.language);

    // Функция смены языка
    const changeLanguage = (lang: string) => {
        i18next.changeLanguage(lang).then(() => {
            setCurrentLang(lang);
        });
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => changeLanguage('ru')}>
                <Text style={[styles.languageText, currentLang === 'ru' && styles.activeText]}>
                    Русский
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeLanguage('en')}>
                <Text style={[styles.languageText, currentLang === 'en' && styles.activeText]}>
                    English
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.mediumGray,
        marginVertical: 10,
    },
    activeText: {
        color: 'green', // Цвет активного языка
    },
});

export default SettingsScreen;
