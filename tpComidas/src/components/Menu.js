import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { getComidasBySearch } from "../services/apiService.js";
import { ActionTypes, useContextState } from "../../contextState";
import ListChild from "./Listchild";

const Menu = ({ navigation }) => {
    const { contextState, setContextState } = useContextState();
    const [pressed, setPressed] = useState({});


    const renderItem = ({ item, index }) => (
        <ListChild
            item={item}
            index={index}
            pressed={pressed}
            setPressed={setPressed}
            navigation={navigation}
        />
    );

    const onPressed = () => {
        navigation.navigate("Buscador")
    }

    return (
        <SafeAreaView>
            <Text>
                {console.log(contextState.Menu)}
                Menu:{contextState.Menu}
            </Text>

            <FlatList
                data={contextState?.menu ?? []}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
            <TouchableOpacity style={styles.Button} onPress={() => onPressed()}>
                <Text style={styles.ButtonText}>Buscador</Text>

            </TouchableOpacity>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
    },
    Button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        width: '80%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Menu;