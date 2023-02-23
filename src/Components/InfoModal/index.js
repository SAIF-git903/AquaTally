import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'


const InfoModal = () => {

    return (
        <View style={styles.modalContent}>
            <ScrollView>
                <Text style={{ fontSize: 19, fontWeight: "600", color: "black" }}>Typical Glass</Text>
                <Text style={styles.modal}>A typical glass of water in most countries usually contains around 240 milliliters (ml) of water. However, this may differ depending on the type of glass and the specific location. </Text>
                <Text style={{ fontSize: 19, fontWeight: "600", color: "black", marginTop: 15 }}>General Recommendation</Text>
                <Text>The recommended amount of water an average person should drink per day can vary based on several factors, including age, sex, weight, activity level, and climate. However, a commonly cited guideline is to drink eight <Text style={{ fontWeight: "bold", color: "green" }}>8-ounce glasses</Text> of water per day, which is about <Text style={{ fontWeight: "bold", color: "green" }}>2 liters</Text> or half a gallon. This is often referred to as the "8x8 rule."
                    However, this guideline is a general recommendation and may not be appropriate for everyone. For example, people who are more physically active or live in hot climates may need to drink more water to replace fluids lost through sweat. Additionally, individual needs can vary based on factors like body size, health conditions, and medications.</Text>
            </ScrollView>
        </View>
    )
}

export default InfoModal

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
        height: '50%',
    },
})