import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Image, Button } from 'react-native';

export default function DashboardSupervisor() {
  const [selectedParte, setSelectedParte] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // -----------------------------
  //  ⭐ Dummy Objetivos (NUEVO)
  // -----------------------------
  const objetivosDummy = [
    {
      nombre: "Banco Nación Central",
      foto: "https://via.placeholder.com/200",
      direccion: "Av. Central 555",
      localidad: "Mosconi",
      horario: "24hs",
      instrucciones: "El vigilador debe presentarse con uniforme completo.",
      diagramaActual: "diag-obj-001-2025-11",
      diagramasAnteriores: ["diag-obj-001-2025-10"]
    },
    {
      nombre: "YPF Raffinería Norte",
      foto: "https://via.placeholder.com/200",
      direccion: "Ruta 34 KM 1200",
      localidad: "Tartagal",
      horario: "24hs",
      instrucciones: "Controlar ingreso y egreso de camiones.",
      diagramaActual: "diag-obj-002-2025-11",
      diagramasAnteriores: ["diag-obj-002-2025-10"]
    },
    {
      nombre: "Hospital Público",
      foto: "https://via.placeholder.com/200",
      direccion: "Av. Salud 321",
      localidad: "Orán",
      horario: "24hs",
      instrucciones: "Puesto fijo en guardia y rondas cada 3 horas.",
      diagramaActual: "diag-obj-003-2025-11",
      diagramasAnteriores: ["diag-obj-003-2025-10"]
    }
  ];

  // Partes médicos
  const partesMedicosDummy = [
    { usuario: 'Juan Pérez', diasReposo: 2, fecha: '2025-11-25', foto: 'https://via.placeholder.com/150' },
    { usuario: 'Carlos Gómez', diasReposo: 1, fecha: '2025-11-23', foto: 'https://via.placeholder.com/150' },
  ];

  // Novedades
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

      {/* ---------------------------------- */}
      {/*       🏢 SECCIÓN OBJETIVOS        */}
      {/* ---------------------------------- */}
      <Text style={styles.sectionTitle}>Objetivos</Text>

      <View style={styles.objetivoGrid}>
        {objetivosDummy.map((obj, index) => (
          <TouchableOpacity key={index} style={styles.objetivoCard} onPress={() => openModal(obj)}>
            <Image source={{ uri: obj.foto }} style={styles.objetivoFoto} />
            <Text style={styles.objetivoNombre}>{obj.nombre}</Text>
            <Text style={styles.objetivoText}>{obj.localidad}</Text>
            <Text style={styles.objetivoText}>{obj.horario}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------------------------------- */}
      {/*     🧑‍⚕️ PARTES MÉDICOS         */}
      {/* ---------------------------------- */}
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

      {/* ---------------------------------- */}
      {/*     📄 PARTES DE NOVEDADES        */}
      {/* ---------------------------------- */}
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

      {/* ---------------------------------- */}
      {/*             MODAL                 */}
      {/* ---------------------------------- */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedParte && (
              <>
                {selectedParte.foto && (
                  <Image source={{ uri: selectedParte.foto }} style={styles.foto} />
                )}

                {selectedParte.nombre && (
                  <Text style={styles.modalText}>Objetivo: {selectedParte.nombre}</Text>
                )}
                {selectedParte.usuario && (
                  <Text style={styles.modalText}>Usuario: {selectedParte.usuario}</Text>
                )}

                {selectedParte.diasReposo && (
                  <Text style={styles.modalText}>Días de reposo: {selectedParte.diasReposo}</Text>
                )}
                {selectedParte.descripcion && (
                  <Text style={styles.modalText}>Descripción: {selectedParte.descripcion}</Text>
                )}

                {selectedParte.direccion && (
                  <Text style={styles.modalText}>Dirección: {selectedParte.direccion}</Text>
                )}
                {selectedParte.localidad && (
                  <Text style={styles.modalText}>Localidad: {selectedParte.localidad}</Text>
                )}
                {selectedParte.horario && (
                  <Text style={styles.modalText}>Horario: {selectedParte.horario}</Text>
                )}
                {selectedParte.instrucciones && (
                  <Text style={styles.modalText}>Instrucciones: {selectedParte.instrucciones}</Text>
                )}

                {selectedParte.fecha && (
                  <Text style={styles.modalText}>Fecha: {selectedParte.fecha}</Text>
                )}

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

  // GRID OBJETIVOS
  objetivoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  objetivoCard: {
    width: '48%',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  objetivoFoto: { width: '100%', height: 100, borderRadius: 10, marginBottom: 8 },
  objetivoNombre: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  objetivoText: { fontSize: 13, color: '#555', textAlign: 'center' },

  // CARDS
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

  // MODAL
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
  foto: { width: 150, height: 150, borderRadius: 10, alignSelf: 'center', marginBottom: 10 },
});
