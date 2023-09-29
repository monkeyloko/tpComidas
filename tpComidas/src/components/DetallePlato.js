import * as React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from "react";
import { ActionTypes, useContextState } from "../../contextState";
import { getComidasById } from '../services/apiService';
import { ListChildStyle } from './styles';

const DetallePlato = ({ navigation, route }) => {
  const [plato, setPlato] = useState({});
  const [platoExistente, setPlatoExistente] = useState(false);
  const [cantidadPlatos, setCantidadPlatos] = useState(0);
  const { contextState, setContextState } = useContextState();

  const showAlert = () =>
    Alert.alert(
      'Error',
      'El plato ya se encuentra en el menú',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => Eliminar(),
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

  useEffect(() => {
    setContextState({ newValue: true, type: ActionTypes.setLoading });

    getComidasById(route.params.itemId)
      .then((response) => {
        setContextState({ newValue: false, type: ActionTypes.setLoading });
        setPlato(response);
        console.log(response);
        setContextState({ newValue: true, type: ActionTypes.setLoading });
        // Verifica si el plato está en el menú al cargar la pantalla
        setContextState({})
        const menuActual = Array.isArray(contextState?.menu) ? contextState.menu : [];
        const platoExistente = menuActual.find((item) => item.id === response.id);

        if (platoExistente) {
          setPlatoExistente(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setContextState({ newValue: false, type: ActionTypes.setLoading });
      })
      .finally(() => {
        setContextState({ newValue: false, type: ActionTypes.setLoading }); // Aquí detenemos la carga
      });
  }, []);

  const Eliminar = () => {
    const menuActual = Array.isArray(contextState?.menu) ? contextState.menu : [];

    // Filtra el plato existente para eliminarlo del menú
    const nuevoMenu = menuActual.filter((item) => item.id !== plato.id);
    setContextState({ newValue: nuevoMenu, type: ActionTypes.setMenu });
    console.log("Plato eliminado del menú");
    setCantidadPlatos(cantidadPlatos - 1);
    navigation.navigate("Home");
  };

  const onPressed = () => {
    const menuActual = Array.isArray(contextState?.menu) ? contextState.menu : [];

    const platoExistente = menuActual.find((item) => item.id === plato.id);

    if (menuActual.length >= 4) {
      Alert.alert('Error', 'El menú ya tiene 4 platos. No se puede agregar más.');
    } else if (plato.vegan) {
      const veganos = menuActual.filter((item) => item.vegan);
      if (veganos.length >= 2) {
        Alert.alert('Error', 'Ya hay 2 platos veganos en el menú. No se puede agregar más.');
      } else {
        agregarPlato(menuActual);
      }
    } else {
      const noVeganos = menuActual.filter((item) => !item.vegan);
      if (noVeganos.length >= 2) {
        Alert.alert('Error', 'Ya hay 2 platos no veganos en el menú. No se puede agregar más.');
      } else {
        agregarPlato(menuActual);
      }
    }
  };

  const agregarPlato = (menuActual) => {
    const nuevoMenu = [...menuActual, plato];
    setContextState({ newValue: true, type: ActionTypes.setLoading })
    setContextState({ newValue: nuevoMenu, type: ActionTypes.setMenu });
    console.log("Plato agregado al menú");
    setCantidadPlatos(cantidadPlatos + 1);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {contextState.loading && <ActivityIndicator size="large" color="#00ff00" />}

      <Text style={styles.title}>{plato.title}</Text>

      <Image
        style={styles.image}
        source={{ uri: plato.image }}
      />
      <Text style={ListChildStyle.title}>Precio de la porción: {plato.pricePerServing}</Text>
      <Text style={ListChildStyle.title}>{plato.vegan ? "Si" : "No"} es vegano</Text>

      {platoExistente ? (
        <TouchableOpacity style={styles.ButtonEliminar} onPress={() => Eliminar()}>
          <Text style={styles.ButtonTextEliminar}>Eliminar del menú</Text>
        </TouchableOpacity>        
      ) : (
        // Deshabilitar el botón "Agregar" si el plato no se ha cargado correctamente
        !contextState.loading ? (
          <TouchableOpacity style={styles.Button} onPress={() => onPressed()}>
            <Text style={styles.ButtonText}>Agregar</Text>
          </TouchableOpacity>
        ) : null
      )}

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
    marginTop: 10,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ButtonEliminar: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ButtonTextEliminar: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetallePlato;
