import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailTxt = ({ inlineTxt1, inlineTxt2, inlineTxt3 }) => {
    return (
        <View>
            {
                inlineTxt3 ? <Text style={styles.detailTxt}>
                    {inlineTxt1} = <Text style={styles.insideTxt}>
                        <Text style={{ color: "green", fontFamily: "monospace", fontWeight: "bold" }}>{inlineTxt3}</Text> ≈ {inlineTxt2}</Text>
                </Text> : <Text style={styles.detailTxt}>
                    {inlineTxt1} :  <Text style={[styles.insideTxt, { color: inlineTxt2 === "LIMIT REACHED" ? "red" : "grey" }]}>{inlineTxt2}</Text>
                </Text>
            }
        </View>
    )
}

export default DetailTxt

const styles = StyleSheet.create({
    insideTxt: {
        fontSize: 13,
    },
    detailTxt: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black",
    },
})