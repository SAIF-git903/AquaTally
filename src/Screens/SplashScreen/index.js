import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './style'
import { useNavigation } from '@react-navigation/native'


const Splash = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("HomeScreen")
        }, Math.random() * 3000);
    }, [])


    return (
        <View style={""}>
            <Text>Splash</Text>
        </View>
    )
}

export default Splash
