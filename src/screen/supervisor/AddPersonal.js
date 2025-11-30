import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Switch, Alert, ActivityIndicator 
} from 'react-native';

// Importamos funciones de manejo de imagen
import { pickImage, uploadImageToCloudinary } from '../../services/imageUploader';

export default function AddPersonalScreen() {
  const [foto, setFoto] = useState(null);
  const [fullName, setFullName] = useState('');
  const [dni, setDni] = useState('');
  const [credencial, setCredencial] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [active, setActive] = useState(true);
  const [objetivoActual, setObjetivoActual] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [diagramaActual, setDiagramaActual] = useState('');
  const [diagramasAnteriores, setDiagramasAnteriores] = useState('');
  const [loading, setLoading] = useState(false);
  const [subiendo, setSubiendo] = useState(false);

  // --- Selección de foto ---
  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) setFoto(uri);
  };

  // --- Guardar usuario ---
  const handleSave = async () => {
    if (!fullName || !dni) {
      Alert.alert('Error', 'El nombre y DNI son obligatorios');
      return;
    }

    setSubiendo(true);

    let fotoURL = foto;
    if (foto && !foto.startsWith('http')) {
      // Subimos la imagen a Cloudinary
      const uploadedURL = await uploadImageToCloudinary(foto);
      if (!uploadedURL) {
        Alert.alert('Error', 'No se pudo subir la foto');
        setSubiendo(false);
        return;
      }
      fotoURL = uploadedURL;
    }

    // Convertir diagramasAnteriores de string a array
    const diagramasArray = diagramasAnteriores.split(',').map(d => d.trim());

    const newUser = {
      foto: fotoURL,
      fullName,
      dni,
      credencial,
      vencimiento,
      isSupervisor,
      active,
      objetivoActual,
      telefono,
      email,
      diagramaActual,
      diagramasAnteriores: diagramasArray,
    };

    try {
      // Aquí iría la lógica de guardar en Firebase
      // const docRef = await addDoc(collection(db, "users"), newUser);

      Alert.alert('Usuario creado', `Se creó el usuario ${fullName}`);
      // Resetear campos
      setFoto(null);
      setFullName('');
      setDni('');
      setCredencial('');
      setVencimiento('');
      setIsSupervisor(false);
      setActive(true);
      setObjetivoActual('');
      setTelefono('');
      setEmail('');
      setDiagramaActual('');
      setDiagramasAnteriores('');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo crear el usuario');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Usuario</Text>

      <TouchableOpacity style={styles.photoBtn} onPress={handlePickImage}>
        <Text style={styles.photoBtnText}>{foto ? "Cambiar Foto" : "Agregar Foto"}</Text>
      </TouchableOpacity>
      {foto && <Image source={{ uri: foto }} style={styles.image} />}

      <TextInput style={styles.input} placeholder="Nombre completo" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="DNI" value={dni} onChangeText={setDni} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Credencial" value={credencial} onChangeText={setCredencial} />
      <TextInput style={styles.input} placeholder="Vencimiento (YYYY-MM-DD)" value={vencimiento} onChangeText={setVencimiento} />
      
      <View style={styles.switchContainer}>
        <Text>Supervisor</Text>
        <Switch value={isSupervisor} onValueChange={setIsSupervisor} />
      </View>

      <View style={styles.switchContainer}>
        <Text>Activo</Text>
        <Switch value={active} onValueChange={setActive} />
      </View>

      <TextInput style={styles.input} placeholder="Objetivo Actual" value={objetivoActual} onChangeText={setObjetivoActual} />
      <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Diagrama Actual" value={diagramaActual} onChangeText={setDiagramaActual} />
      <TextInput style={styles.input} placeholder="Diagramas Anteriores (separados por coma)" value={diagramasAnteriores} onChangeText={setDiagramasAnteriores} />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={subiendo}>
        {subiendo ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Guardar Usuario</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { backgroundColor: '#f1f1f1', padding: 10, marginBottom: 12, borderRadius: 8, fontSize: 16 },
  photoBtn: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  photoBtnText: { color: 'white', fontSize: 16 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 15 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  saveBtn: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
