import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

// Configuración de Firebase con variables de entorno
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

//Variables necesarias para utilizar firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

//Función para subir las imágenes al sitio
export const uploadFile = async (file) => {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};
