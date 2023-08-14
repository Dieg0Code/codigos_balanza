import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { TextInput, View, FlatList, Text, StyleSheet } from "react-native";
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
    };
  
    const ItemView = ({ item }) => {
      return (
        <Card>
          <Text style={styles.textStyleNombre}>{item.nombre}</Text>
          <Text style={styles.textStyleCodigo}>{item.codigo}</Text>
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
      color: "#ECECF1",
      fontWeight: "bold",
      textAlign: "center",
      margin: 10,
    },
    textStyleCodigo: {
      fontSize: 25,
      color: "#ECECF1",
      fontWeight: "bold",
      textAlign: "center",
    },
    textInputStyle: {
      height: 40,
      borderColor: "#19C37D",
      backgroundColor: "#ECECF1",
      borderWidth: 1,
      margin: 60,
      borderRadius: 20,
      paddingLeft: 20,
    },
    flatListStyle: {
      alignItems: "center",
      paddingBottom: 800,
    },
    viewStyle: {
      backgroundColor: "#343541",
    },
  });
  
  export default ScreenPrincipal;