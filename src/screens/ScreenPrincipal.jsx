import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CustomAlert from "../components/CustomAlert";
import { TextInput, View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getFirestore, collection, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Swipeable } from "react-native-gesture-handler";

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

  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const readDataFromFirestore = () => {
    const productsRef = collection(db, "productos");

    const unsubscribe = onSnapshot(productsRef, (querySnapshot) => {
      const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setFilterData(products);
      setMasterData(products);
    });

    return unsubscribe;
  };

  const openAlert = (product) => {
    setSelectedProduct(product);
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setSelectedProduct(null);
    setAlertVisible(false);
  };


  const deleteProduct = async (id) => {
    try {
      const productRef = doc(db, "productos", id);
      await deleteDoc(productRef);
      console.log("Producto eliminado", id);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
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

  const renderSwipeableItem = ({ item }) => {
    // const handleLongPress = () => {
    //   Alert.alert(
    //     'Eliminar Producto',
    //     `¿Estás seguro que deseas eliminar "${item.nombre}"?`,
    //     [
    //       {
    //         text: 'Cancelar',
    //         style: 'cancel',
    //       },
    //       {
    //         text: 'Eliminar',
    //         style: 'destructive',
    //         onPress: () => deleteProduct(item.id),
    //       },
    //     ],
    //     { cancelable: true }
    //   );
    // };

    const renderRightActions = () => {
      return (
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity onLongPress={() => openAlert(item)}>
          <Card>
            <Text style={styles.textStyleNombre}>{item.nombre}</Text>
            <Text style={styles.textStylePrecio}>${item.precio}</Text>
            <Text style={styles.textStyleCodigo}>{item.codigo}</Text>
            <Text style={styles.textStyleCreatedAt}>{item.createdAt}</Text>
          </Card>
        </TouchableOpacity>
      </Swipeable>
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
        renderItem={renderSwipeableItem}
      />

      <CustomAlert
        visible={alertVisible}
        message={`¿Estás seguro que deseas eliminar "${selectedProduct?.nombre}"?`}
        onCancel={closeAlert}
        onDelete={() => {
          deleteProduct(selectedProduct?.id);
          closeAlert();
        }}
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
    borderWidth: 0.4,
    margin: 60,
    borderRadius: 20,
    paddingLeft: 20,
    shadowColor: "#FFD700",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  flatListStyle: {
    alignItems: "center",
    paddingBottom: 800,
  },
  viewStyle: {
    backgroundColor: "#F7F7F7",
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ScreenPrincipal;