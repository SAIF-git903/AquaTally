import { View, Text, StatusBar, Image, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import logo from "../../assets/images/logo.png";
import HomePng from "../../assets/images/Home_cont.png";
import styles from './style';
import { LineChart } from "react-native-chart-kit";
import { useSelector, useDispatch } from 'react-redux';
import waterConsumption from '../../Redux/actions';
import WaterInTakeBtn from '../../Components/Buttons/WaterInTakeBtn';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {

  const dailyWater = useSelector(state => state.todaysWaterConsumption);
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: dailyWater,
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
          <Text style={styles.userNameTxt}>Hi, Saif Ali !</Text>
        </View>
        <LineChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      <WaterInTakeBtn onPress={() => navigation.navigate("NewEntryScreen")} />
    </>
  );
};

export default HomeScreen;
