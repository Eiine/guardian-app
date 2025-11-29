import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, 
  Image, StyleSheet, ScrollView, ActivityIndicator 
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AgregarObjetivoScreen() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [horario, setHorario] = useState("");
  const [instrucciones, setInstrucciones] = useState("");

  const [foto, setFoto] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  // --- SUBIR IMAGEN A CLOUDINARY ---
  const uploadToCloudinary = async (uri) => {
    try {
      setSubiendo(true);

      const data = new FormData();
      data.append("file", {
        uri,
        type: "image/jpeg",
        name: "objetivo.jpg",
      });

      data.append("upload_preset", "TU_UPLOAD_PRESET");
      data.append("cloud_name", "TU_CLOUD_NAME");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload`,
        { method: "POST", body: data }
      );

      const result = await res.json();

      if (result.secure_url) {
        setFoto(result.secure_url);
      }

    } catch (error) {
      console.log("Error subiendo imagen:", error);
    } finally {
      setSubiendo(false);
    }
  };

  // --- ABRIR CÁMARA O GALERÍA ---
  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Se necesitan permisos para usar la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"], 
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await uploadToCloudinary(uri);
    }
  };

  // --- GUARDAR OBJETIVO ---
  const guardarObjetivo = async () => {
    const objetivo = {
      nombre,
      direccion,
      localidad,
      horario,
      instrucciones,
      foto,
      diagramaActual: null,
      diagramasAnteriores: [],
    };

    console.log("OBJETIVO A GUARDAR:", objetivo);

    // Aquí conectarás con Firestore:
    // await addDoc(collection(db, "objetivos"), objetivo);

    alert("Objetivo creado correctamente");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Objetivo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del objetivo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      <TextInput
        style={styles.input}
        placeholder="Localidad"
        value={localidad}
        onChangeText={setLocalidad}
      />

      <TextInput
        style={styles.input}
        placeholder="Horario (ej: 24hs)"
        value={horario}
        onChangeText={setHorario}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Instrucciones"
        multiline
        value={instrucciones}
        onChangeText={setInstrucciones}
      />

      {/* FOTO */}
      <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
        <Text style={styles.photoBtnText}>
          {foto ? "Cambiar Foto" : "Tomar Foto"}
        </Text>
      </TouchableOpacity>

      {subiendo && <ActivityIndicator size="large" style={{ marginTop: 10 }} />}

      {foto && !subiendo && (
        <Image source={{ uri: foto }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.saveBtn} onPress={guardarObjetivo}>
        <Text style={styles.saveText}>Guardar Objetivo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  photoBtn: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  photoBtnText: {
    color: "white",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 15,
  },
  saveBtn: {
    marginTop: 25,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
