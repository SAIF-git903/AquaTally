import { Text, View, Image, StatusBar } from 'react-native'
import React from 'react'
import styles from './style'
import logo from "../../assets/images/logo.png"


const Splash = () => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"} barStyle="dark-content" />
            <Text style={styles.splashTxt}>AquaTally</Text>
            <Image
                source={logo}
                style={styles.image}
            />
        </View>
    )
}

export default Splash
