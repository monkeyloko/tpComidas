import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";
import { getComidasBySearch } from "../services/apiService.js";
import { ActionTypes, useContextState } from "../../contextState";
import ListChild from "./Listchild";

const Menu = ({ navigation }) => {
    const { contextState, setContextState } = useContextState();
    const [pressed, setPressed] = useState({});
    const [precioTotal, setPrecioTotal] = useState(0);
    const [promedioHS, setPromedioHS] = useState(0);
    const [hovered, setHovered] = useState(false);
    const scaleValue = new Animated.Value(1);

    const calcularPrecioTotal = () => {
        const menu = contextState?.menu ?? [];
        const total = menu.reduce((acc, plato) => acc + plato.pricePerServing, 0);
        return total.toFixed(2);
    };

    const calcularPromedioHS = () => {
        const menu = contextState?.menu ?? [];

        if (menu.length === 0) {
            return 0;
        }

        const totalHealthScore = menu.reduce((acumulador, plato) => {
            return acumulador + plato.healthScore;
        }, 0);

        const promedio = totalHealthScore / menu.length;
        return promedio.toFixed(2);
    }

    useEffect(() => {
        const total = calcularPrecioTotal();
        const promedioHS = calcularPromedioHS();
        setPromedioHS(promedioHS);
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
        navigation.navigate("Buscador");
    }

    const handleHover = () => {
        setHovered(!hovered);

        Animated.spring(scaleValue, {
            toValue: hovered ? 1 : 1.05,
            useNativeDriver: true,
        }).start();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Menú</Text>
                <FlatList
                    data={contextState?.menu ?? []}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.title}
                />
                <Text style={styles.total}>Precio Total: {precioTotal}</Text>
                <Text style={styles.promedio}>Promedio de HealthScore en el menú: {promedioHS}</Text>

                <TouchableOpacity
                    style={[styles.button, { transform: [{ scale: scaleValue }] }]}
                    onPress={() => onPressed()}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                >
                    <Text style={styles.buttonText}>Ir al Buscador</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
    },
    total: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#007bff',
    },
    promedio: {
        fontSize: 20,
        marginTop: 10,
        color: '#007bff',
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        cursor: 'pointer',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Menu;
