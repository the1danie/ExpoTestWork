import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleFavorite, saveFavoritesToStorage } from '../store/favoriteSlices';
import type { RootState } from '../store/store';
import eventsRu from '../../assets/events_ru.json';
import eventsEn from '../../assets/events_en.json';
import i18n from "i18next";

// Маппинг изображений
const imageMapping: { [key: string]: any } = {
    imagine_dragons: require('../../assets/favicon.png'),
    street_food: require('../../assets/favicon.png'),
    art_exhibition: require('../../assets/favicon.png'),
};

const SecondScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites);
    const events = i18n.language.startsWith('ru') ? eventsRu : eventsEn;
    const favoriteEvents = events.filter(event => favorites.includes(event.id));

    // Функция для удаления из избранного
    const handleToggleFavorite = (eventId: number) => {
        dispatch(toggleFavorite(eventId));
        dispatch(saveFavoritesToStorage(favorites.filter(id => id !== eventId)) as any);
    };

    return (
        <View style={styles.container}>
            {favoriteEvents.length > 0 ? (
                <ScrollView style={styles.eventsContainer}>
                    {favoriteEvents.map(event => (
                        <View key={event.id} style={styles.eventCard}>
                            <Image
                                source={imageMapping[event.image]}
                                style={styles.eventImage}
                            />
                            <View style={styles.eventDetails}>
                                <Text style={styles.eventTitle}>{event.title}</Text>
                                <Text style={styles.eventDate}>{event.date}</Text>
                                <Text style={styles.eventDescription}>{event.description}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleToggleFavorite(event.id)}
                                style={styles.favoriteButton}
                            >
                                <Ionicons name="heart" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.noResultsText}>{t('not_found')}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    eventsContainer: {
        width: '90%',
    },
    eventCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    eventImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    eventDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventDate: {
        fontSize: 14,
        color: 'blue',
    },
    eventDescription: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
    },
    favoriteButton: {
        padding: 10,
    },
    noResultsText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default SecondScreen;
