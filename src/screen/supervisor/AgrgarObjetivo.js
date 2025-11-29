import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, 
  Image, StyleSheet, ScrollView, ActivityIndicator 
} from "react-native";
import { pickImage, uploadImageToCloudinary } from "../../services/imageUploader";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig/firebaseConfig"; // tu configuración de Firebase

export default function AgregarObjetivoScreen() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [horario, setHorario] = useState("");
  const [instrucciones, setInstrucciones] = useState("");

  const [foto, setFoto] = useState(null);         // URI local para previsualización
  const [subiendo, setSubiendo] = useState(false);

  // --- GUARDAR OBJETIVO ---
  const guardarObjetivo = async () => {
    try {
      setSubiendo(true);

      // Subir la foto a Cloudinary solo al guardar
      let fotoURL = null;
      if (foto) {
        fotoURL = await uploadImageToCloudinary(foto);
      }

      const objetivo = {
        nombre,
        direccion,
        localidad,
        horario,
        instrucciones,
        foto: fotoURL,
        diagramaActual: null,
        diagramasAnteriores: [],
      };

      console.log("OBJETIVO A GUARDAR:", objetivo);

      // Guardar en Firestore
      const docRef = await addDoc(collection(db, "objetivos"), objetivo);
      console.log("Documento guardado con ID:", docRef.id);

      alert("Objetivo creado correctamente");

      // Limpiar campos
      setNombre("");
      setDireccion("");
      setLocalidad("");
      setHorario("");
      setInstrucciones("");
      setFoto(null);

    } catch (error) {
      console.log("Error guardando objetivo:", error);
      alert("Hubo un error al guardar el objetivo");
    } finally {
      setSubiendo(false);
    }
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) setFoto(uri);  // Actualiza previsualización
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Objetivo</Text>

      <TextInput style={styles.input} placeholder="Nombre del objetivo" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} />
      <TextInput style={styles.input} placeholder="Localidad" value={localidad} onChangeText={setLocalidad} />
      <TextInput style={styles.input} placeholder="Horario (ej: 24hs)" value={horario} onChangeText={setHorario} />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Instrucciones"
        multiline
        value={instrucciones}
        onChangeText={setInstrucciones}
      />

      {/* FOTO */}
      <TouchableOpacity style={styles.photoBtn} onPress={handlePickImage}>
        <Text style={styles.photoBtnText}>{foto ? "Cambiar Foto" : "Tomar Foto"}</Text>
      </TouchableOpacity>

      {foto && <Image source={{ uri: foto }} style={styles.image} />}

      {subiendo && <ActivityIndicator size="large" style={{ marginTop: 10 }} />}

      <TouchableOpacity style={styles.saveBtn} onPress={guardarObjetivo}>
        <Text style={styles.saveText}>Guardar Objetivo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: { backgroundColor: "white", padding: 12, marginBottom: 12, borderRadius: 8, fontSize: 16 },
  photoBtn: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 8, alignItems: "center" },
  photoBtnText: { color: "white", fontSize: 16 },
  image: { width: "100%", height: 200, borderRadius: 10, marginTop: 15 },
  saveBtn: { marginTop: 25, backgroundColor: "#2196F3", padding: 15, borderRadius: 8, alignItems: "center" },
  saveText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
