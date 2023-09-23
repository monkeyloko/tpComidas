import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { getComidasBySearch } from "../services/apiService.js";
import { ActionTypes, useContextState } from "../../contextState";
import ListChild from "./Listchild";

const ListComponent = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [pressed, setPressed] = useState({});
  const [search, setSearch] = useState("pizza");

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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar comida"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListComponent;