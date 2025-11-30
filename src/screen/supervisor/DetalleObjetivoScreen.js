import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, TouchableOpacity, TextInput, Modal, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig";
import { pickImage, uploadImageToCloudinary } from '../../services/imageUploader';

export default function DetalleObjetivoScreen({ route, navigation }) {
  const { objetivo } = route.params; // recibimos el objeto completo

  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [subiendo, setSubiendo] = useState(false);

  const [nombre, setNombre] = useState(objetivo.nombre || '');
  const [direccion, setDireccion] = useState(objetivo.direccion || '');
  const [localidad, setLocalidad] = useState(objetivo.localidad || '');
  const [horario, setHorario] = useState(objetivo.horario || '');
  const [instrucciones, setInstrucciones] = useState(objetivo.instrucciones || '');
  const [foto, setFoto] = useState(objetivo.foto || null);
  const [diagramaActual, setDiagramaActual] = useState(objetivo.diagramaActual || '');
  const [partesMedicos, setPartesMedicos] = useState([]);

  // --- Solo cargar partes médicos asociados ---
  useEffect(() => {
    const fetchPartes = async () => {
      try {
        const q = query(collection(db, "partes_medicos"), where("objetivoId", "==", objetivo.id));
        const partesSnap = await getDocs(q);
        const partesData = partesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setPartesMedicos(partesData);
      } catch (error) {
        console.log("Error cargando partes médicos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartes();
  }, [objetivo.id]);

  // --- Editar foto ---
  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) setFoto(uri);
  };

  // --- Guardar cambios ---
  const guardarCambios = async () => {
    setSubiendo(true);
    let fotoURL = foto;

    if (foto && !foto.startsWith('http')) {
      fotoURL = await uploadImageToCloudinary(foto);
    }

    try {
      const docRef = doc(db, "objetivos", objetivo.id);
      await updateDoc(docRef, { nombre, direccion, localidad, horario, instrucciones, foto: fotoURL });
      alert("Objetivo actualizado correctamente");
      setEditModalVisible(false);
    } catch (error) {
      console.log("Error guardando objetivo:", error);
      alert("Error al actualizar objetivo");
    } finally {
      setSubiendo(false);
    }
  };

  if (loading) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" color="#2196F3"/>
      <Text>Cargando objetivo...</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>

      {foto && <Image source={{ uri: foto }} style={styles.image} />}
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{nombre}</Text>

      <Text style={styles.label}>Dirección:</Text>
      <Text style={styles.value}>{direccion}</Text>

      <Text style={styles.label}>Localidad:</Text>
      <Text style={styles.value}>{localidad}</Text>

      <Text style={styles.label}>Horario:</Text>
      <Text style={styles.value}>{horario}</Text>

      <Text style={styles.label}>Instrucciones:</Text>
      <Text style={styles.value}>{instrucciones}</Text>

      <Text style={styles.label}>Diagrama Actual:</Text>
      <View style={styles.diagramaContainer}>
        {diagramaActual ? <Text>{diagramaActual}</Text> : <Text>No hay diagrama asignado</Text>}
      </View>

      <Text style={styles.sectionTitle}>Partes Médicos Asociados</Text>
      {partesMedicos.length === 0 ? (
        <Text>No hay partes médicos asociados</Text>
      ) : partesMedicos.map(p => (
        <View key={p.id} style={styles.card}>
          <Text>Usuario: {p.usuario}</Text>
          <Text>Días de reposo: {p.diasReposo}</Text>
          <Text>Fecha: {p.fecha}</Text>
        </View>
      ))}

      <Button title="Editar Objetivo" onPress={() => setEditModalVisible(true)} />

      {/* --- MODAL DE EDICIÓN --- */}
      <Modal visible={editModalVisible} animationType="slide">
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Editar Objetivo</Text>

          <TouchableOpacity onPress={handlePickImage} style={styles.photoBtn}>
            <Text style={styles.photoBtnText}>{foto ? "Cambiar Foto" : "Agregar Foto"}</Text>
          </TouchableOpacity>
          {foto && <Image source={{ uri: foto }} style={styles.image} />}

          <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre" />
          <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} placeholder="Dirección" />
          <TextInput style={styles.input} value={localidad} onChangeText={setLocalidad} placeholder="Localidad" />
          <TextInput style={styles.input} value={horario} onChangeText={setHorario} placeholder="Horario" />
          <TextInput style={[styles.input,{height:100}]} value={instrucciones} onChangeText={setInstrucciones} multiline placeholder="Instrucciones" />

          {subiendo && <ActivityIndicator size="large" style={{marginVertical:10}}/>}
          <Button title="Guardar Cambios" onPress={guardarCambios} disabled={subiendo} />
          <Button title="Cancelar" color="red" onPress={() => setEditModalVisible(false)} />
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, padding:20, backgroundColor:'#fff'},
  title: {fontSize:24, fontWeight:'bold', marginBottom:15},
  label: {fontWeight:'bold', fontSize:16, marginTop:10},
  value: {fontSize:16, marginBottom:5},
  input: {backgroundColor:'#f1f1f1', padding:10, marginBottom:12, borderRadius:8, fontSize:16},
  photoBtn: {backgroundColor:'#4CAF50', padding:12, borderRadius:8, alignItems:'center', marginBottom:10},
  photoBtnText: {color:'white', fontSize:16},
  image: {width:'100%', height:200, borderRadius:10, marginBottom:15},
  sectionTitle: {fontSize:18, fontWeight:'bold', marginTop:15, marginBottom:8},
  diagramaContainer: {padding:15, backgroundColor:'#e1e1e1', borderRadius:8, marginBottom:15},
  card: {padding:10, marginBottom:10, borderWidth:1, borderColor:'#ccc', borderRadius:5, backgroundColor:'#f9f9f9'}
});
