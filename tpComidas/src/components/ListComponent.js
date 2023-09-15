import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, Text } from "react-native";
import { getComidas, getComidasBySearch } from "../services/apiComida";
import { ListComponentStyle } from "./styles";
import ListChild from "./Listchild";
import { ActionTypes, useContextState } from "../../contextState";

const ListComponent = ({ search }) => {
    const { contextState, setContextState } = useContextState();
    const [pressed, setPressed] = useState({});
    const renderItem = ({ item, index }) => (
      <ListChild
        item={item}
        index={index}
        pressed={pressed}
        setPressed={setPressed}
      />
    );
  
    useEffect(() => {
      setContextState({ newValue: true, type: ActionTypes.setLoading });
      getComidasBySearch(search)
        .then((response) => {
          setContextState({ newValue: false, type: ActionTypes.setLoading });
          setContextState({ newValue: response, type: ActionTypes.setComidas });
          console.log()
        })
        .catch((error) => {
          console.log(error);
          setContextState({ newValue: false, type: ActionTypes.setLoading });
        });
      return;
    }, []);
  
    return (
      <SafeAreaView style={ListComponentStyle.container}>
        {contextState?.loading && (
          <ActivityIndicator size="large" color="#00ff00" />
        )}
        <Text>{search}</Text>
        <FlatList
        data={contextState?.allComidas ?? []}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    );
  };
  
  export default ListComponent;