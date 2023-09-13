import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getComidasById } from "../services/apiComida";
//import { ListChildStyle } from "./styles";

const ListChild = ({ item, pressed, setPressed, index }) => {
  const [comida, setComida] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setComida(null);
  }, [pressed]);

  const onViewPressed = () => {
    setLoading(true);
    getComidasById(item.id)
      .then((response) => {
        setLoading(false);
        setComida(response);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
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
            <Text>{comida.spoonacularScore}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListChild;