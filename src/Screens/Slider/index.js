import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


import logo from "../../assets/images/logo.png"

const slides = [
    {
        key: 1,
        title: 'Welcome To AquaTally',
        text: 'Stay hydrated throughout the day with aquaTally',
        image: logo,
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Title 2',
        text: 'Other cool stuff',
        // image: require('./assets/2.jpg'),
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        // image: require('./assets/3.jpg'),
        backgroundColor: '#22bcb5',
    }
];


export default function Slider() {

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={styles.image}/>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };


    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={slides}
        // onDone={onDone}
        />
    );
}


const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 16
    },
    text: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 40,
        marginBottom: 64
    },
    image:{
        width: 100,
        height: 100
    }
});
