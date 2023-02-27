import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';


const PieChartComp = ({ remainingGlasses, drinkedGlasses }) => {

    const [remaining, setRemaining] = useState(0)
    console.log(drinkedGlasses, "drinkedGlasses")
    console.log(remainingGlasses, "remainingGlasses")

    if (isNaN(remainingGlasses)) {
        console.log("NaN is found")
    } else if (remainingGlasses < 0) {
        console.log("Remaining glasses is less than zero")
    } else {
        setTimeout(() => {
            setRemaining(remainingGlasses)
        }, 200);
    }

    const data = [
        {
            value: drinkedGlasses,
            color: '#33CCFF',
            label: 'Glasses To drink for today',
        },
        {
            value: remaining,
            color: '#CCCCCC',
            label: 'Drank',
        },
    ];


    return (
        <>
            <View style={styles.container}>
                <PieChart
                    data={data}
                    focusOnPress
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.colorView, { backgroundColor: "#33CCFF" }]}></View>
                    <Text style={styles.txtStyle}>Drinked Glasses</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.colorView, { backgroundColor: "#CCCCCC" }]}></View>
                    <Text style={styles.txtStyle}>Remaining glasses to drink</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorView: {
        width: 40,
        height: 40,
        margin: 2,
        borderRadius: 7
    },
    txtStyle: {
        fontWeight: "bold",
        marginLeft: 10,
        color: "black"
    }
});

export default PieChartComp