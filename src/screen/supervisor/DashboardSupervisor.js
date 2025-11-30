import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Image, Button, ActivityIndicator } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig"; // tu configuración de Firebase

export default function DashboardSupervisor({ navigation }) { // <- recibimos navigation
  const [objetivos, setObjetivos] = useState([]);
  const [partesMedicos, setPartesMedicos] = useState([]);
  const [partesNovedades, setPartesNovedades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const objetivosSnap = await getDocs(collection(db, "objetivos"));
        setObjetivos(objetivosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const medicosSnap = await getDocs(collection(db, "partes_medicos"));
        setPartesMedicos(medicosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const novedadesSnap = await getDocs(collection(db, "partes_novedades"));
        setPartesNovedades(novedadesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.log("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color="#2196F3"/>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* ------------------- OBJETIVOS ------------------- */}
      <Text style={styles.sectionTitle}>Objetivos</Text>
      <View style={styles.objetivoGrid}>
        {objetivos.map(obj => (
          <TouchableOpacity 
  key={obj.id} 
  style={styles.objetivoCard} 
  onPress={() => navigation.navigate("DetalleObjetivo", { objetivo: obj })}
>
  {obj.foto && <Image source={{ uri: obj.foto }} style={styles.objetivoFoto} />}
  <Text style={styles.objetivoNombre}>{obj.nombre}</Text>
  <Text style={styles.objetivoText}>{obj.localidad}</Text>
  <Text style={styles.objetivoText}>{obj.horario}</Text>
</TouchableOpacity>
        ))}
      </View>

      {/* ------------------- PARTES MÉDICOS ------------------- */}
      <Text style={styles.sectionTitle}>Partes Médicos Recientes</Text>
      <View style={styles.cardContainer}>
        {partesMedicos.map(parte => (
          <TouchableOpacity key={parte.id} style={styles.card}>
            <Text style={styles.cardText}>Usuario: {parte.usuario}</Text>
            <Text style={styles.cardText}>Días de reposo: {parte.diasReposo}</Text>
            <Text style={styles.cardText}>Fecha: {parte.fecha}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ------------------- PARTES NOVEDADES ------------------- */}
      <Text style={styles.sectionTitle}>Partes de Novedades Recientes</Text>
      <View style={styles.cardContainer}>
        {partesNovedades.map(novedad => (
          <TouchableOpacity key={novedad.id} style={styles.card}>
            <Text style={styles.cardText}>Usuario: {novedad.usuario}</Text>
            <Text style={styles.cardText}>Descripción: {novedad.descripcion}</Text>
            <Text style={styles.cardText}>Fecha: {novedad.fecha}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5 },

  // GRID OBJETIVOS
  objetivoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  objetivoCard: { width: '48%', backgroundColor: '#f1f1f1', borderRadius: 10, padding: 10, marginBottom: 10, alignItems: 'center' },
  objetivoFoto: { width: '100%', height: 100, borderRadius: 10, marginBottom: 8 },
  objetivoNombre: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  objetivoText: { fontSize: 13, color: '#555', textAlign: 'center' },

  // CARDS
  cardContainer: { marginBottom: 10 },
  card: { padding: 10, marginVertical: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: '#f9f9f9' },
  cardText: { fontSize: 14 },

  // MODAL
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalText: { fontSize: 16, marginVertical: 5 },
  foto: { width: 150, height: 150, borderRadius: 10, alignSelf: 'center', marginBottom: 10 },
});
