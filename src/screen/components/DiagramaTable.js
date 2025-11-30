import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function DiagramaTable({ diagrama, role, usersById = {} }) {
  const [selectedVigilador, setSelectedVigilador] = useState(null);

  // seguridad: si no existe diagrama.vigiladores, evitamos crash
  const vigiladores = Array.isArray(diagrama?.vigiladores) ? diagrama.vigiladores : [];

  // calcular el máximo día presente en todos los vigiladores
  const diasMax = vigiladores.length === 0
    ? 0
    : Math.max(...vigiladores.map(v => {
        const keys = v.dias ? Object.keys(v.dias).map(k => Number(k)).filter(n => !isNaN(n)) : [];
        return keys.length ? Math.max(...keys) : 0;
      }));

  const isEditable = role === 'supervisor';

  return (
    <ScrollView horizontal>
      <View>
        {/* Header */}
        <View style={[styles.row, styles.headerRow]}>
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
          {vigiladores.map((vigilador, idx) => {
            const isSelected = selectedVigilador === idx;

            const onRowPress = () => {
              if (isEditable) {
                setSelectedVigilador(selectedVigilador === idx ? null : idx);
              }
            };

            // resolver nombre a partir del mapa usersById
            const uid = vigilador.uid || vigilador.id || vigilador.usuarioId || `uid_${idx}`;
            const userObj = usersById && usersById[uid];
            const displayName = userObj?.fullName || userObj?.nombre || uid;

            return (
              <TouchableOpacity
                key={uid + "-" + idx}
                onPress={onRowPress}
                activeOpacity={0.8}
              >
                <View style={[styles.row, isSelected && styles.selectedRow]}>
                  {/* Nombre */}
                  <View style={[styles.cell, styles.vigiladorCell]}>
                    <Text style={isSelected ? styles.selectedText : styles.normalText}>
                      {displayName}
                    </Text>
                  </View>

                  {/* Celdas de días */}
                  {Array.from({ length: diasMax }, (_, i) => (
                    <View key={i} style={[styles.cell]}>
                      <Text>{(vigilador.dias && vigilador.dias[String(i + 1)]) || '-'}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* si no hay vigiladores */}
          {vigiladores.length === 0 && (
            <View style={styles.emptyRow}>
              <Text>No hay vigiladores para este diagrama</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    padding: 10,
    minWidth: 60,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    justifyContent: "center",
  },
  vigiladorCell: {
    minWidth: 180,
    backgroundColor: "#fafafa",
  },
  headerCell: {
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedRow: {
    backgroundColor: "#e6f7ff",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#0b66c3",
  },
  normalText: {
    color: "#111",
  },
  emptyRow: {
    padding: 20,
    alignItems: "center",
  },
});
