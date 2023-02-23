import { ScrollView } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-gifted-charts'


const LineChartComp = ({ graphArr }) => {

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <LineChart
                onPress={() => console.log("clicking")}
                areaChart
                data={graphArr}
                startFillColor="rgb(46, 217, 255)"
                startOpacity={0.6}
                endFillColor="rgb(203, 241, 250)"
                endOpacity={0.3}
                curved
            />
        </ScrollView>
    )
}

export default LineChartComp
