import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../firebase';
import { Avatar } from 'react-native-paper';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import styles from './style';
import WaterInTakeBtn from '../../Components/Buttons/WaterInTakeBtn';
import logo from "../../assets/images/logo.png";
import LineChartComp from '../../Components/LineChart';
import Data from "../../Data/Data.json"


const HomeScreen = () => {

  const navigation = useNavigation()
  const displayName = useSelector(state => state?.currentUserName)
  const [graphArr, setGraphArr] = useState(null)
  const [latestConsumption, setLatestConsumption] = useState("")
  const [todayDrinkedGlassesOfWater, setTodayDrinkedGlassesOfWater] = useState("")
  const [waterLimitInMl, setWaterLimitInMl] = useState("")
  const [waterLimitInOunces, setWaterLimitInOunces] = useState("")
  const [waterLimitInGlass, setWaterLimitInGlass] = useState("")

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
      setWaterLimitInMl(docSnapshot.data()?.TodayWaterDrinkingLimit)
    });

    return () => {
      unsubscribe();
    };

  }, []);


  function calculate() {
    if (graphArr === null) return
    let sum = 0;
    for (let i = 0; i < graphArr.length; i++) {
      if (Number.isInteger(graphArr[i].value)) {
        sum += graphArr[i].value
      }
    }
    return sum
  }

  setTimeout(() => {
    setTodayDrinkedGlassesOfWater(calculate(graphArr))
  }, 100);


  function calculations() {
    const ouncesOfTodayLimitsWater = 34.48 * `${waterLimitInMl / 1000}`
    const waterLimitInGlasses = waterLimitInOunces / 8
    setTimeout(() => {
      setWaterLimitInOunces(ouncesOfTodayLimitsWater)
      setWaterLimitInGlass(waterLimitInGlasses)
    }, 400);
  }

  calculations()

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
          <View style={{ height: 200 }}>
            <LineChartComp graphArr={graphArr} />
          </View>

          <View style={styles.infoTxt}>
            <Text style={styles.detailTxt}>
              Latest Consumption : <Text style={{ fontSize: 13, color: "grey" }}>{latestConsumption}</Text>
            </Text>
            <Text style={styles.detailTxt}>
              Drinked Glasses : <Text style={{ fontSize: 13, color: "grey" }}>{todayDrinkedGlassesOfWater} glasses</Text>
            </Text>
            <Text style={styles.detailTxt}>Today water Limit : <Text style={{ fontSize: 13, color: "grey" }}>{waterLimitInMl} ml</Text></Text>
          </View>

          <View style={{
            marginTop: 50,
            backgroundColor: "lightblue",
            padding: 10,
            borderRadius: 10,
            marginHorizontal: 10
          }}>
            <Text style={styles.detailTxt}>
              1 ounce =
              <Text style={{ fontFamily: "monospace", fontSize: 13 }}> 29.5735 ml</Text>
            </Text>
            <Text style={styles.detailTxt}>
              1 average glass of water =
              <Text style={{ fontFamily: "monospace", fontSize: 13 }}> 8 ounces</Text>
            </Text>
            <Text style={styles.detailTxt}>
              Ounces in {waterLimitInMl} liter =
              <Text style={{ fontFamily: "monospace", fontSize: 13 }}> {Number(waterLimitInOunces).toFixed(2)}</Text>
            </Text>
            <Text style={styles.detailTxt}>
              Average glasses of water to drink =
              <Text style={{ fontFamily: "monospace", fontSize: 13 }}> {Number(waterLimitInGlass).toFixed(4)}</Text>
            </Text>
          </View>

        </View>
        <WaterInTakeBtn
          onPress={() => navigation.navigate("NewEntry")}
          title={"Add Entry"}
        />
      </View>
    </>
  );
};


export default HomeScreen;