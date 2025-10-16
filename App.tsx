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
    Alert.alert(dog.name, JSON.stringify(dog, null, 2));
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
