import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Image, Button } from 'react-native';
import DiagramaTable from '../components/DiagramaTable';

export default function DashboardSupervisor() {
  const [selectedParte, setSelectedParte] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Datos dummy
  const diagramaDummy = {
    vigiladores: [
      { nombre: 'Juan Pérez', dias: { 1: 'N', 2: 'T', 3: 'M', 4: 'F', 5: 'N' } },
      { nombre: 'Carlos Gómez', dias: { 1: 'T', 2: 'N', 3: 'F', 4: 'M', 5: 'T' } },
      { nombre: 'Luciano Vera', dias: { 1: 'M', 2: 'M', 3: 'T', 4: 'F', 5: 'M' } },
      { nombre: 'Pedro Ruiz', dias: { 1: 'F', 2: 'F', 3: 'N', 4: 'T', 5: 'F' } },
    ],
  };

  const partesMedicosDummy = [
    { usuario: 'Juan Pérez', diasReposo: 2, fecha: '2025-11-25', foto: 'https://via.placeholder.com/150' },
    { usuario: 'Carlos Gómez', diasReposo: 1, fecha: '2025-11-23', foto: 'https://via.placeholder.com/150' },
  ];

  const partesNovedadesDummy = [
    { descripcion: 'Vigilador llegó tarde', fecha: '2025-11-24', usuario: 'Luciano Vera', foto: 'https://via.placeholder.com/150' },
    { descripcion: 'Incidente menor', fecha: '2025-11-25', usuario: 'Pedro Ruiz', foto: 'https://via.placeholder.com/150' },
  ];

  const openModal = (parte) => {
    setSelectedParte(parte);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedParte(null);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard Supervisor</Text>

      {/* Sección Diagrama */}
      <Text style={styles.sectionTitle}>Diagrama de Guardias</Text>
      <DiagramaTable diagrama={diagramaDummy} role="supervisor" />

      {/* Sección Partes Médicos */}
      <Text style={styles.sectionTitle}>Partes Médicos Recientes</Text>
      <View style={styles.cardContainer}>
        {partesMedicosDummy.map((parte, idx) => (
          <TouchableOpacity key={idx} style={styles.card} onPress={() => openModal(parte)}>
            <Text style={styles.cardText}>Usuario: {parte.usuario}</Text>
            <Text style={styles.cardText}>Días de reposo: {parte.diasReposo}</Text>
            <Text style={styles.cardText}>Fecha: {parte.fecha}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sección Partes de Novedades */}
      <Text style={styles.sectionTitle}>Partes de Novedades Recientes</Text>
      <View style={styles.cardContainer}>
        {partesNovedadesDummy.map((novedad, idx) => (
          <TouchableOpacity key={idx} style={styles.card} onPress={() => openModal(novedad)}>
            <Text style={styles.cardText}>Usuario: {novedad.usuario}</Text>
            <Text style={styles.cardText}>Descripción: {novedad.descripcion}</Text>
            <Text style={styles.cardText}>Fecha: {novedad.fecha}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal para detalle */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedParte && (
              <>
                <Image source={{ uri: selectedParte.foto }} style={styles.foto} />
                <Text style={styles.modalText}>Usuario: {selectedParte.usuario}</Text>
                {selectedParte.diasReposo && <Text style={styles.modalText}>Días de reposo: {selectedParte.diasReposo}</Text>}
                {selectedParte.descripcion && <Text style={styles.modalText}>Descripción: {selectedParte.descripcion}</Text>}
                <Text style={styles.modalText}>Fecha: {selectedParte.fecha}</Text>
                <Button title="Cerrar" onPress={closeModal} />
              </>
            )}
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalText: { fontSize: 16, marginVertical: 5 },
  foto: { width: 150, height: 150, borderRadius: 75, alignSelf: 'center', marginBottom: 10 },
});
