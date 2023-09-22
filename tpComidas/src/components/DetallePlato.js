import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import { ActionTypes, useContextState } from "../../contextState";
import { getComidasById } from '../services/apiComida';
import { ListChildStyle } from './styles';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const DetallePlato = ({navigation, route}) =>{
    const [plato, setPlato] = useState({})
    const { contextState, setContextState } = useContextState();

    useEffect(() => {
       
          setContextState({ newValue: true, type: ActionTypes.setLoading });
        getComidasById(route.params.itemId)
          .then((response) => {
            setContextState({ newValue: false, type: ActionTypes.setLoading });
            setPlato(response)
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
            setContextState({ newValue: false, type: ActionTypes.setLoading });
          });
        
        
        return;
      }, []);


    return (
       <View>        <Text style={ListChildStyle.title}>{plato.title}</Text>
        <Image
        style={ListChildStyle.bigLogo}
        source={{ uri: plato.image }}
      />
        </View>


    )
  
}
  export default DetallePlato;