import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, SafeAreaView } from "react-native";

type Dog = {
  id: string;
  name: string;
  origin?: string;
  size?: string;
  life_span?: string;
  temperament?: string;
};

import dogsLocal from "./assets/dogs.json"; 

export default function App() {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    setDogs(dogsLocal as Dog[]);
  }, []);

  const onPressDog = (dog: Dog) => {
    const dogInfo = [
      dog.origin ? `Origen: ${dog.origin}` : null,
      dog.size ? `Tamaño: ${dog.size}` : null,
      dog.life_span ? `Esperanza de vida: ${dog.life_span}` : null,
      dog.temperament ? `Temperamento: ${dog.temperament}` : null
    ].filter(Boolean).join('\n\n');

    Alert.alert(
      ` ${dog.name}`,
      dogInfo || 'No hay información adicional disponible',
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Razas de Perro</Text>

      <FlatList
        data={dogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onPressDog(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Cargando...</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  item: { padding: 14, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 18 }
});
