import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ToastAndroid } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

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
        nombre: nombre,
        codigo: codigo,
        precio: precio,
        createdAt: new Date().toISOString().slice(0, 10),
      });

      ToastAndroid.show("Producto agregado con éxito", ToastAndroid.SHORT, ToastAndroid.CENTER);

      navigation.goBack();

      setNombre("");
      setCodigo("");
      setPrecio("");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      // Maneja el error y muestra un mensaje al usuario
      ToastAndroid.show("Error al agregar el producto", ToastAndroid.SHORT, ToastAndroid.CENTER);
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
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonText}>Agregar Producto</Text>
        <Ionicons name="add" size={24} color="#fff" style={styles.addIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 60,
    borderRadius: 15,
    backgroundColor: "#F7F7F7",
    shadowColor: "#19C37D",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    marginBottom: 15,
    paddingLeft: 20,
    fontSize: 18,
    borderColor: "#19C37D",
    borderWidth: 0.3,
  },
  addButton: {
    backgroundColor: "#19C37D",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 30,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
  },
  addIcon: {
    alignSelf: "center",
  },
});

export default AddProductScreen;