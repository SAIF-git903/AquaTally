import { Text, View, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import logo from "../../assets/images/logo.png"


const Splash = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("HomeScreen")
        }, Math.random() * 3000);
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"} barStyle="dark-content"/>
            <Text style={styles.splashTxt}>AquaTally</Text>
            <Image
                source={logo}
                style={styles.image}
            />
        </View>
    )
}

export default Splash
