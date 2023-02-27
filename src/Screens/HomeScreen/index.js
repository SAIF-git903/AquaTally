import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { db } from '../../../firebase';
import { Avatar } from 'react-native-paper';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import Feather from "react-native-vector-icons/Feather"
import WaterInTakeBtn from '../../Components/Buttons/WaterInTakeBtn';
import LineChartComp from '../../Components/LineChart';
import DetailTxt from '../../Components/DetailTxt';
import AnimatedSearchBar from '../../Components/AnimatedSearchBar';
import NothingHere from '../../Components/NothingToShowImg';
import logo from "../../assets/images/logo.png";
import no_internet from "../../assets/images/no_internet.png"
import nothing_to_show from "../../assets/images/nothing_to_show.png"
import styles from './style';


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
  const [dataExists, setDataExists] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const [isConnectionAvailable, setIsConnectionAvailable] = useState(true)
  const isFocused = useIsFocused()
  const [searchQuery, setSearchQuery] = useState('');


  useLayoutEffect(() => {
    if (isFocused) {
      async function getDataDetails() {
        try {
          const usersColRef = collection(db, "users");
          const parentDocRef = doc(usersColRef, currentUserId);
          const subColRef = collection(parentDocRef, getToday());
          const subDocRef = doc(subColRef, "Data");
          const docSnap = await getDoc(subDocRef);
          if (docSnap.exists()) {
            console.log("Data exists")
            setDataExists(true)
          } else {
            console.log("Data does not Exists")
            setDataExists(false)
          }
        } catch (error) {
          console.log(error.code, "lllllllllllllll")
          switch (error.code) {
            case "unavailable":
              console.log("You does not seem to have internet")
              setIsConnectionAvailable(false)
              return
          }
        }
      }
      getDataDetails()
    }
  }, [isFocused]);


  useEffect(() => {
    const usersColRef = collection(db, "users");
    const parentDocRef = doc(usersColRef, currentUserId);
    const subColRef = collection(parentDocRef, getToday());
    const subDocRef = doc(subColRef, "Data");

    const unsubscribe = onSnapshot(subDocRef, (docSnapshot) => {
      setGraphArr(docSnapshot.data()?.graphArr || [])
      setLatestConsumption(docSnapshot.data()?.lastConsumptionOfWater || "")
      setWaterLimitInMl(docSnapshot.data()?.TodayWaterDrinkingLimit)
      setIsloading(false)
    });

    return () => {
      setIsloading(false)
      unsubscribe();
    };
  }, []);

  function calculations() {
    const ouncesOfTodayLimitsWater = 34.48 * `${waterLimitInMl / 1000}`
    const waterLimitInGlasses = waterLimitInOunces / 8
    setTimeout(() => {
      setWaterLimitInOunces(ouncesOfTodayLimitsWater.toFixed(2))
      setWaterLimitInGlass(waterLimitInGlasses.toFixed(0))
    }, 400);
  }
  calculations()

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
          <View style={{ marginTop: 20 }}>
            <AnimatedSearchBar />
          </View>
          <TouchableOpacity style={styles.userNameTxt}
            onPress={() => navigation.navigate("Profile")}>
            <Avatar.Text size={40} label={nameSplitter(displayName)} style={{ backgroundColor: "#003366" }} />
          </TouchableOpacity>
        </View>
        {
          isLoading ?
            <ActivityIndicator
              animating={isLoading}
              size={40}
              style={{ justifyContent: "center", alignItems: "center", flex: 1 }} color="black" /> :
            isConnectionAvailable ?
              dataExists ?
                <ScrollView style={{ width: "90%" }} showsVerticalScrollIndicator={false}>
                  <View style={{ marginTop: 15 }}>
                    <View style={{ height: 200 }}>
                      <LineChartComp graphArr={graphArr} />
                    </View>
                    <View style={styles.infoTxt}>
                      <DetailTxt inlineTxt1={"Latest Consumption"} inlineTxt2={latestConsumption} />
                      <DetailTxt inlineTxt1={"Drinked Glasses"} inlineTxt2={`${todayDrinkedGlassesOfWater} `} />
                      <DetailTxt inlineTxt1={"Today water Limit"} inlineTxt2={waterLimitInMl} />
                    </View>
                    <View style={styles.infoTxt2}>
                      <DetailTxt inlineTxt1={"1 ounce"} inlineTxt2={"29.5735 ml"} />
                      <DetailTxt inlineTxt1={"1 average glass of water"} inlineTxt2={"8 ounces"} />
                      <DetailTxt inlineTxt1={`Ounces in ${waterLimitInMl} liter`}
                        inlineTxt2={waterLimitInOunces} />
                      <DetailTxt inlineTxt1={"Average glasses of water to drink"}
                        inlineTxt2={waterLimitInGlass} />
                    </View>
                  </View>
                </ScrollView>
                : <NothingHere nothingToShowImg={nothing_to_show} txt={`Data for ${getToday()} does not exist yet.`} />
              : <NothingHere nothingToShowImg={no_internet} txt={"You does not seem to have internet connection"} />
        }
        <View style={styles.plusView}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("NewEntry")
          }}>
            <Feather name="plus" size={30} color="#fff" style={styles.plusIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};


export default HomeScreen;