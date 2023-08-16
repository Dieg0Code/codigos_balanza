import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const CustomAlert = ({ visible, message, onCancel, onDelete }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[styles.alertBox, { opacity: fadeAnim }]}
        >
          <Text style={styles.messageText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButtonContainer}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButtonContainer}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  alertBox: {
    backgroundColor: '#FDFDFD', // Variant of white
    padding: 20,
    borderRadius: 10,
    width: 300,
    height: 200,
    shadowColor: '#E74C3C',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  messageText: {
    fontSize: 18,
    color: "#2B2B2B",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButtonContainer: {
    backgroundColor: '#2196F3', // Blue color
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  deleteButtonContainer: {
    backgroundColor: '#FF6347', // Red color
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomAlert;