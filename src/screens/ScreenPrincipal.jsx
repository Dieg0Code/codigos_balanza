import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { TextInput, View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAotF5xJnR1pDdsSf0ePQYjjxwWqDqonNA",
    authDomain: "crud-3d1aa.firebaseapp.com",
    projectId: "crud-3d1aa",
    storageBucket: "crud-3d1aa.appspot.com",
    messagingSenderId: "486010846455",
    appId: "1:486010846455:web:aab8fa317922ba658727f2"
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const ScreenPrincipal = () => {
    const [filterData, setFilterData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [search, setSearch] = useState("");
  
    const readDataFromFirestore = () => {
      const productsRef = collection(db, "productos");
  
      const unsubscribe = onSnapshot(productsRef, (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => doc.data());
  
        setFilterData(products);
        setMasterData(products);
      });
  
      return unsubscribe;
    };
  
    useEffect(() => {
      const unsubscribe = readDataFromFirestore();
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    const searchByName = (text) => {
      const newData = masterData.filter((item) => {
        const itemData = item.nombre.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    };// tempus fugitS
  
    const ItemView = ({ item }) => {
      return (
        <Card>
          <Text style={styles.textStyleNombre}>{item.nombre}</Text>
          <Text style={styles.textStylePrecio}>${item.precio}</Text>
          <Text style={styles.textStyleCodigo}>{item.codigo}</Text>
          <Text style={styles.textStyleCreatedAt}>{item.createdAt}</Text>
        </Card>
      );
    };
  
    return (
      <View style={styles.viewStyle}>
        <TextInput
          placeholder="Buscar"
          style={styles.textInputStyle}
          value={search}
          onChangeText={(text) => searchByName(text)}
        />
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          data={filterData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={ItemView}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    textStyleNombre: {
      fontSize: 18,
      color: "#2B2B2B",
      fontWeight: "bold",
      textAlign: "center",
      margin: 10,
    },
    textStyleCodigo: {
      fontSize: 18,
      color: "#7B7B7B",
      fontWeight: "bold",
      textAlign: "center",
    },
    textStylePrecio: {
      fontSize: 25,
      color: "#FF6347",
      fontWeight: "bold",
      textAlign: "center",
    },
    textStyleCreatedAt: {
      fontSize: 15,
      color: "#7B7B7B",
      fontWeight: "bold",
      textAlign: "center",
    },
    textInputStyle: {
      height: 40,
      borderColor: "#FFD700",
      backgroundColor: "#F0F0F0",
      borderWidth: 3,
      margin: 60,
      borderRadius: 20,
      paddingLeft: 20,
    },
    flatListStyle: {
      alignItems: "center",
      paddingBottom: 800,
    },
    viewStyle: {
      backgroundColor: "#F7F7F7",
    },
  });
  
  export default ScreenPrincipal;