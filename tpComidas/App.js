import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ContextProvider } from "./contextState";
import ListComponent from "./src/components/ListComponent";
import { useState } from "react";
export default function App() {
  const [search, setSearch] = useState("pizza");
  const onPress = () => {
    console.log("on press");
    setSearch("pizza");
  };
  return (
    <ContextProvider>
    <View style={styles.container}>
     
      <TouchableOpacity onPress={onPress}></TouchableOpacity>
      <ListComponent search={search}></ListComponent>
      <StatusBar style="auto"/>
    </View>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
