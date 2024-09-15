import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCMAFfS_ENkUsPI27kpYOubRjkEPszj7IQ",
  authDomain: "tp6-tangoapp.firebaseapp.com",
  projectId: "tp6-tangoapp",
  storageBucket: "tp6-tangoapp.appspot.com",
  messagingSenderId: "322992535399",
  appId: "1:322992535399:web:1fe04cfbe293b538a3a1c2",
  measurementId: "G-SXHKBL4VM8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadFile = async (file) => {
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}