import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { getComidasBySearch } from "../services/apiService.js";
import { ActionTypes, useContextState } from "../../contextState";
import ListChild from "./Listchild";

const Menu = ({ navigation }) => {
    const { contextState, setContextState } = useContextState();
    const [pressed, setPressed] = useState({});
    const [precioTotal, setPrecioTotal] = useState(0);
    const [promedioHS, setPromedioHS] = useState(0);

    const calcularPrecioTotal = () => {
        const menu = contextState?.menu ?? [];
        const total = menu.reduce((acc, plato) => acc + plato.pricePerServing, 0);
        return total;
    };

    const calcularPromedioHS = () => {
        const menu = contextState?.menu ?? [];

        if (menu.length === 0) {
            return 0; // Devuelve 0 si el menú está vacío para evitar divisiones por cero.
        }

        const totalHealthScore = menu.reduce((acumulador, plato) => {
            return acumulador + plato.healthScore;
        }, 0);

        return totalHealthScore / menu.length;
    }


    useEffect(() => {
        // Calcula el precio total cuando cambia el menú
        const total = calcularPrecioTotal();
        const promedioHS = calcularPromedioHS()
        setPromedioHS(promedioHS)
        setPrecioTotal(total);
    }, [contextState.menu]);


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
            <Text>
                Precio Total: {precioTotal}
            </Text>
            <Text>Promedio de HealthScore en el menú: {promedioHS}</Text>

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