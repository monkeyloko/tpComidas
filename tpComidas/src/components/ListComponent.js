import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, TextInput, View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { getComidasBySearch } from "../services/apiService.js";
import { ActionTypes, useContextState } from "../../contextState";
import ListChild from "./Listchild";

const ListComponent = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [pressed, setPressed] = useState({});
  const [search, setSearch] = useState("pizza");
  const [hovered, setHovered] = useState(false);
  const scaleValue = new Animated.Value(1);

  const handleSearch = () => {
    if (search.length >= 2) {
      setContextState({ newValue: true, type: ActionTypes.setLoading });
      getComidasBySearch(search)
        .then((response) => {
          setContextState({ newValue: false, type: ActionTypes.setLoading });
          setContextState({ newValue: response, type: ActionTypes.setComidas });
        })
        .catch((error) => {
          console.log(error);
          setContextState({ newValue: false, type: ActionTypes.setLoading });
        });
    }
  };

  const renderItem = ({ item, index }) => (
    <ListChild
      item={item}
      index={index}
      pressed={pressed}
      setPressed={setPressed}
      navigation={navigation}
    />
  );

  const handleHover = () => {
    setHovered(!hovered);

    Animated.spring(scaleValue, {
      toValue: hovered ? 1 : 1.05,
      useNativeDriver: true,
    }).start();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Buscar Comida</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar comida"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <TouchableOpacity
        style={[styles.searchButton, { transform: [{ scale: scaleValue }] }]}
        onPress={handleSearch}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={contextState?.allComidas ?? []}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ListComponent;
