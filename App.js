import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
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

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    country: "",
  });

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cities"));
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      setData(documents);

      console.log("Update JSON Data : ");
      console.log(documents);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const addCity = async () => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "cities"), inputData);
      console.log("Document added with ID: ", docRef.id);
      fetchData();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("Error adding document: ", e);
    }
  };

  const deleteCity = async (id) => {
    setLoadingData(true);
    const docRef = doc(db, "cities", id);
    await deleteDoc(docRef);
    fetchData();
    setLoadingData(false);
    console.log("Document deleted");
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Name"
        onChangeText={(text) => setInputData({ ...inputData, name: text })}
        value={inputData.name}
      />
      <TextInput
        placeholder="Country"
        onChangeText={(text) => setInputData({ ...inputData, country: text })}
        value={inputData.country}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Add Data" onPress={addCity} />
      )}
      <Text>List Data</Text>
      {loadingData ? (
        <ActivityIndicator />
      ) : (
        data.map((item) => (
          <View key={item.id}>
            <Text style={{ textAlign: "center" }}>Name: {item.name}</Text>
            <Text style={{ textAlign: "center" }}>Country: {item.country}</Text>
            <Button title="Delete" onPress={() => deleteCity(item.id)} />
          </View>
        ))
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
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
