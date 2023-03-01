import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { db } from '../../../firebase';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import Feather from "react-native-vector-icons/Feather"
import FlashMessage, { showMessage } from 'react-native-flash-message';
import LineChartComp from '../../Components/LineChart';
import PieChartComp from '../../Components/PieChartComp';
import DetailTxt from '../../Components/DetailTxt';
import AnimatedSearchBar from '../../Components/AnimatedSearchBar';
import NothingHere from '../../Components/NothingToShowImg';
import logo from "../../assets/images/logo.png";
import no_internet from "../../assets/images/no_internet.png"
import nothing_to_show from "../../assets/images/nothing_to_show.png"
import styles from './style';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const HomeScreen = () => {

  const navigation = useNavigation()
  const currentUser = useSelector(state => state?.currentUserAuth.currentUser.uid);
  const [graphArr, setGraphArr] = useState(null)
  const [latestConsumption, setLatestConsumption] = useState("")
  const [todayDrinkedGlassesOfWater, setTodayDrinkedGlassesOfWater] = useState("")
  const [waterLimitInMl, setWaterLimitInMl] = useState("")
  const [waterLimitInOunces, setWaterLimitInOunces] = useState("")
  const [waterLimitInGlass, setWaterLimitInGlass] = useState("")
  const [remainingGlasses, setRemainingGlasses] = useState(0)
  const [dataExists, setDataExists] = useState(false)
  const [isLoading, setIsloading] = useState(true)
  const [isConnectionAvailable, setIsConnectionAvailable] = useState(true)
  const isFocused = useIsFocused()
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false)
  const ref = useRef("myLocalFlashMessage")


  useLayoutEffect(() => {
    if (isFocused) {
      async function getDataDetails() {
        try {
          const usersColRef = collection(db, "users");
          const parentDocRef = doc(usersColRef, currentUser);
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
          }
        }
      }
      getDataDetails()
    }
  }, [isFocused]);


  function getData() {

    const usersColRef = collection(db, "users");
    const parentDocRef = doc(usersColRef, currentUser);
    const subColRef = collection(parentDocRef, getToday());
    const subDocRef = doc(subColRef, "Data");

    onSnapshot(subDocRef, (docSnapshot) => {
      setGraphArr(docSnapshot.data()?.graphArr || [])
      setLatestConsumption(docSnapshot.data()?.lastConsumptionOfWater || "")
      setWaterLimitInMl(docSnapshot.data()?.TodayWaterDrinkingLimit)
      setIsloading(false)
    });
  }

  useEffect(() => {
    getData()
    return () => {
      setIsloading(false)
      getData()
    };
  }, []);

  const remainingGlass = waterLimitInGlass - todayDrinkedGlassesOfWater
  setTimeout(() => {
    setTodayDrinkedGlassesOfWater(calculate(graphArr))
    setRemainingGlasses(remainingGlass)
  }, 100);

  function calculations() {
    const ouncesOfTodayLimitsWater = 34.48 * `${waterLimitInMl / 1000}`
    const waterLimitInGlasses = waterLimitInOunces / 8
    setTimeout(() => {
      setWaterLimitInOunces(ouncesOfTodayLimitsWater.toFixed(2))
      setWaterLimitInGlass(waterLimitInGlasses.toFixed(0))
    }, 400);
  }
  calculations()

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


  function getToday() {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const weekday = weekdays[today.getDay()];
    return weekday
  }


  async function onSearchSubmit() {
    console.log("Search")
    try {
      const usersColRef = collection(db, "users");
      const parentDocRef = doc(usersColRef, currentUser);
      const subColRef = collection(parentDocRef, searchText);
      const subDocRef = doc(subColRef, "Data");

      const snapShot = await getDoc(subDocRef)
      if (snapShot.exists()) {
        console.log("Data Exists jjjj")
        setIsSearching(true)
        setGraphArr(snapShot.data()?.graphArr || [])
        setLatestConsumption(snapShot.data()?.lastConsumptionOfWater || "")
        setWaterLimitInMl(snapShot.data()?.TodayWaterDrinkingLimit)
        setIsloading(false)
      } else {
        console.log("Data Does not exist")
        showMessage({
          message: `Data for ${searchText} cannot be found`,
          type: "danger",
          backgroundColor: "red",
          color: "white",
          position: "center",
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setSearchText('')
    getData()
    setRefreshing(false);
    setIsSearching(false)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
              }}>Water is the most critical resource issue of our lifetime and our
              children's lifetime
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <AnimatedSearchBar searchText={searchText} setSearchText={setSearchText}
              onSearchSubmit={onSearchSubmit}
            />
          </View>
          <TouchableOpacity style={styles.userNameTxt}
            onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons size={30} color="white" name="menu" />
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
                <ScrollView style={{ width: "90%" }} showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                  <View style={{ marginTop: 15, marginBottom: 65 }}>
                    <View style={{ height: 200 }}>
                      <LineChartComp graphArr={graphArr} />
                    </View>
                    <View style={styles.infoTxt}>
                      <DetailTxt inlineTxt1={"Today water Limit"} inlineTxt2={`${waterLimitInMl} ml`} />
                      <DetailTxt inlineTxt1={"Latest Consumption"} inlineTxt2={latestConsumption} />
                      <DetailTxt inlineTxt1={"Average glasses of water to drink"}
                        inlineTxt2={waterLimitInGlass} />
                      <DetailTxt inlineTxt1={"Drinked Glasses"} inlineTxt2={`${todayDrinkedGlassesOfWater} `} />
                      <DetailTxt inlineTxt1={remainingGlasses < 0 ?
                        "You've exceed water drinking limit" : "Remaining Glasses of Water to drink"}
                        inlineTxt2={remainingGlasses < 0 ? "LIMIT REACHED" : remainingGlass} />
                    </View>
                    <View style={{ marginTop: 30 }}>
                      {!isSearching && <PieChartComp
                        drinkedGlasses={todayDrinkedGlassesOfWater}
                        remainingGlasses={remainingGlasses} />
                      }
                    </View>
                    <View style={styles.infoTxt2}>
                      <Text style={styles.moreInfoTxt}>Details on How water is being calculated</Text>
                      <DetailTxt inlineTxt1={"1 ounce"} inlineTxt2={"29.5735 ml"} />
                      <DetailTxt inlineTxt1={"1 average glass of water"} inlineTxt2={"8 ounces"} />
                      <DetailTxt inlineTxt1={`Ounces in ${waterLimitInMl} liter`}
                        inlineTxt2={`${waterLimitInOunces} ounces`} inlineTxt3={`${waterLimitInMl} / 29.5735`} />
                      <DetailTxt inlineTxt1={`Glasses in ${waterLimitInMl} liter`}
                        inlineTxt2={waterLimitInGlass} inlineTxt3={`${waterLimitInOunces} / 8`} />
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
        <FlashMessage ref={ref} position="top" duration={2500} />
      </View>
    </>
  );
};


export default HomeScreen;