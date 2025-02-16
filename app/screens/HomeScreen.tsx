import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from "../constants/colors";
import { toggleFavorite, saveFavoritesToStorage, setFavorites, loadFavoritesFromStorage } from '../store/favoriteSlices';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../store/store';
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import eventsRu from '../../assets/events_ru.json';
import eventsEn from '../../assets/events_en.json';

const imageMapping: { [key: string]: any } = {
    imagine_dragons: require('../../assets/favicon.png'),
    street_food: require('../../assets/favicon.png'),
    art_exhibition: require('../../assets/favicon.png'),
};

const HomeScreen = () => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites);
    const events = i18n.language.startsWith('ru') ? eventsRu : eventsEn;

    useEffect(() => {
        dispatch(loadFavoritesFromStorage() as any);
    }, []);

    const handleToggleFavorite = (eventId: number) => {
        dispatch(toggleFavorite(eventId));
        dispatch(saveFavoritesToStorage([...favorites, eventId]) as any);
    };

    const filteredEvents = events.filter((event) => {
        const searchLower = searchText.toLowerCase().trim();
        const searchDateLower = searchDate.trim(); // Удаляем пробелы, но не приводим к нижнему регистру

        const eventTags = Array.isArray(event.tags) ? event.tags : [];
        const matchesTag = eventTags.some((tag) =>
            tag.toLowerCase().trim().includes(searchLower)
        );

        const matchesTitle = event.title.toLowerCase().includes(searchLower);

        // Дата теперь ищется по частичному совпадению
        const matchesDate = searchDate ? event.date.includes(searchDateLower) : true;

        return (matchesTag || matchesTitle) && matchesDate;
    });


    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color="grey" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={t('find_task')}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="calendar" size={24} color="grey" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder={t('filter_data')}
                    value={searchDate}
                    onChangeText={setSearchDate}
                />
            </View>

            <ScrollView style={styles.eventsContainer}>
                <Text style={styles.sectionTitle}>{t('announce_event')}</Text>

                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
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
                                <Ionicons
                                    name={favorites.includes(event.id) ? "heart" : "heart-outline"}
                                    size={24}
                                    color={favorites.includes(event.id) ? "red" : "gray"}
                                />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noResultsText}>{t('not_found')}</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        width: '90%',
        marginTop: 10,
        paddingHorizontal: 10,
        height: 50,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 8,
    },
    eventsContainer: {
        width: '90%',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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

export default HomeScreen;
