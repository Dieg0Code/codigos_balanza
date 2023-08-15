import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { View, TextInput, Button, StyleSheet, ToastAndroid } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

const AddProductScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [precio, setPrecio] = useState("");

  const handleAddProduct = async () => {
    try {
      await addDoc(collection(db, "productos"), {
        id: Math.random().toString(),
        nombre: nombre,
        codigo: codigo,
        precio: precio,
      });

      ToastAndroid.show("Producto agregado con éxito", ToastAndroid.SHORT);

      navigation.goBack();

      setNombre("");
      setCodigo("");
      setPrecio("");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      // Maneja el error y muestra un mensaje al usuario
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Código del producto"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio del producto"
        value={precio}
        onChangeText={setPrecio}
      />
      <Button title="Agregar Producto" onPress={handleAddProduct} color="#19C37D" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default AddProductScreen;