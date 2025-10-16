import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';

interface Dog {
  nombre: string;
  origen: string;
  tamano: string;
}

export default function App() {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Dog[] = require('./dogs.json'); 
        setDogs(data);
      } catch (error) {
        console.error('Error al cargar el JSON:', error);
      }
    };

    fetchData();
  }, []);

  const showDetails = (dog: Dog) => {
    Alert.alert(
      dog.nombre, 
      `Origen: ${dog.origen}\nTamaño: ${dog.tamano}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐶 Razas de Perros 🐾</Text>
      <FlatList
        data={dogs}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => showDetails(item)}
          >
            <Text style={styles.itemText}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
  },
  itemText: {
    fontSize: 18,
  },
});
