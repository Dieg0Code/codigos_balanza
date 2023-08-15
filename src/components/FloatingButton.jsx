import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons

const FloatingButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#FF6B3D',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default FloatingButton;