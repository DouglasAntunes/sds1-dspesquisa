import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { Game, GamePlatform } from './types';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const gameListPlaceholder = {
    label: "Selecione o game",
    value: null
};

const BASE_URL = "http://blackburn-pc.home.local:8080";

const mapSelectValues = (games: Game[]) => {
    return games.map(game => ({
        ...game,
        label: game.title,
        value: game.id
    }));
}

const CreateRecord = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [platform, setPlatform] = useState<GamePlatform>();
    const [selectedGame, setSelectedGame] = useState("");
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/games`)
            .then(response => {
                setAllGames(mapSelectValues(response.data));
            })
            .catch(() => Alert.alert("Erro ao obter a lista de games!"));
    }, []);

    const handleChangePlatform = (selectedPlatform: GamePlatform) => {
        setPlatform(selectedPlatform);
        const gamesByPlatform = allGames.filter((game: Game) => game.platform === selectedPlatform);
        setFilteredGames(gamesByPlatform);
    };

    const handleSubmit = () => {
        const payload = { name, age, gameId: selectedGame };
        axios.post(`${BASE_URL}/records`, payload)
            .then(() => {
                Alert.alert("Dados salvos com sucesso!");
                setName("");
                setAge("");
                setSelectedGame("");
                setPlatform(undefined);
            })
            .catch(() => Alert.alert("Erro ao salvar dados!"));
    };

    return (
        <>
            <Header />
            <View style={styles.container}>
                <TextInput style={styles.inputText}
                    placeholder="Nome"
                    placeholderTextColor="#9E9E9E"
                    onChangeText={text => setName(text)}
                    value={name}
                />
                <TextInput style={styles.inputText}
                    placeholder="Idade"
                    placeholderTextColor="#9E9E9E"
                    keyboardType="numeric"
                    maxLength={3}
                    onChangeText={text => setAge(text)}
                    value={age}
                />
                <View style={styles.platformContainer}>
                    <PlatformCard platform="PC"
                        onChange={handleChangePlatform}
                        icon="laptop"
                        activePlatform={platform}
                    />
                    <PlatformCard platform="XBOX"
                        onChange={handleChangePlatform}
                        icon="xbox"
                        activePlatform={platform}
                    />
                    <PlatformCard platform="PLAYSTATION"
                        onChange={handleChangePlatform}
                        icon="playstation"
                        activePlatform={platform}
                    />
                </View>
                <RNPickerSelect placeholder={gameListPlaceholder}
                    onValueChange = {value => setSelectedGame(value)}
                    value={selectedGame}
                    items={filteredGames}
                    style={pickerSelectStyles}
                    Icon={() => (
                        <Icon name="chevron-down" color="#9E9E9E" size={25} />
                    )}
                 />
                 <View style={styles.footer}>
                     <RectButton style={styles.button} onPress={handleSubmit}>
                         <Text style={styles.buttonText}>SALVAR</Text>
                     </RectButton>
                 </View>
            </View>
        </>
    );
};


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#ED7947',
        paddingRight: 30,
        fontFamily: "Play_700Bold",
        height: 50
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#ED7947',
        paddingRight: 30,
        fontFamily: "Play_700Bold",
        height: 50
    },
    placeholder: {
        color: '#9E9E9E',
        fontSize: 16,
        fontFamily: "Play_700Bold",
    },
    iconContainer: {
        top: 10,
        right: 12,
    }
});

const styles = StyleSheet.create({
    container: {
        marginTop: '15%',
        paddingRight: '5%',
        paddingLeft: '5%',
        paddingBottom: 50
    },
    inputText: {
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#ED7947',
        fontFamily: "Play_700Bold",
        fontSize: 16,
        paddingLeft: 20,
        marginBottom: 21
    },
    platformContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        marginTop: '15%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#00D4FF',
        flexDirection: 'row',
        borderRadius: 10,
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: "Play_700Bold",
        fontWeight: 'bold',
        fontSize: 18,
        color: '#0B1F34',
    }
});

export default CreateRecord;
