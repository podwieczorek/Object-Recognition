import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5e0acc',
    borderRadius: 50,
    width: 350,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'sans-serif',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
