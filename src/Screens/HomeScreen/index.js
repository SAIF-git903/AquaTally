import { View, Text, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import logo from "../../assets/images/logo.png";
import HomePng from "../../assets/images/Home_cont.png";
import styles from './style';
import { LineChart } from "react-native-chart-kit";
import { useSelector, useDispatch } from 'react-redux';
import waterConsumption from '../../Redux/actions';
import WaterInTakeBtn from '../../Components/Buttons/WaterInTakeBtn';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../../firebase';
import { Avatar } from 'react-native-paper';
import { collection, setDoc, doc, documentId, getDoc, onSnapshot } from 'firebase/firestore';



const HomeScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation()
  const displayName = useSelector(state => state?.currentUserName)
  const [graphArr, setGraphArr] = useState([])

  function nameSplitter(name) {
    let splittedName = name.split(" ")
    let splittings = []
    splittedName.forEach((item) => {
      let itemN = item.split("")
      splittings.push(itemN[0])
    })
    return splittings.join("")
  }

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [3, 4, 6, 7],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(12, 175, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };

  const currentUserId = useSelector(state => state?.currentUserUid);

  useLayoutEffect(() => {

    // async function getData() {
    //   const docRef = doc(db, "users", currentUserId);
    //   try {
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //       console.log(docSnap.data());
    //     } else {
    //       console.log("Document does not exist")
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // getData()

    const usersColRef = collection(db, 'users');
    const currentUserDocRef = doc(usersColRef, currentUserId);

    onSnapshot(currentUserDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const dayOfWeek = new Date().getDay();
        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
        const dayArr = data[dayName] || [];

        // Do something with dayArr
        console.log(dayArr);

      }
    });

  }, [])


  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={"#0CAFFF"} barStyle="light-content" />
        <View style={styles.headerStyle}>
          <Text style={styles.logoTxt}>AquaTally</Text>
          <View style={{ flexDirection: "row" }}>
            <Image source={logo} style={{ width: 50, height: 50 }} />
            <Text
              style={{
                width: Dimensions.get("window").width / 1.2,
                fontWeight: "700",
                color: "white",
                top: 15,
              }}
            >
              Water is the most critical resource issue of our lifetime and our
              children's lifetime
            </Text>
          </View>
          <TouchableOpacity style={styles.userNameTxt} onPress={() => navigation.navigate("Profile")}>
            <Avatar.Text size={40} label={nameSplitter(displayName)} style={{ backgroundColor: "#007791" }} />
          </TouchableOpacity>
        </View>
        <LineChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      <WaterInTakeBtn
        onPress={() => navigation.navigate("NewEntry")}
        title={"Add Entry"}
      />
    </>
  );
};

export default HomeScreen;