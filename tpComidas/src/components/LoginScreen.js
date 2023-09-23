import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { login } from '../services/apiService.js'; // Utiliza tu función de inicio de sesión
import { ActionTypes, useContextState } from "../../contextState";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { contextState, setContextState } = useContextState();

    const handleLogin = async () => {
        const usuario = {
            email: email,
            password: password
        }
        if (!email || !password) {
            Alert.alert('Campos vacíos', 'Por favor, complete todos los campos.');
            return;
        }

        setLoading(true);

        try {
            const response = await login(usuario);
            setContextState({ newValue: true, type: ActionTypes.setUserToken })
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            Alert.alert('Error de inicio de sesión', 'Ha ocurrido un error al iniciar sesión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.loginButtonText}>Ingresar</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#00ff00" />}
        </View>
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
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft: 10,
    },
    loginButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        width: '80%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default LoginScreen;