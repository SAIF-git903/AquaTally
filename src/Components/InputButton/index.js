import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const InputButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.titleView} onPress={onPress}>
            <Text style={styles.titleTxt}>{title}</Text>
        </TouchableOpacity>
    )
}

export default InputButton

const styles = StyleSheet.create({
    titleView: {
        borderWidth: 2,
        borderColor: "black",
        alignSelf: "flex-start",
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 15,
        margin: 5
    },
    titleTxt: {
        fontSize: 17,
        color: "black",
        fontWeight: "bold"
    }
})