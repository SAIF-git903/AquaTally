import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailTxt = ({ inlineTxt1, inlineTxt2 }) => {
    return (
        <View>
            <Text style={styles.detailTxt}>
                {inlineTxt1} : <Text style={styles.insideTxt}>{inlineTxt2}</Text>
            </Text>
        </View>
    )
}

export default DetailTxt

const styles = StyleSheet.create({
    insideTxt: {
        fontSize: 13,
        color: "grey"
    },
    detailTxt: {
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 15,
        color: "black",
    },
})