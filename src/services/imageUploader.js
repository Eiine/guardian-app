import * as ImagePicker from "expo-image-picker";

// Solo selecciona imagen y devuelve URI
export const pickImage = async () => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos para usar la cámara");
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      // Solo devuelve la URI como string
      return result.assets[0].uri;
    }
    return null;
  } catch (error) {
    console.log("Error seleccionando imagen:", error);
    return null;
  }
};

// Subir imagen a Cloudinary
export const uploadImageToCloudinary = async (uri) => {
  if (!uri) return null;

  const data = new FormData();
  data.append("file", {
    uri,
    type: "image/jpeg",
    name: "photo.jpg",
  });
  data.append("upload_preset", "Guardian");
  data.append("cloud_name", "dwci2cgjm");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwci2cgjm/image/upload",
      { method: "POST", body: data }
    );
    const result = await res.json();
    if (result.secure_url) return result.secure_url;
    console.log("Error Cloudinary:", result);
    return null;
  } catch (error) {
    console.log("Error subiendo a Cloudinary:", error);
    return null;
  }
};
