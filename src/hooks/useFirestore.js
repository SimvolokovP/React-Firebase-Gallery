import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFirestore } from "../firebase/firebase";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const q = query(
          collection(appFirestore, collectionName),
          orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((snapshot) => {
            images.push({ id: snapshot.id, ...snapshot.data() });
          });
          setDocs(images);
        });
      } catch (error) {
        console.error(error);
      }
    };

    getData();
    setIsLoading(false);
  }, [collectionName]);

  const deleteDocument = async (id) => {
    try {
      const q = query(collection(appFirestore, collectionName));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          const data = snapshot.data();
          if (data.id === id) {
            const docRef = doc(appFirestore, collectionName, snapshot.id);
            deleteDoc(docRef);
            console.log("Document successfully deleted!");
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { docs, isLoading, deleteDocument };
};

export default useFirestore;