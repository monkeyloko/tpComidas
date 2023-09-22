import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ContextProvider } from "./contextState";
import ListComponent from "./src/components/ListComponent";
import DetallePlato from './src/components/DetallePlato';
import { useState } from "react";
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListChild from './src/components/Listchild';

const Stack = createNativeStackNavigator();

export default function App() {
 
  const onPress = () => {
    console.log("on press");

  };
  
  return (
    <ContextProvider>
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={ListComponent}
          
        />

        <Stack.Screen
          name="list"
          component={ListChild}
          
        /> 
        
        <Stack.Screen
          name="detalle"
          component={DetallePlato}
          
        /> 
        
   
    </Stack.Navigator>
    </NavigationContainer>
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
