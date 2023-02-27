import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'


const NothingHere = ({ nothingToShowImg, txt }) => {

    function getToday() {
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        const weekday = weekdays[today.getDay()];
        return weekday
    }

    return (
        <>
            <Image source={nothingToShowImg} style={{ width: "100%", height: "100%", resizeMode: "contain", position: "absolute", marginTop: 110 }} />
            <Text style={styles.txt}>{txt}</Text>
        </>
    )
}

export default NothingHere

const styles = StyleSheet.create({
    txt: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 30,
        fontFamily: "monospace",
        marginHorizontal: 20
    }
})