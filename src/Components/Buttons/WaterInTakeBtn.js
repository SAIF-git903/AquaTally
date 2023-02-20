import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const WaterInTakeBtn = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.btnTxt}>Add Entry</Text>
        </TouchableOpacity>
    )
}

export default WaterInTakeBtn

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#0CAFFF",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 10,
    },
    btnTxt: {
        fontWeight: "900",
        color: "white"
    }
})