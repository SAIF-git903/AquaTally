import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const AnimatedSearchBar = ({ searchText, setSearchText, onSearchSubmit }) => {

    const [searchBarFocused, setSearchBarFocused] = useState(false);
    const [shadow, setShadow] = useState(false)

    const searchWidth = useRef(new Animated.Value(0)).current;
    const iconMargin = useRef(new Animated.Value(0)).current;
    const [shadowOpacity] = useState(new Animated.Value(0));
    const searchBarRef = useRef(null)

    const onFocus = () => {
        console.log("pressing")
        setSearchBarFocused(true);
        Animated.timing(searchWidth, {
            toValue: 300,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(iconMargin, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(shadowOpacity, {
            toValue: 0.46,
            duration: 3000,
            useNativeDriver: false,
        }).start();
    };

    const onBlur = () => {
        setShadow(false)
        console.log("Blurring")
        setSearchBarFocused(false);
        Animated.timing(searchWidth, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(iconMargin, {
            toValue: 10,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };


    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (searchBarFocused) {
                    searchBarRef.current.blur();
                }
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                <Animated.View style={[{ width: searchWidth, marginLeft: iconMargin }, styles.txtView,
                shadow && {
                    shadowColor: "#000",
                    shadowOffset: {
                        widtu: 0,
                        height: 8,
                    },
                    shadowRadius: 11.14,
                    elevation: 10,
                    shadowOpacity: shadowOpacity,
                }
                ]}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setSearchText}
                        value={searchText}
                        onFocus={() => setShadow(true)}
                        onBlur={onBlur}
                        placeholder="Search History e.g 'Friday'"
                        ref={searchBarRef}
                        onSubmitEditing={() => onSearchSubmit()}
                    />
                </Animated.View>
                <TouchableOpacity onPress={onFocus} onBlur={onBlur}>
                    <Feather
                        name='search'
                        size={20}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default AnimatedSearchBar


const styles = StyleSheet.create({
    textInput: {
        fontSize: 15,
        width: "100%",
        paddingLeft: 20
    },
    txtView: {
        marginTop: 10,
        backgroundColor: "white",
        marginHorizontal: 10,
        borderRadius: 30,
        height: 40,
    }
})