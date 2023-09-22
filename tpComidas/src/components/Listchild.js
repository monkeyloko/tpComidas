import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getComidasById } from "../services/apiComida";
import { ListChildStyle } from "./styles";
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ListChild = ({ navigation, item, pressed, setPressed, index }) => {
  const [comida, setComida] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setComida(null);
    console.log
  }, [pressed]);

  const onViewPressed = () => {
    setLoading(true);try{
      

     console.log(item.id)
    navigation.navigate('detalle', { itemId: item.id }) 
    }
      catch(error) {
        setLoading(false);
        console.log("dsdsdsd",error);
      };
    setPressed(index === pressed ? null : index);
  };
  return ( 
    <TouchableOpacity onPress={onViewPressed}>
      {loading && <ActivityIndicator size="large" color="#00ff00" />}
      <View
        style={[
          ListChildStyle.item,
          { backgroundColor: pressed === index ? "#00ffff" : "#ececec" },
        ]}
      >
        <Image
          style={ListChildStyle.tinyLogo}
          source={{
            uri: item.image,
          }}
        />
        <Text style={ListChildStyle.title}>{item.title}</Text>
        {comida && pressed === index && (
          <View
            style={[
              ListChildStyle.item,
              { backgroundColor: pressed === index ? "#00ffff" : "#ececec" },
            ]}
          >
            <Text></Text>
          </View>
        )}
      
      </View>
    </TouchableOpacity>
  );
};

export default ListChild;