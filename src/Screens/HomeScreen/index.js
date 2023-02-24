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
import { collection, doc, onSnapshot } from 'firebase/firestore';
import styles from './style';
import WaterInTakeBtn from '../../Components/Buttons/WaterInTakeBtn';
import logo from "../../assets/images/logo.png";
import LineChartComp from '../../Components/LineChart';
import DetailTxt from '../../Components/DetailTxt';


const HomeScreen = () => {

  const navigation = useNavigation()
  const displayName = useSelector(state => state?.currentUserName)
  const currentUserId = useSelector(state => state?.currentUserUid);
  const [graphArr, setGraphArr] = useState(null)
  const [latestConsumption, setLatestConsumption] = useState("")
  const [todayDrinkedGlassesOfWater, setTodayDrinkedGlassesOfWater] = useState("")
  const [waterLimitInMl, setWaterLimitInMl] = useState("")
  const [waterLimitInOunces, setWaterLimitInOunces] = useState("")
  const [waterLimitInGlass, setWaterLimitInGlass] = useState("")


  useEffect(() => {
    const usersColRef = collection(db, "users");
    const parentDocRef = doc(usersColRef, currentUserId);
    const subColRef = collection(parentDocRef, getToday());
    const subDocRef = doc(subColRef, "Data");

    const unsubscribe = onSnapshot(subDocRef, (docSnapshot) => {
      setGraphArr(docSnapshot.data()?.graphArr || [])
      setLatestConsumption(docSnapshot.data()?.lastConsumptionOfWater || "")
      setWaterLimitInMl(docSnapshot.data()?.TodayWaterDrinkingLimit)
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function nameSplitter(name) {
    let splittedName = name.split(" ")
    let splittings = []
    splittedName.forEach((item) => {
      let itemN = item.split("")
      splittings.push(itemN[0])
    })
    return splittings.join("")
  }


  function getToday() {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const weekday = weekdays[today.getDay()];
    return weekday
  }


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
          <TouchableOpacity style={styles.userNameTxt}
            onPress={() => navigation.navigate("Profile")}>
            <Avatar.Text size={40} label={nameSplitter(displayName)} style={{ backgroundColor: "#003366" }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15 }}>
          <View style={{ height: 200 }}>
            <LineChartComp graphArr={graphArr} />
          </View>
          <View style={styles.infoTxt}>
            <DetailTxt inlineTxt1={"Latest Consumption"} inlineTxt2={latestConsumption} />
            <DetailTxt inlineTxt1={"Drinked Glasses"} inlineTxt2={`${todayDrinkedGlassesOfWater} glasses`} />
            <DetailTxt inlineTxt1={"Today water Limit"} inlineTxt2={waterLimitInMl} />
          </View>
          <View style={styles.infoTxt2}>
            <DetailTxt inlineTxt1={"1 ounce"} inlineTxt2={"29.5735 ml"} />
            <DetailTxt inlineTxt1={"1 average glass of water"} inlineTxt2={"8 ounces"} />
            <DetailTxt inlineTxt1={`Ounces in ${waterLimitInMl} liter`}
              inlineTxt2={Number(waterLimitInOunces).toFixed(2)} />
            <DetailTxt inlineTxt1={"Average glasses of water to drink"}
              inlineTxt2={Number(waterLimitInGlass).toFixed(0)} />
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