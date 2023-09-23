import * as React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useEffect, useState } from "react";
import { ActionTypes, useContextState } from "../../contextState";
import { getComidasById } from '../services/apiService';
import { ListChildStyle } from './styles';

const DetallePlato = ({ navigation, route }) => {
  const [plato, setPlato] = useState({})
  const { contextState, setContextState } = useContextState();

  useEffect(() => {
    setContextState({ newValue: true, type: ActionTypes.setLoading });

    getComidasById(route.params.itemId)
      .then((response) => {
        setContextState({ newValue: false, type: ActionTypes.setLoading });
        setPlato(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setContextState({ newValue: false, type: ActionTypes.setLoading });
      });
  }, []);

  const onPressed = () => {
    const menuActual = Array.isArray(contextState?.menu) ? contextState.menu : [];

    const platoExistente = menuActual.find((item) => item.id === plato.id);

    if (platoExistente) {
      console.log("El plato ya existe en el menú.");
    } else {
      const nuevoMenu = [...menuActual, plato];
      setContextState({ newValue: nuevoMenu, type: ActionTypes.setMenu });
      console.log("Plato agregado al menú");
      navigation.navigate("Home");
    }


  };

  return (
    <View style={styles.container}>
      {contextState.loading && <ActivityIndicator size="large" color="#00ff00" />}

      <Text style={styles.title}>{plato.title}</Text>

      <Image
        style={styles.image}
        source={{ uri: plato.image }}
      />
      <Text style={ListChildStyle.title}>Precio de la porcion: {plato.pricePerServing}</Text>
      <Text style={ListChildStyle.title}>{plato.vegan ? "Si" : "No"} es vegano</Text>

      <TouchableOpacity style={styles.Button} onPress={() => onPressed()}>
        <Text style={styles.ButtonText}>Agregar</Text>

      </TouchableOpacity>


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
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetallePlato;