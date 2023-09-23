import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ContextProvider } from "./contextState";
import ListComponent from "./src/components/ListComponent";
import DetallePlato from './src/components/DetallePlato';
import { useState } from "react";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListChild from './src/components/Listchild';
import Menu from './src/components/Menu';
import LoginScreen from './src/components/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const onPress = () => {
    console.log("on press");

  };

  return (
    <ContextProvider>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="login"
            component={LoginScreen}
          />

          <Stack.Screen
            name="Home"
            component={Menu}
          />

          <Stack.Screen
            name="Buscador"
            component={ListComponent}
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
