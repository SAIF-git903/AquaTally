import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from "../../assets/images/logo.png";
import styles from './style';
import { useSelector } from 'react-redux';
import WaterInTakeBtn from '../../Components/Buttons/WaterInTakeBtn';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../firebase';
import { Avatar } from 'react-native-paper';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { LineChart } from "react-native-gifted-charts";


const HomeScreen = () => {

  const navigation = useNavigation()
  const displayName = useSelector(state => state?.currentUserName)
  const [graphArr, setGraphArr] = useState(null)
  const [latestConsumption, setLatestConsumption] = useState("")


  function nameSplitter(name) {
    let splittedName = name.split(" ")
    let splittings = []
    splittedName.forEach((item) => {
      let itemN = item.split("")
      splittings.push(itemN[0])
    })
    return splittings.join("")
  }


  const currentUserId = useSelector(state => state?.currentUserUid);

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const weekday = weekdays[today.getDay()];


  useEffect(() => {

    const usersColRef = collection(db, "users");
    const parentDocRef = doc(usersColRef, currentUserId);
    const subColRef = collection(parentDocRef, weekday);
    const subDocRef = doc(subColRef, "Data");

    getDoc(subDocRef).then((doc) => {
      if (doc.exists()) {
        if (doc.data()) {
          console.log("Document has fields", doc.data())
        } else {
          console.log("There's no such data")
        }
      }
    })

    const unsubscribe = onSnapshot(subDocRef, (docSnapshot) => {
      const currentGraphArr = docSnapshot.data()?.graphArr || [];
      const lastlyConsumption = docSnapshot.data()?.lastConsumptionOfWater || "";
      setGraphArr(currentGraphArr)
      setLatestConsumption(lastlyConsumption)
      console.log(lastlyConsumption, "lastlyConsumption")
    });

    return () => {
      unsubscribe();
    };

  }, []);

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
            >Water is the most critical resource issue of our lifetime and our
              children's lifetime
            </Text>
          </View>
          <TouchableOpacity style={styles.userNameTxt} onPress={() => navigation.navigate("Profile")}>
            <Avatar.Text size={40} label={nameSplitter(displayName)} style={{ backgroundColor: "#007791" }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 14 }}>Latest Consumption : {latestConsumption}</Text>
          <ScrollView
            horizontal
          >
            <LineChart
              areaChart
              data={graphArr}
              startFillColor="rgb(46, 217, 255)"
              startOpacity={0.6}
              endFillColor="rgb(203, 241, 250)"
              endOpacity={0.3}
              curved
            />
          </ScrollView>
        </View>
      </View>
      <WaterInTakeBtn
        onPress={() => navigation.navigate("NewEntry")}
        title={"Add Entry"}
      />
    </>
  );
};


export default HomeScreen;