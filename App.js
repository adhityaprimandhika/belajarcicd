import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "./firebaseConfig";

export default function App() {
  // useEffect(() => {
  //   // const addCity = async () => {
  //   //   try {
  //   //     const docRef = await addDoc(collection(db, "cities"), {
  //   //       name: "Tokyo",
  //   //       country: "Japan",
  //   //     });
  //   //     console.log("Document written with ID: ", docRef.id);
  //   //   } catch (e) {
  //   //     console.error("Error adding document: ", e);
  //   //   }
  //   // };
  //   // addCity();
  //   // const getCity = async () => {
  //   //   const docRef = doc(db, "cities", "MUwFG3rt0j4TYgpBw7ug");
  //   //   const docSnap = await getDoc(docRef);
  //   //   if (docSnap.exists()) {
  //   //     console.log("Document data:", docSnap.data());
  //   //   } else {
  //   //     console.log("No such a document");
  //   //   }
  //   // };
  //   // getCity();
  //   // const updateCity = async () => {
  //   //   await setDoc(doc(db, "cities", "MUwFG3rt0j4TYgpBw7ug"), {
  //   //     name: "Los Angeles",
  //   //     state: "CA",
  //   //     country: "USA",
  //   //   });
  //   // };
  //   // updateCity();
  // }, []);

  const addCity = async () => {
    try {
      const docRef = await addDoc(collection(db, "cities"), {
        name: "Tokyo",
        country: "Japan",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getCity = async () => {
    const docRef = doc(db, "cities", "90jTeBwc5mTvXXzwDEvt");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such a document");
    }
  };

  const updateCity = async () => {
    const docRef = doc(db, "cities", "90jTeBwc5mTvXXzwDEvt");
    await setDoc(docRef, {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such a document");
    }
  };

  const deleteCity = async () => {
    const docRef = doc(db, "cities", "MUwFG3rt0j4TYgpBw7ug");
    const docSnap = await getDoc(docRef);
    await deleteDoc(docRef);
    console.log("Document deleted:", docSnap.data());
  };

  return (
    <View style={styles.container}>
      <Text>Halo nama saya Adhit!</Text>
      <Button
        title="Add Data"
        onPress={() => {
          addCity();
        }}
      />
      <Button
        title="Get Data"
        onPress={() => {
          getCity();
        }}
      />
      <Button
        title="Update Data"
        onPress={() => {
          updateCity();
        }}
      />
      <Button
        title="Delete Data"
        color="red"
        onPress={() => {
          deleteCity();
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
