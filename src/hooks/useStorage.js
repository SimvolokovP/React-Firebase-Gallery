import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { appFirestore, appStorage } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const startUpload = (file) => {
    if (!file) {
      return;
    }

    setIsUploading(true);

    const fileId = uuidv4();
    const fileFormat = file.type.split("/")[1];
    const storageRef = ref(appStorage, `images/${fileId}.${fileFormat}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(downloadURL);
        setIsUploading(false);
        await addDoc(collection(appFirestore, "images"), {
            imageUrl: downloadURL,
            createdAt: new Date(),
            id: fileId
        });
      }
    );

    console.log(fileId);
  };

  return { progress, url, error, startUpload, isUploading };
};

export default useStorage;
