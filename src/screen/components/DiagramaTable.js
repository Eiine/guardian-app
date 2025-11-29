import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

export default function DiagramaTable({ diagrama, role }) {
  const [selectedVigilador, setSelectedVigilador] = useState(null);
  const diasMax = Math.max(...diagrama.vigiladores.map(v => Math.max(...Object.keys(v.dias).map(Number))));

  const isEditable = role === 'supervisor'; // solo supervisor puede editar

  return (
    <ScrollView horizontal>
      <View>
        {/* Header */}
        <View style={styles.row}>
          <View style={[styles.cell, styles.vigiladorCell, styles.headerCell]}>
            <Text style={styles.headerText}>Vigilador</Text>
          </View>
          {Array.from({ length: diasMax }, (_, i) => (
            <View key={i} style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>{i + 1}</Text>
            </View>
          ))}
        </View>

        {/* Filas */}
        <ScrollView style={{ maxHeight: 500 }}>
          {diagrama.vigiladores.map((vigilador, idx) => {
            const isSelected = selectedVigilador === idx;

            const onRowPress = () => {
              if (isEditable) {
                setSelectedVigilador(selectedVigilador === idx ? null : idx);
              }
            };

            return (
              <TouchableOpacity
                key={idx}
                onPress={onRowPress}
                activeOpacity={0.8}
              >
                <View style={[styles.row, isSelected && styles.selectedRow]}>
                  {/* Nombre */}
                  <View style={[styles.cell, styles.vigiladorCell]}>
                    <Text style={isSelected && styles.selectedText}>{vigilador.nombre}</Text>
                  </View>

                  {/* Celdas de días */}
                  {Array.from({ length: diasMax }, (_, i) => (
                    <View key={i} style={[styles.cell, isSelected && styles.selectedRow]}>
                      <Text>{vigilador.dias[i + 1] || '-'}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5 },
  cardContainer: { marginBottom: 10 },
  card: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  cardText: { fontSize: 14 },
});