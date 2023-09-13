import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, Text } from "react-native";
import { getComidas, getComidasBySearch } from "../services/apiComida";
//import { ListComponentStyle } from "./styles";
import ListChild from "./Listchild";
import { useContextState } from "../../contextState";

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
      setContextState({ newValue: true, type: "SET_LOADING" });
      getComidasBySearch(search)
        .then((response) => {
          setContextState({ newValue: false, type: "SET_LOADING" });
          setContextState({ newValue: response, type: "SET_COMIDAS" });
        })
        .catch((error) => {
          console.log(error);
          setContextState({ newValue: false, type: "SET_LOADING" });
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